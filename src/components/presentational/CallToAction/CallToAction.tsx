import React from "react"
import Title from "../Title"
import "./CallToAction.css"

export interface CallToActionProps {
    title: string
    children?: React.ReactNode
    image?: React.ReactNode
    variant?: "large" | "medium"
    className?: string
    innerRef?: React.Ref<HTMLDivElement>
}

export default function CallToActionHeader(props: CallToActionProps) {
    let variant = props.variant || "large";
    let classes = ["mdhui-cta", `mdhui-cta-${variant}`];
    if(props.className){
        classes.push(props.className);
    }

    return <div ref={props.innerRef} className={classes.join(" ")}>
        <div className="mdhui-cta-header">
            {props.image}
            <Title className="mdhui-cta-title" order={variant == "large" ? 2 : 3}>{props.title}</Title>
        </div>
        <div className="mdhui-cta-body">{props.children}</div>
    </div>
}