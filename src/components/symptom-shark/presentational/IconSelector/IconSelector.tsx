import React from "react";
import "./IconSelector.css"
import { UnstyledButton } from "../../../presentational";
import LogEntryIcon, { LogEntryIconKey } from "../LogEntryIcon/LogEntryIcon";

interface IconSelectorProps {
    onIconSelect(icon: string): void;
}

export default function (props: IconSelectorProps) {
    var iconOrder: LogEntryIconKey[] = [
        'star-o',
        'star',
        'user-md',
        'hospital-o',
        'ambulance',
        'flag',
        'moon-o',
        'flask',
        'bolt',
        'question-circle-o',
        'thermometer',
        'trophy',
        'spoon'
    ];


    return <div className="ss-icon-selector">
        {iconOrder.map(i =>
            <UnstyledButton key={i} title={i} className="ss-icon-item" onClick={() => props.onIconSelect(i)}>
                <LogEntryIcon icon={i} />
            </UnstyledButton>
        )}
    </div >;

}