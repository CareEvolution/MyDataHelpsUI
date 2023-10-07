import FitnessWearable from '../../../assets/fitness-wearable.svg';
import FitbitLogo from '../../../assets/fitbit-logo.svg';
import GarminLogo from '../../../assets/garmin-logo.svg';
import AppleHealthLogo from '../../../assets/applehealth-logo.svg';
import GoogleFitLogo from '../../../assets/googlefit-logo.svg';
import OmronLogo from '../../../assets/omron-logo.png';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import "./LibraryImage.css"
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import React from 'react';

export type LibraryImageKey =
    "FitnessWearable" | 
    "FitbitLogo" | 
    "GarminLogo" | 
    "AppleHealthLogo" | 
    "GoogleFitLogo" | 
    "OmronLogo" | 
    IconDefinition;

var iconLookup: { [key: string]: string } = {
    "FitnessWearable": FitnessWearable,
    "FitbitLogo": FitbitLogo,
    "GarminLogo": GarminLogo,
    "AppleHealthLogo": AppleHealthLogo,
    "GoogleFitLogo": GoogleFitLogo,
    "OmronLogo": OmronLogo
}

export interface LibraryImageProps {
    image: LibraryImageKey
    size?: "small" | "medium" | "large"
    width?: number
}

export default function (props: LibraryImageProps) {
    function getImage(){
        if(iconLookup[props.image as string]){
            return <img width={props.width} src={iconLookup[props.image as string]} />
        }
        return <FontAwesomeSvgIcon icon={props.image as IconDefinition} />
    }

    return <div className="mdhui-library-image">
        {getImage()}
    </div>
}