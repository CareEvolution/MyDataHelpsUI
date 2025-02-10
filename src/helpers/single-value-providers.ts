import MyDataHelps from '@careevolution/mydatahelps-js';
import { queryDailyData } from './query-daily-data';
import { startOfDay, subDays } from 'date-fns';

export type SingleValueProviderType = 'static integer' | 'random integer' | 'custom field integer' | 'days with data';

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
        return Promise.resolve(Math.floor(Math.random() * (this.maxValue + 1)));
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
            if (!Number.isNaN(valueAsInt)) {
                return valueAsInt;
            }
        }

        return undefined;
    }
}

export class DaysWithDataValueProvider extends SingleValueProvider<number> {
    constructor(public dataType: string, public daysInPast: number) {
        super('days with data');
    }

    async getValue(): Promise<number | undefined> {
        const today = new Date();
        const startDate = startOfDay(subDays(today, this.daysInPast));
        const data = await queryDailyData(this.dataType, startDate, today);
        return new Set(Object.keys(data)).size;
    }
}

export const createStaticIntegerValueProvider = (staticValue: number): StaticIntegerValueProvider => {
    return new StaticIntegerValueProvider(staticValue);
};

export const createRandomIntegerValueProvider = (maxValue: number): RandomIntegerValueProvider => {
    return new RandomIntegerValueProvider(maxValue);
};

export const createCustomFieldIntegerValueProvider = (customField: string): CustomFieldIntegerValueProvider => {
    return new CustomFieldIntegerValueProvider(customField);
};