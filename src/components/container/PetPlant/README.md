# Pet Plant (Design Notes)

## Concept
A gamified "Pet Plant" that reflects participant engagement:
- Daily surveys = light (clouds part, plant looks happy)
- Weekly surveys = water (leaves turn green when watered)
- Monthly/quarterly/yearly = potting (pot cracks if due; repot to new color on completion)
- Adherence streak → plant grows from sprout to full size over study duration

## Props / Settings (initial)
- title?: string — component title
- surveys: Array<{ surveyName: string; frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Every 3 Months' | 'Every 12 Months' }>
- studyDurationDays: number — user-entered; scale plant growth to 100% at study end
- adherenceStreakResetDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6 — week reset day (0=Sun ... 6=Sat)
- previewState?: 'LightDue' | 'WaterDue' | 'PotDue' | 'AllComplete' | 'Empty' — for story/testing

## Behavior
- Show three action buttons within the graphic:
  - Light (fa-light fa-sun-bright) → launch open daily survey task(s)
  - Water (fa-light fa-droplet) → launch open weekly survey task(s)
  - Pot (fa-light fa-bucket) → launch open monthly/3mo/12mo survey task(s)
- Buttons indicate required action when there is an open task for that frequency; otherwise disabled.
- On click, launch the corresponding open survey task using MyDataHelps.startSurvey(<name>).
- Assume at most one open task per frequency at a time (for now). Queueing multiple tasks is out-of-scope initially.

## Data
- Query open tasks via MyDataHelps.querySurveyTasks({ status: 'incomplete' }) and filter by configured surveyName values.
- Map frequency → next/overdue status by comparing task due dates (TBD: exact task fields; see SurveyTaskList implementation).

## Adherence / Growth
- Weekly adherence unit: a week is defined by adherenceStreakResetDay to adherenceStreakResetDay-1.
- For each week, participant must complete all configured surveys according to their frequency within that week.
- Plant growth = (adherent weeks so far) / (studyDurationDays / 7). Example: studyDurationDays=56 → 8 total weeks; 4 adherent weeks → 50% growth; 3 adherent weeks → 3/8 height.

## Visuals
- Base scene: plant in pot with background.
- Daily due/overdue: cloudy sky overlay, plant neutral/sad → on completion clouds clear, plant happy.
- Weekly due/overdue: leaf color shifts yellow → on completion back to green.
- Potting due/overdue: hairline cracks on pot → on completion restore pot.
- Growth: scale plant size by adherence streak and/or day index out of studyDurationDays.

## Open Questions
- How to compute a unified adherence streak across multiple frequencies?
- Source of due/overdue per survey—confirm available fields on task (dueDate, recurrence, etc.).
- When multiple surveys match a frequency, should we chain launches or prompt selection?

## Milestones
1) MVP
- Props for title, surveys, studyDurationDays
- Query open tasks; enable/disable buttons; launch first matching task per frequency
- Simple visuals (static SVGs/CSS states) for light/water/pot due vs complete
2) Growth + streak
- Track days engaged; scale plant size accordingly

## References
- See src/components/container/SurveyTaskList/SurveyTaskList.tsx for querying and starting surveys.
