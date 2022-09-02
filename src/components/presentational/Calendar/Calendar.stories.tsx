import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Calendar, {CalendarProps} from "./Calendar";
import Layout from "../Layout";

export default {
    title: "Presentational/Calendar",
    component: Calendar,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args: CalendarProps) => <Layout><Calendar {...args} /></Layout>;

let plainCalendarDay = function (year: number, month: number, day? : number) {
    return (
        <div>
            {day &&
                <span>{day}</span>
            }
        </div>
    );
}

export const Default = Template.bind({});
Default.args = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  dayRenderer: (year, month, day) => {
    return plainCalendarDay(year, month, day);
  },
};