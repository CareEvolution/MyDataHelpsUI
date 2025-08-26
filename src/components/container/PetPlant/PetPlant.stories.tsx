import React from "react"
import PetPlant, { PetPlantProps } from "./PetPlant"
import Layout from "../../presentational/Layout"

export default {
    title: "Container/Pet Plant",
    component: PetPlant,
    parameters: {
        layout: 'fullscreen',
    }
};

const render = (args: PetPlantProps) => <Layout colorScheme='auto'>
    <PetPlant {...args} />
</Layout>;

export const Default = {
    args: {
        title: "Pet Plant",
        subtitle: "Grow and care for a plant by completing survey tasks.",
        studyDurationDays: 56,
        surveys: [
            { surveyName: 'Daily Check-In', frequency: 'Daily' },
            { surveyName: 'Weekly Check-In', frequency: 'Weekly' },
            { surveyName: 'Monthly Check-In', frequency: 'Monthly' }
        ],
        previewState: 'AllDue'
    },
    render: render
};

export const AllComplete = {
    args: {
        ...Default.args,
        previewState: 'AllComplete'
    },
    render
};

export const LightDue = {
    args: {
        ...Default.args,
        previewState: 'LightDue'
    },
    render
};

export const WaterDue = {
    args: {
        ...Default.args,
        previewState: 'WaterDue'
    },
    render
};

export const PotDue = {
    args: {
        ...Default.args,
        previewState: 'PotDue'
    },
    render
};


