import React from "react";

export const formatInnerSpan = (text: string, spanClassName: string): React.JSX.Element => {

    if (text.includes("|||")) {
        const pieces = text.split("|||");
        return <>{pieces[0]}<span className={spanClassName}>{pieces[1]}</span>{pieces[2]}</>;
    }
    return <>{text}</>;
}