import MyDataHelps from "@careevolution/mydatahelps-js";

export type SingleValueProviderType = 'static' | 'random' | 'customField';

export interface SingleValueProvider<T> {
    type: SingleValueProviderType;
    getValue: () => Promise<T | undefined>;
}

export const ValueProviderFactory = {
    createStaticIntegerValueProvider: (value: number): SingleValueProvider<number> => {
        return {
            type: 'static',
            getValue: () => Promise.resolve(value)
        };
    },
    createRandomIntegerValueProvider: (maxValue: number): SingleValueProvider<number> => {
        return {
            type: 'random',
            getValue: () => Promise.resolve(Math.round(Math.random() * maxValue))
        };
    },
    createCustomFieldIntegerValueProvider: (customField: string): SingleValueProvider<number> => {
        return {
            type: 'customField',
            getValue: async () => {
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