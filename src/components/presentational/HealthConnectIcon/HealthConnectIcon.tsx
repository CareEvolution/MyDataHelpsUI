
import HealthConnectLogo from '../../../assets/healthconnect-logo.svg';
import HealthConnectLogoWhite from '../../../assets/healthconnect-logo-white.svg';
import { useContext } from 'react';
import { LayoutContext } from '../Layout';
import React from 'react';

export default function (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
    const layoutContext = useContext<LayoutContext>(LayoutContext);
    return <img {...props} src={layoutContext?.colorScheme == "dark" ? HealthConnectLogoWhite : HealthConnectLogo} />;
}