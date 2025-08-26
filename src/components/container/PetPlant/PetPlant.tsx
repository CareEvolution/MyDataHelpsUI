import React from "react";
import { Title, Card } from "../../presentational";
import "./PetPlant.css";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faSun, faDroplet, faBucket } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps, { Guid, SurveyTask, SurveyTaskQueryParameters } from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers/Initialization";
import { addDays, addWeeks, endOfDay, isAfter, isBefore, isWithinInterval, parseISO, startOfDay, startOfWeek } from "date-fns";

export interface PetPlantProps {
    title?: string;
    subtitle?: string;
    /** Total length of study in days, used for growth scaling */
    studyDurationDays: number;
    /** Day of week for adherence streak reset: 0=Sunday ... 6=Saturday */
    adherenceStreakResetDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /** Configured surveys and their target frequency */
    surveys?: Array<{ surveyName: string; frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Every 3 Months' | 'Every 12 Months' }>;
    /** Preview state to simulate availability in Storybook */
    previewState?: 'AllComplete' | 'LightDue' | 'WaterDue' | 'PotDue' | 'AllDue';
}

type Frequency = 'Daily' | 'Weekly' | 'Monthly' | 'Every 3 Months' | 'Every 12 Months';

function groupFrequencies(surveys: NonNullable<PetPlantProps["surveys"]>) {
    const daily = new Set<string>();
    const weekly = new Set<string>();
    const potting = new Set<string>(); // Monthly + 3mo + 12mo
    surveys.forEach(s => {
        switch (s.frequency) {
            case 'Daily':
                daily.add(s.surveyName); break;
            case 'Weekly':
                weekly.add(s.surveyName); break;
            case 'Monthly':
            case 'Every 3 Months':
            case 'Every 12 Months':
                potting.add(s.surveyName); break;
        }
    });
    return { daily, weekly, potting };
}

async function queryAllSurveyTasks(status: 'incomplete' | 'complete', surveyNames?: string[]): Promise<SurveyTask[]> {
    let all: SurveyTask[] = [];
    async function request(pageID: Guid | null): Promise<void> {
        const parameters: SurveyTaskQueryParameters = { status };
        if (surveyNames && surveyNames.length) {
            parameters.surveyName = surveyNames;
        }
        if (pageID) parameters.pageID = pageID;
        const result: any = await MyDataHelps.querySurveyTasks(parameters);
        all = all.concat(result.surveyTasks as SurveyTask[]);
        if (result.nextPageID) {
            await request(result.nextPageID);
        }
    }
    await request(null);
    return all;
}

export default function (props: PetPlantProps) {
    const [enrollmentDate, setEnrollmentDate] = React.useState<Date | null>(null);
    const [incompleteTasks, setIncompleteTasks] = React.useState<SurveyTask[] | null>(null);
    const [completeTasks, setCompleteTasks] = React.useState<SurveyTask[] | null>(null);
    const [activeSurvey, setActiveSurvey] = React.useState<string | null>(null);

    const [availableDaily, setAvailableDaily] = React.useState<string | null>(null);
    const [availableWeekly, setAvailableWeekly] = React.useState<string | null>(null);
    const [availablePotting, setAvailablePotting] = React.useState<string | null>(null);
    const [growthRatio, setGrowthRatio] = React.useState<number>(0);
    const [statusText, setStatusText] = React.useState<string>("");

    const weekStartsOn = props.adherenceStreakResetDay ?? 0;

    async function initialize(): Promise<void> {
        // Reset active survey state on (re)initialize to ensure buttons update
        setActiveSurvey(null);
        // Preview short-circuit
        if (props.previewState) {
            const d = props.previewState === 'LightDue' || props.previewState === 'AllDue' ? 'Daily' : undefined;
            const w = props.previewState === 'WaterDue' || props.previewState === 'AllDue' ? 'Weekly' : undefined;
            const p = props.previewState === 'PotDue' || props.previewState === 'AllDue' ? 'Monthly' : undefined;
            setAvailableDaily(d ? 'Preview Daily Survey' : null);
            setAvailableWeekly(w ? 'Preview Weekly Survey' : null);
            setAvailablePotting(p ? 'Preview Monthly Survey' : null);
            setGrowthRatio(0.5);
            let msg = "";
            if (p) msg = "Time to repot!";
            else if (w) msg = "Time to water!";
            else if (d) msg = "Part the clouds";
            setStatusText(msg);
            return;
        }
        // Enrollment date
        const participantInfo = await MyDataHelps.getParticipantInfo();
        const enrollment = participantInfo.enrollmentDate ? new Date(participantInfo.enrollmentDate) : null;
        setEnrollmentDate(enrollment);

        const surveyNames = props.surveys?.map(s => s.surveyName) ?? [];
        const [incomplete, complete] = await Promise.all([
            queryAllSurveyTasks('incomplete', surveyNames),
            queryAllSurveyTasks('complete', surveyNames)
        ]);
        setIncompleteTasks(incomplete);
        setCompleteTasks(complete);

        // Determine button availability
        const { daily, weekly, potting } = groupFrequencies(props.surveys ?? []);
        const firstByDue = (names: Set<string>): string | null => {
            const matches = incomplete.filter(t => names.has(t.surveyName));
            if (!matches.length) return null;
            // Prefer earliest dueDate if present
            matches.sort((a, b) => {
                const da = a.dueDate ? parseISO(a.dueDate) : null;
                const db = b.dueDate ? parseISO(b.dueDate) : null;
                if (!da && !db) return 0;
                if (!da) return 1;
                if (!db) return -1;
                return da.getTime() - db.getTime();
            });
            return matches[0].surveyName;
        };
        const d = firstByDue(daily);
        const w = firstByDue(weekly);
        const p = firstByDue(potting);
        setAvailableDaily(d);
        setAvailableWeekly(w);
        setAvailablePotting(p);

        // Accessibility/status line
        let msg = "";
        if (p) msg = "Time to repot!";
        else if (w) msg = "Time to water!";
        else if (d) msg = "Part the clouds";
        setStatusText(msg);

        // Compute growth ratio based on adherence
        if (enrollment && props.studyDurationDays > 0) {
            const now = new Date();
            const totalWeeks = Math.max(1, Math.round(props.studyDurationDays / 7));
            // Compute number of weeks elapsed since enrollment (bounded by totalWeeks)
            const periodStart = startOfWeek(enrollment, { weekStartsOn });
            let weeksElapsed = 0;
            let cursor = periodStart;
            while (weeksElapsed < totalWeeks && isBefore(cursor, addDays(enrollment, props.studyDurationDays))) {
                const weekStart = cursor;
                const weekEnd = endOfDay(addDays(addWeeks(cursor, 1), -1));
                if (isAfter(weekStart, now)) break;
                const adherent = isWeekAdherent(weekStart, weekEnd, props.surveys ?? [], complete, incomplete);
                weeksElapsed += adherent ? 1 : 0;
                cursor = addWeeks(cursor, 1);
            }
            setGrowthRatio(Math.min(1, weeksElapsed / totalWeeks));
        } else {
            setGrowthRatio(0);
        }
    }

    function isWeekAdherent(weekStart: Date, weekEnd: Date, surveys: NonNullable<PetPlantProps["surveys"]>, complete: SurveyTask[], incomplete: SurveyTask[]): boolean {
        // Build quick lookup of completions in week
        const completedThisWeek = new Set<string>();
        complete.forEach(t => {
            if (!t.endDate) return;
            const d = parseISO(t.endDate);
            if (isWithinInterval(d, { start: startOfDay(weekStart), end: endOfDay(weekEnd) })) {
                completedThisWeek.add(t.surveyName);
            }
        });

        // Determine due potting tasks in week from incomplete list by dueDate
        const dueThisWeek = new Set<string>();
        incomplete.forEach(t => {
            if (!t.dueDate) return;
            const d = parseISO(t.dueDate);
            if (isWithinInterval(d, { start: startOfDay(weekStart), end: endOfDay(weekEnd) })) {
                dueThisWeek.add(t.surveyName);
            }
        });

        // All daily and weekly must be completed this week; potting only if due this week
        for (const s of surveys) {
            switch (s.frequency as Frequency) {
                case 'Daily':
                case 'Weekly':
                    if (!completedThisWeek.has(s.surveyName)) return false;
                    break;
                case 'Monthly':
                case 'Every 3 Months':
                case 'Every 12 Months':
                    if (dueThisWeek.has(s.surveyName) && !completedThisWeek.has(s.surveyName)) return false;
                    break;
            }
        }
        return true;
    }

    useInitializeView(() => { initialize(); }, ['surveyDidFinish'], [props.studyDurationDays, props.adherenceStreakResetDay, JSON.stringify(props.surveys ?? [])]);

    const onClick = (surveyName: string | null) => {
        if (!surveyName || activeSurvey) return;
        setActiveSurvey(surveyName);
        MyDataHelps.startSurvey(surveyName);
    };
    return (
        <div className="mdhui-pet-plant">
            <Card>
                <div className="mdhui-pet-plant-header">
                    <Title order={3}>{props.title ?? "Pet Plant"}</Title>
                </div>
                <div className="mdhui-pet-plant-body">
                {props.subtitle && (
                    <div className="mdhui-pet-plant-subtitle">{props.subtitle}</div>
                )}
                <div className={"mdhui-pet-plant-scene" + (availableDaily ? " mdhui-needs-light" : "") + (availablePotting ? " mdhui-needs-pot" : "")} aria-live="polite">
                    {/* Stylized SVG scene with window sill, clouds/sun, plant and pot */}
                    <svg className="mdhui-pet-plant-svg" viewBox="0 0 360 180" role="img" aria-label="Pet plant scene">
                        {/* Background wall */}
                        <rect x="0" y="0" width="360" height="180" fill="#f8fafc" />
                        {/* Window */}
                        <rect x="20" y="10" width="320" height="120" rx="8" fill="#e2e8f0" />
                        <rect x="28" y="18" width="304" height="104" rx="6" fill="#bae6fd" />
                        {/* Clouds */}
                        <g className="mdhui-clouds">
                            <ellipse cx="80" cy="50" rx="28" ry="14" fill="#94a3b8" />
                            <ellipse cx="104" cy="48" rx="20" ry="10" fill="#94a3b8" />
                            <ellipse cx="60" cy="54" rx="20" ry="10" fill="#94a3b8" />
                        </g>
                        {/* Sun */}
                        <g className="mdhui-sun">
                            <circle cx="300" cy="40" r="14" fill="#fbbf24" />
                        </g>
                        {/* Sill */}
                        <rect x="14" y="130" width="332" height="12" rx="6" fill="#cbd5e1" />
                        {/* Plant group scaled by growth (magnified 5x) */}
                        <g transform={`translate(180, 128) scale(${Math.max(0.2, growthRatio) * 5}) translate(-180, -128)`}>
                            {/* Pot */}
                            <rect x="160" y="120" width="40" height="22" rx="6" fill="#a16207" />
                            <rect x="156" y="116" width="48" height="8" rx="4" fill="#ca8a04" />
                            {/* Crack overlay */}
                            <path className="mdhui-pot-crack" d="M182 120 L180 135 L186 142" stroke="#111827" strokeWidth="1.5" fill="none" />
                            {/* Stem and leaves */}
                            <rect x="179" y="96" width="2" height="24" fill="#166534" />
                            <path className={`mdhui-leaves ${availableWeekly ? 'yellow' : 'green'}`} d="M176 98 C168 92, 168 88, 176 86 C178 88, 180 92, 176 98 Z" />
                            <path className={`mdhui-leaves ${availableWeekly ? 'yellow' : 'green'}`} d="M184 104 C192 98, 192 94, 184 92 C182 94, 180 98, 184 104 Z" />
                        </g>
                    </svg>
                    <div className="mdhui-pet-plant-controls">
                        <button className={"mdhui-pet-plant-btn " + (availableDaily ? "mdhui-pet-plant-btn-light" : "")} aria-label="Light" disabled={!availableDaily} onClick={() => onClick(availableDaily)}>
                            <FontAwesomeSvgIcon icon={faSun} />
                        </button>
                        <button className={"mdhui-pet-plant-btn " + (availableWeekly ? "mdhui-pet-plant-btn-water" : "")} aria-label="Water" disabled={!availableWeekly} onClick={() => onClick(availableWeekly)}>
                            <FontAwesomeSvgIcon icon={faDroplet} />
                        </button>
                        <button className={"mdhui-pet-plant-btn " + (availablePotting ? "mdhui-pet-plant-btn-pot" : "")} aria-label="Pot" disabled={!availablePotting} onClick={() => onClick(availablePotting)}>
                            <FontAwesomeSvgIcon icon={faBucket} />
                        </button>
                    </div>
                    <div className="mdhui-pet-plant-status" aria-live="polite">{statusText}</div>
                </div>
                </div>
            </Card>
        </div>
    );
}


