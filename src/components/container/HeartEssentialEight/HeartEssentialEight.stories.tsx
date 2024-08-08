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

const defaultCustomFieldDictionary = {
    Activity: "Activity",
    BloodPressure: "BloodPressure",
    BloodSugar: "BloodSugar",
    BMI: "BMI",
    Cholesterol: "Cholesterol",
    Diet: "Diet",
    Nicotine: "Nicotine",
    Sleep: "Sleep"
};

export const Default: Story = {
  args: {
    previewState: "Default",
    customFieldDictionary: defaultCustomFieldDictionary 
  },
  render: render,
};

export const NoData: Story = {
  args: {
    previewState: "NoData",
    customFieldDictionary: defaultCustomFieldDictionary
  },
  render: render,
};


export const Live: Story = {
    args: {
      customFieldDictionary:  {
            Activity: "LE8_PA_Score",
            BloodPressure: "LE8_BP_Score",
            BloodSugar: "LE8_BloodSugar_Score",
            BMI: "LE8_BMI_Score",
            Cholesterol: "LE8_Cholesterol_Score",
            Diet: "LE8_Diet_Score",
            Nicotine: "LE8_Nicotine_Score",
            Sleep: "LE8_Sleep_Score"
        }
    },
    render: render,
  };
  