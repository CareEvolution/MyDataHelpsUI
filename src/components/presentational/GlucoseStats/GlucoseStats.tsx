import React from 'react'
import './GlucoseStats.css'
import { GlucoseReading } from '../../../helpers';
import LoadingIndicator from '../LoadingIndicator';
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faDroplet } from "@fortawesome/free-solid-svg-icons"

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
            <div className="mdhui-glucose-stat-label">BLOOD GLUCOSE RANGE</div>
            {props.loading && <LoadingIndicator />}
            {!props.loading &&
                <div className="mdhui-glucose-stat-value">
                    {minGlucose &&
                        <>
                            <FontAwesomeSvgIcon className="mdhui-glucose-stat-icon" icon={faDroplet} /> <span>{Number(minGlucose).toFixed(0)} - {Number(maxGlucose).toFixed(0)} mg/dL</span>
                        </>
                    }
                    {!minGlucose &&
                        <span>n/a</span>
                    }
                </div>
            }
        </div>
        <div className="mdhui-glucose-stat">
            <div className="mdhui-glucose-stat-label">AVG BLOOD GLUCOSE</div>
            {props.loading &&
                <LoadingIndicator />
            }
            {!props.loading &&
                <div className="mdhui-glucose-stat-value">
                    {avgGlucose &&
                        <>
                            <FontAwesomeSvgIcon className="mdhui-glucose-stat-icon" icon={faDroplet} /> <span>{Number(avgGlucose).toFixed(0)} mg/dL</span>
                        </>
                    }
                    {!avgGlucose &&
                        <span>n/a</span>
                    }
                </div>
            }
        </div>
    </div>;
}