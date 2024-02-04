import React from "react";
import "./IconSelector.css"
import { UnstyledButton } from "../../../presentational";
import { logEntryIcons } from "../../helpers/icons";

interface IconSelectorProps {
    onIconSelect(icon: string): void;
}

export default function (props: IconSelectorProps) {
    var iconOrder = [
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


    return <div className="icon-selector">
        {iconOrder.map(i =>
            <UnstyledButton key={i} title={i} className="unstyled-button icon-item" onClick={() => props.onIconSelect(i)}>
                {logEntryIcons[i]}
            </UnstyledButton>
        )}
    </div >;

}