import React from "react";
import ConnectDevicesMenu, { DeviceAccountType } from "../ConnectDevicesMenu/ConnectDevicesMenu";
import { TextBlock, Title } from "../../presentational";
import language from "../../../helpers/language";

export interface ConnectDevicesCTAProps {
    innerRef?: React.Ref<HTMLDivElement>
    accountTypes?: DeviceAccountType[]
    title?: string
    text?: string
    previewState?: "iOS" | "Android" | "Web" | "ConnectedStates"
    headerVariant?: "large" | "medium"
}

export default function (props: ConnectDevicesCTAProps) {
    let title = props.title || language("connect-devices-title");
    let text = props.text || language("connect-devices-text");
    let headerVariant = props.headerVariant || "large";

    return <div ref={props.innerRef} className="mdhui-connect-devices-cta">
        <Title defaultMargin order={headerVariant == "large" ? 2 : 3} libraryImage="FitnessWearable" imageAlignment={headerVariant == "large" ? "top" : "left"}>{title}</Title>
        <TextBlock>
            {text}
        </TextBlock>
        <ConnectDevicesMenu
            previewState={props.previewState}
            accountTypes={props.accountTypes}
        />
    </div>
}
