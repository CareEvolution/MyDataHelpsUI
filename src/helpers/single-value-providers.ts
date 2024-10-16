import MyDataHelps from "@careevolution/mydatahelps-js";

export type SingleValueProvider<T> = () => Promise<T | undefined>;

export const ValueProviderFactory = {
    createStaticIntegerValueProvider: (value: number): SingleValueProvider<number> => {
        return () => Promise.resolve(value);
    },
    createRandomIntegerValueProvider: (maxValue: number): SingleValueProvider<number> => {
        return () => Promise.resolve(Math.round(Math.random() * maxValue));
    },
    createCustomFieldIntegerValueProvider: (customField: string): SingleValueProvider<number> => {
        return async () => {
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