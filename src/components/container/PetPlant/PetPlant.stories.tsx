import React from "react";
import PetPlant, { PetPlantProps } from "./PetPlant";
import Layout from "../../presentational/Layout";

export default {
  title: "Container/Pet Plant",
  component: PetPlant,
  parameters: {
    layout: "fullscreen"
  }
};

const render = (args: PetPlantProps) => (
  <Layout colorScheme="auto">
    <PetPlant {...args} />
  </Layout>
);

export const Default = {
  args: {
    title: "Pet Plant",
    subtitle: "Grow and care for a plant by completing survey tasks.",
    studyDurationDays: 56,
    surveys: [
      { surveyName: "PetPlantDaily", frequency: "Daily" },
      { surveyName: "PetPlantWeekly", frequency: "Weekly" },
      { surveyName: "PetPlantMonthly", frequency: "Monthly" }
    ],
    previewState: "AllComplete"
  },
  render: render
};

export const AllComplete = {
  args: {
    ...Default.args,
    previewState: "AllComplete"
  },
  render
};

export const LightDue = {
  args: {
    ...Default.args,
    previewState: "LightDue"
  },
  render
};

export const WaterDue = {
  args: {
    ...Default.args,
    previewState: "WaterDue"
  },
  render
};

export const PotDue = {
  args: {
    ...Default.args,
    previewState: "PotDue"
  },
  render
};

export const Live = {
  args: {
    colorScheme: "auto",
    title: "Pet Plant",
    subtitle: "Grow and care for a plant by completing survey tasks.",
    studyDurationDays: 56,
    surveys: [
      { surveyName: "PetPlantDaily", frequency: "Daily" },
      { surveyName: "PetPlantWeekly", frequency: "Weekly" },
      { surveyName: "PetPlantMonthly", frequency: "Monthly" }
    ]
  },
  argTypes: {
    colorScheme: {
      name: "color scheme",
      control: "radio",
      options: ["auto", "light", "dark"]
    }
  },
  render: (args: any) => (
    <Layout colorScheme={args.colorScheme}>
      <PetPlant {...args} />
    </Layout>
  )
};
