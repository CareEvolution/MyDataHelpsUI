import { InputType } from 'storybook/internal/types';

export function argTypesToHide(propertiesToIgnore: string[]) {
    return propertiesToIgnore.reduce((argTypes, property) => {
        argTypes[property] = { table: { disable: true } };
        return argTypes;
    }, {} as { [key: string]: InputType });
}