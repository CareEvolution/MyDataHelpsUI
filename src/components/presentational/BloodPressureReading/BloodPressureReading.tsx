import MyDataHelps from "@careevolution/mydatahelps-js";
import { faCaretUp, faHeart, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import Action from "../Action";
import "./BloodPressureReading.css"

export interface BloodPressureReadingProps {
    systolic: number;
    diastolic: number;
    date: string;
}

type BloodPressureClassification = "low" | "normal" | "elevated" | "hypertension-stage-1" | "hypertension-stage-2" | "hypertensive-crisis";

export default function BloodPressureReading(props: BloodPressureReadingProps) {

    let classification: BloodPressureClassification = "normal";
    if (props.systolic > 180 || props.diastolic > 120) {
        classification = "hypertensive-crisis";
    }
    else if (props.systolic > 140 || props.diastolic > 90) {
        classification = "hypertension-stage-2";
    }
    else if (props.systolic > 130 || props.diastolic > 80) {
        classification = "hypertension-stage-1";
    }
    else if (props.systolic > 120) {
        classification = "elevated";
    }
    else if (props.systolic < 90 || props.systolic < 60) {
        classification = "low";
    }

    return <Action className="mdhui-blood-pressure-reading"
        indicatorPosition="topRight"
        indicator={<FontAwesomeSvgIcon icon={faInfoCircle} />}
        onClick={() => MyDataHelps.openEmbeddedUrl("https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings")}>
        <div className="mdhui-blood-pressure-reading-title"><FontAwesomeSvgIcon icon={faHeart} /> Blood Pressure</div>
        <div className="mdhui-blood-pressure-reading-value-wrapper">
            <div className="mdhui-blood-pressure-reading-value">
                {props.systolic} / {props.diastolic} mmHg
            </div>
            <div className={`mdhui-blood-pressure-reading-classification ${classification}`}>
                {classification.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </div>
        </div>
        <div className="mdhui-blood-pressure-reading-date">
            {props.date}
        </div>

        <div className="mdhui-blood-pressure-reading-classification-indicator">
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar normal">
                {(classification === "normal" || classification == "low") && <FontAwesomeSvgIcon icon={faCaretUp} />}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar elevated">
                {classification === "elevated" && <div className="mdhui-blood-pressure-reading-classification-pointer"></div>}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar hypertension-stage-1">
                {classification === "hypertension-stage-1" && <div className="mdhui-blood-pressure-reading-classification-pointer"></div>}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar hypertension-stage-2">
                {classification === "hypertension-stage-2" && <div className="mdhui-blood-pressure-reading-classification-pointer"></div>}
            </div>
            <div className="mdhui-blood-pressure-reading-classification-indicator-bar hypertensive-crisis">
                {classification === "hypertensive-crisis" && <div className="mdhui-blood-pressure-reading-classification-pointer"></div>}
            </div>
        </div>
    </Action>;
}