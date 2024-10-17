import MyDataHelps from "@careevolution/mydatahelps-js";

export type SingleValueProviderType = 'static integer' | 'random integer' | 'custom field integer';

export interface SingleValueProvider<T> {
    type: SingleValueProviderType;
    getValue: () => Promise<T | undefined>;
}

export interface StaticIntegerValueProvider extends SingleValueProvider<number> {
    staticValue: number;
}

export interface RandomIntegerValueProvider extends SingleValueProvider<number> {
    maxValue: number;
}

export interface CustomFieldIntegerValueProvider extends SingleValueProvider<number> {
    customField: string;
}

export const SingleValueProviderFactory = {
    createStaticIntegerValueProvider: (staticValue: number): StaticIntegerValueProvider => {
        return {
            type: 'static integer',
            staticValue: staticValue,
            getValue: () => Promise.resolve(staticValue)
        };
    },
    createRandomIntegerValueProvider: (maxValue: number): RandomIntegerValueProvider => {
        return {
            type: 'random integer',
            maxValue: maxValue,
            getValue: () => Promise.resolve(Math.round(Math.random() * maxValue))
        };
    },
    createCustomFieldIntegerValueProvider: (customField: string): CustomFieldIntegerValueProvider => {
        return {
            type: 'custom field integer',
            customField: customField,
            getValue: async () => {
                if (!customField) return undefined;

                const participantInfo = await MyDataHelps.getParticipantInfo();
                if (participantInfo.customFields.hasOwnProperty(customField)) {
                    const valueAsString = participantInfo.customFields[customField];
                    const valueAsInt = parseInt(valueAsString);
                    if (!isNaN(valueAsInt)) {
                        return valueAsInt;
                    }
                }
                return undefined;
            }
        }
    }
}