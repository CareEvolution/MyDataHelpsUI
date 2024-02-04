import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {  faStar } from "@fortawesome/free-regular-svg-icons";
import { faAmbulance, faBolt, faFlask, faSpoon, faStar as faStarSolid, faThermometer, faTrophy, faFlag, faHospital, faMoon, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";

export type LogEntryIconKey = "star" | "star-o" | "user-md" | "hospital-o" | "ambulance" | "flag" | "moon-o" | "flask" | "bolt" | "question-circle-o" | "thermometer" | "trophy" | "spoon";

export interface LogEntryIconProps {
    icon?: LogEntryIconKey;
    className?: string;
}

export default function LogEntryIcon(props: LogEntryIconProps) {
    let iconProps = { ...logEntryIcons[props.icon || "star-o"], className: props.className };
    return <FontAwesomeIcon {...iconProps} />;
}

const logEntryIcons: { [key: string]: FontAwesomeIconProps } = {
    "star": { color: "#eec04c", icon: faStarSolid },
    "star-o": { color: "#eec04c", icon: faStar },
    "user-md": { color: "#397d49", icon: faUserMd },
    "hospital-o": { color: "#4154af", icon: faHospital },
    "ambulance": { color: "#f2471c", icon: faAmbulance },
    "flag": { color: "#c4291c", icon: faFlag },
    "moon-o": { color: "#9d9083", icon: faMoon },
    "flask": { color: "#429bdf", icon: faFlask },
    "bolt": { color: "#f5b722", icon: faBolt },
    "question-circle-o": { color: "#71aa3a", icon: faQuestionCircle },
    "thermometer": { color: "#a3144d", icon: faThermometer },
    "trophy": { color: "#e0bc39", icon: faTrophy },
    "spoon": { color: "#6e4b3f", icon: faSpoon }
}