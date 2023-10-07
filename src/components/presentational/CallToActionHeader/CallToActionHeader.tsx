import React from "react"
import Title from "../Title"
import "./CallToActionHeader.css"

export interface CallToActionHeaderProps {
    title: string
    children?: React.ReactNode
    image?: React.ReactNode
    variant?: "large" | "medium"
}

export default function CallToActionHeader(props: CallToActionHeaderProps) {
    let variant = props.variant || "large";
    let classes = ["mdhui-cta-header", `mdhui-cta-header-${variant}`];

    return <div className={classes.join(" ")}>
        <div className="mdhui-cta-header-flex">
            {props.image}
            <Title className="mdhui-cta-header-title" order={variant == "large" ? 2 : 3}>{props.title}</Title>
        </div>
        <div className="mdhui-cta-header-text">{props.children}</div>
    </div>
}