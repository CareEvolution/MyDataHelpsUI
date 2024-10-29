import MyDataHelps from '@careevolution/mydatahelps-js';

export type SingleValueProviderType = 'static integer' | 'random integer' | 'custom field integer';

export abstract class SingleValueProvider<T> {
    protected constructor(public type: SingleValueProviderType) {
    };

    abstract getValue(): Promise<T | undefined>;
}

export class StaticIntegerValueProvider extends SingleValueProvider<number> {
    constructor(public staticValue: number) {
        super('static integer');
    }

    getValue(): Promise<number | undefined> {
        return Promise.resolve(this.staticValue);
    }
}

export class RandomIntegerValueProvider extends SingleValueProvider<number> {
    constructor(public maxValue: number) {
        super('random integer');
    }

    getValue(): Promise<number | undefined> {
        return Promise.resolve(Math.round(Math.random() * this.maxValue));
    }
}

export class CustomFieldIntegerValueProvider extends SingleValueProvider<number> {
    constructor(public customField: string) {
        super('custom field integer');
    }

    async getValue(): Promise<number | undefined> {
        if (!this.customField) return undefined;

        let participantInfo = await MyDataHelps.getParticipantInfo();
        if (participantInfo.customFields.hasOwnProperty(this.customField)) {
            const valueAsString = participantInfo.customFields[this.customField];
            const valueAsInt = parseInt(valueAsString);
            if (!isNaN(valueAsInt)) {
                return valueAsInt;
            }
        }

        return undefined;
    }
}

export class SingleValueProviderFactory {
    static createStaticIntegerValueProvider(staticValue: number): StaticIntegerValueProvider {
        return new StaticIntegerValueProvider(staticValue);
    }

    static createRandomIntegerValueProvider(maxValue: number): RandomIntegerValueProvider {
        return new RandomIntegerValueProvider(maxValue);
    }

    static createCustomFieldIntegerValueProvider(customField: string): CustomFieldIntegerValueProvider {
        return new CustomFieldIntegerValueProvider(customField);
    }
}