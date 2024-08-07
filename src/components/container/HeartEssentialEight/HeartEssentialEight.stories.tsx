import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Layout from "../../presentational/Layout";
import { Card } from "../../presentational";
import HeartEssentialEight, {
  HeartEssentialEightProps,
} from "./HeartEssentialEight";

const meta: Meta<typeof HeartEssentialEight> = {
  title: "Container/HeartEssentialEight",
  component: HeartEssentialEight,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HeartEssentialEight>;

const render = (args: HeartEssentialEightProps) => {
  return (
    <Layout colorScheme="auto">
      <Card>
        <HeartEssentialEight {...args} />
      </Card>
    </Layout>
  );
};

export const Default: Story = {
  args: {
    previewState: "Default",
    customFieldDictionary: {
      Activity: "Activity",
      BloodPressure: "BloodPressure",
      BloodSugar: "BloodSugar",
      BMI: "BMI",
      Cholesterol: "Cholesterol",
      Diet: "Diet",
      Nicotine: "Nicotine",
      Sleep: "Sleep",
    },
  },
  render: render,
};

export const NoData: Story = {
  args: {
    previewState: "NoData",
    customFieldDictionary: {
        Activity: "Activity",
        BloodPressure: "BloodPressure",
        BloodSugar: "BloodSugar",
        BMI: "BMI",
        Cholesterol: "Cholesterol",
        Diet: "Diet",
        Nicotine: "Nicotine",
        Sleep: "Sleep",
      },
  },
  render: render,
};
