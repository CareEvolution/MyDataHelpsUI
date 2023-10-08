import FitnessWearable from '../../../assets/fitness-wearable.svg';
import FitbitLogo from '../../../assets/fitbit-logo.svg';
import GarminLogo from '../../../assets/garmin-logo.svg';
import AppleHealthLogo from '../../../assets/applehealth-logo.svg';
import GoogleFitLogo from '../../../assets/googlefit-logo.svg';
import OmronLogo from '../../../assets/omron-logo.png';
import IDCard from "../../../assets/id-card.svg";
import "./LibraryImage.css"
import React from 'react';

export type LibraryImageKey =
    "FitnessWearable" | 
    "FitbitLogo" | 
    "GarminLogo" | 
    "AppleHealthLogo" | 
    "GoogleFitLogo" | 
    "OmronLogo" | 
    "IDCard";

var iconLookup: { [key: string]: string } = {
    "FitnessWearable": FitnessWearable,
    "FitbitLogo": FitbitLogo,
    "GarminLogo": GarminLogo,
    "AppleHealthLogo": AppleHealthLogo,
    "GoogleFitLogo": GoogleFitLogo,
    "OmronLogo": OmronLogo,
    "IDCard" : IDCard 
}

export interface LibraryImageProps {
    image: LibraryImageKey
    size?: "small" | "medium" | "large"
    width?: number
}

export default function (props: LibraryImageProps) {
    return <div className="mdhui-library-image">
        <img width={props.width} src={iconLookup[props.image as string]} />
    </div>
}