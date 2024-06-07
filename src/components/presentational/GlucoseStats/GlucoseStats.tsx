import React from 'react'
import './GlucoseStats.css'
import { GlucoseReading } from '../../../helpers';
import LoadingIndicator from '../LoadingIndicator';

export interface GlucoseStatsProps {
    loading: boolean;
    glucoseReadings: GlucoseReading[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: GlucoseStatsProps) {
    let minGlucose: number | undefined;
    let maxGlucose: number | undefined;
    let avgGlucose: number | undefined;

    if (props.glucoseReadings && props.glucoseReadings.length > 0) {
        let glucoseValues = props.glucoseReadings.map(reading => reading.value);
        minGlucose = Math.min(...glucoseValues);
        maxGlucose = Math.max(...glucoseValues);
        avgGlucose = glucoseValues.reduce((s, a) => s + a, 0) / glucoseValues.length;
    }

    return <div className="mdhui-glucose-stats" ref={props.innerRef}>
        <div className="mdhui-glucose-stat">
            {props.loading && <LoadingIndicator/>}
            {!props.loading &&
                <div className="mdhui-glucose-stat-value">
                    {minGlucose &&
                        <span>{Number(minGlucose).toFixed(0)} - {Number(maxGlucose).toFixed(0)} mg/dl</span>
                    }
                    {!minGlucose &&
                        <span>n/a</span>
                    }
                </div>
            }
            <div className="mdhui-glucose-stat-label">Blood Glucose Range (Min-Max)</div>
        </div>
        <div className="mdhui-glucose-stat">
            {props.loading &&
                <LoadingIndicator/>
            }
            {!props.loading &&
                <div className="mdhui-glucose-stat-value">
                    {avgGlucose &&
                        <span>{Number(avgGlucose).toFixed(0)} mg/dl</span>
                    }
                    {!avgGlucose &&
                        <span>n/a</span>
                    }
                </div>
            }
            <div className="mdhui-glucose-stat-label">Avg Blood Glucose</div>
        </div>
    </div>;
}