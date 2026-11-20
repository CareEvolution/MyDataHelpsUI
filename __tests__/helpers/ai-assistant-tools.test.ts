import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { convertToOpenAITool } from '@langchain/core/utils/function_calling';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { MyDataHelpsTools } from '../../src/helpers/AIAssistant';

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: {
        queryNotifications: jest.fn(),
        queryDeviceDataV2Aggregate: jest.fn(),
        persistParticipantInfo: jest.fn(),
        getCurrentLanguage: jest.fn(() => 'en')
    }
}));

type JsonSchema = {
    type?: string;
    description?: string;
    enum?: string[];
    required?: string[];
    properties?: Record<string, JsonSchema>;
    items?: JsonSchema;
    additionalProperties?: boolean | JsonSchema;
};

const parametersOf = (tool: Parameters<typeof convertToOpenAITool>[0]) =>
    convertToOpenAITool(tool).function.parameters as JsonSchema;

const collectUndescribedProperties = (schema: JsonSchema, path: string): string[] =>
    Object.entries(schema.properties ?? {}).flatMap(([name, property]) => {
        const propertyPath = `${path}.${name}`;
        const missing = property.description ? [] : [propertyPath];
        return [...missing, ...collectUndescribedProperties(property, propertyPath)];
    });

describe('AI Assistant tools', () => {
    const tools = Object.entries(MyDataHelpsTools);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe.each(tools)('%s', (_exportName, tool) => {
        it('Should convert to an OpenAI function with its name, description, and an object schema.', () => {
            const converted = convertToOpenAITool(tool);

            expect(converted.type).toBe('function');
            expect(converted.function.name).toBe(tool.name);
            expect(converted.function.description).toBe(tool.description);
            expect(converted.function.parameters).toMatchObject({ type: 'object' });
        });

        it('Should keep a description on every parameter.', () => {
            expect(collectUndescribedProperties(parametersOf(tool), 'parameters')).toEqual([]);
        });
    });

    describe('queryDeviceDataV2', () => {
        const schema = parametersOf(MyDataHelpsTools.QueryDeviceDataV2Tool);

        it('Should require only namespace and type.', () => {
            expect(schema.required).toEqual(['namespace', 'type']);
        });

        it('Should expose namespace as an enum.', () => {
            expect(schema.properties?.namespace).toMatchObject({
                type: 'string',
                enum: ['Fitbit', 'AppleHealth', 'Garmin', 'Dexcom', 'HealthConnect']
            });
        });

        it('Should keep the optional nested dataSource object and its optional fields.', () => {
            const dataSource = schema.properties?.dataSource;
            expect(schema.required).not.toContain('dataSource');
            expect(dataSource?.type).toBe('object');
            expect(Object.keys(dataSource?.properties ?? {})).toEqual([
                'sourceName', 'sourceIdentifier', 'sourceProductType', 'sourceOperatingSystemVersion'
            ]);
            expect(dataSource?.required ?? []).toEqual([]);
        });

        it('Should describe properties as a string-to-string map.', () => {
            expect(schema.properties?.properties).toMatchObject({
                type: 'object',
                additionalProperties: { type: 'string' }
            });
        });
    });

    describe('queryDeviceDataV2Aggregate', () => {
        const schema = parametersOf(MyDataHelpsTools.QueryDeviceDataV2AggregateTool);

        it('Should include the extended aggregate fields alongside the base query fields.', () => {
            expect(schema.required).toEqual(
                expect.arrayContaining(['namespace', 'type', 'intervalAmount', 'intervalType', 'aggregateFunctions'])
            );
            expect(schema.properties?.intervalAmount.type).toBe('number');
            expect(schema.properties?.intervalType.enum).toEqual(['Minutes', 'Hours', 'Days', 'Weeks', 'Months']);
            expect(schema.properties?.aggregateFunctions).toMatchObject({
                type: 'array',
                items: { type: 'string', enum: ['sum', 'avg', 'count', 'min', 'max'] }
            });
        });

        it('Should pass validated arguments through to the query.', async () => {
            jest.mocked(MyDataHelps.queryDeviceDataV2Aggregate).mockResolvedValue({
                intervals: [{ date: '2025-01-01', statistics: { sum: 5 }, extra: 'dropped' }]
            } as any);

            const result = await MyDataHelpsTools.QueryDeviceDataV2AggregateTool.invoke({
                namespace: 'Fitbit',
                type: 'Steps',
                intervalAmount: 1,
                intervalType: 'Days',
                aggregateFunctions: ['sum']
            });

            expect(MyDataHelps.queryDeviceDataV2Aggregate).toHaveBeenCalledWith({
                namespace: 'Fitbit',
                type: 'Steps',
                intervalAmount: 1,
                intervalType: 'Days',
                aggregateFunctions: ['sum']
            });
            expect(JSON.parse(result)).toEqual([{ date: '2025-01-01', statistics: { sum: 5 } }]);
        });

        it('Should reject arguments that do not match the schema.', async () => {
            await expect(MyDataHelpsTools.QueryDeviceDataV2AggregateTool.invoke({
                namespace: 'Fitbit',
                type: 'Steps',
                intervalAmount: 1,
                intervalType: 'Fortnights',
                aggregateFunctions: ['sum']
            })).rejects.toThrow();
            expect(MyDataHelps.queryDeviceDataV2Aggregate).not.toHaveBeenCalled();
        });
    });

    describe('queryNotifications', () => {
        it('Should accept an empty query because every field is optional.', async () => {
            jest.mocked(MyDataHelps.queryNotifications).mockResolvedValue({ notifications: [] } as any);

            await MyDataHelpsTools.QueryNotificationsTool.invoke({});

            expect(MyDataHelps.queryNotifications).toHaveBeenCalledWith({});
            expect(parametersOf(MyDataHelpsTools.QueryNotificationsTool).required ?? []).toEqual([]);
        });

        it('Should reject an unknown notification type.', async () => {
            await expect(MyDataHelpsTools.QueryNotificationsTool.invoke({ type: 'Carrier pigeon' })).rejects.toThrow();
            expect(MyDataHelps.queryNotifications).not.toHaveBeenCalled();
        });
    });

    describe('persistParticipantInfo', () => {
        it('Should pass demographics and custom fields to the SDK.', async () => {
            jest.mocked(MyDataHelps.persistParticipantInfo).mockResolvedValue({} as any);

            await MyDataHelpsTools.PersistParticipantInfoTool.invoke({
                demographics: { firstName: 'Ada' },
                customFields: { favoriteColor: 'blue' }
            });

            expect(MyDataHelps.persistParticipantInfo).toHaveBeenCalledWith(
                { firstName: 'Ada' },
                { favoriteColor: 'blue' }
            );
        });

        it('Should reject non-string custom field values.', async () => {
            await expect(MyDataHelpsTools.PersistParticipantInfoTool.invoke({
                customFields: { count: 3 }
            })).rejects.toThrow();
            expect(MyDataHelps.persistParticipantInfo).not.toHaveBeenCalled();
        });
    });
});
