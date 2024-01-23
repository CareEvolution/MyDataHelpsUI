import React from 'react';
import { RotatingText, RotatingTextEntry } from "../../../presentational";
import { startOfYear } from "date-fns";

export interface AsthmaFactsProps {
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaFactsProps) {
    const facts: RotatingTextEntry[] = [
        {title: '001', text: 'Lots of people with asthma consider swimming the best exercise. But as long as asthma is well controlled, other forms of exercise can also be good.'},
        {title: '002', text: 'The number of Americans with asthma grows every year. In 2017 it was estimated that there are 25 million people with asthma in the United States.'},
        {title: '003', text: 'When asthma is not well controlled, you may suffer from inconsistent sleep and nighttime awakenings more often.'},
        {title: '004', text: 'Asthma most commonly appears during childhood, but it\'s also possible to develop asthma as an adult.'},
        {title: '005', text: 'Ozone makes people more sensitive to asthma triggers such as pet dander, pollen, dust mites, and mold.'},
        {title: '006', text: 'Every day in United States, 40,000 people miss school or work because of asthma.'},
        {title: '007', text: 'Bed sheets must be washed in hot water (at least 130 °F) to kill dust mites, which can trigger asthma for some people.'},
        {title: '008', text: 'At the Beijing Olympic Games in 2008, 19% of the swimmers had asthma - yet they ended up winning 33% of the individual medals!'},
        {title: '009', text: 'Asthma and current asthma medications do NOT damage the heart.'},
        {title: '010', text: 'Strong emotions like anger can set off an asthma attack.'},
        {title: '011', text: 'It is not possible to outgrow asthma, but asthma symptoms often improve as a child gets older.'},
        {title: '012', text: 'If someone\'s asthma is well controlled, they shouldn\'t have any nighttime awakenings due to asthma.'},
        {title: '013', text: 'Asthma is the cause of one-quarter of all emergency room visits in the United States.'},
        {title: '014', text: 'Warming up before a workout can help to avoid triggering asthma symptoms.'},
        {title: '015', text: 'You can\'t catch asthma from someone else. But you can catch a cold, which may trigger worsening symptoms in someone with asthma.'},
        {title: '016', text: 'Asthma may affect over 300 million people worldwide. The exact number isn\'t known for sure because many people don\'t know that they have it.'},
        {title: '017', text: 'Every day in United States, 30,000 people have an asthma attack.'},
        {title: '018', text: 'The average stay for someone hospitalized for asthma is 3 days. Working to ensure asthma is well controlled reduces the need for hospitalizations.'},
        {title: '019', text: '7 million children in the U.S. have asthma.'},
        {title: '020', text: 'The English word asthma is derived from an ancient Greek word meaning hard breathing.'},
        {title: '021', text: 'Not having any activity limitations due to asthma symptoms is a sign that asthma is being well controlled.'},
        {title: '022', text: 'Unfortunately, about 12 million people worldwide report having an asthma attack in the past year.'},
        {title: '023', text: 'Every day in United States, 5,000 people visit the emergency room for asthma.'},
        {title: '024', text: 'Cats can also suffer from asthma, and their experience is very similar to humans. It is called feline asthma.'},
        {title: '025', text: 'Your treatment plan should be reevaluated every three to six months.'},
        {title: '026', text: 'Ozone and particle pollution can trigger asthma attacks.'},
        {title: '027', text: 'If your asthma is well controlled, you should only be using albuterol (rescue inhaler) twice a week or less (not including before exercise).'}
    ];

    return <RotatingText interval="week" entryTitlePrefix="Asthma Fact #" entries={facts} startDate={startOfYear(new Date())} innerRef={props.innerRef}/>;
}