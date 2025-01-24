import React from "react";
import Calendar, { CalendarProps } from "./Calendar";
import Layout from "../Layout";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Calendar> = {
    title: "Presentational/Calendar",
    component: Calendar,
    parameters: {
        layout: 'fullscreen'
    }
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const render = (args: CalendarProps) => <Layout colorScheme="auto"><Calendar {...args} /></Layout>;

let plainCalendarDay = function (year: number, month: number, day?: number) {
    return (
        <div>
            {day &&
                <span>{day}</span>
            }
        </div>
    );
}

export const Default: Story = {
    args: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        dayRenderer: (year, month, day) => {
            return plainCalendarDay(year, month, day);
        },
        weekStartsOn: 0
    },
    render: render
}