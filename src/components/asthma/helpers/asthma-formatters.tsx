import React from "react";

/** Highlights text (set off by ||| markers within a longer string) with a custom class span.
* The highlighted text may come at the beginning, middle, or end of the string.
* It will only handle a single highlight.
* For example: "This is my |||highlighted text||| string." will result in 
* a JSX element <>This is my <span className="yourCustomClass">highlighted text</span> string.</>
*/
export const highlightInnerText = (text: string, spanClassName: string): React.JSX.Element => {

    if (text.includes("|||")) {
        const pieces = text.split("|||");
        return <>{pieces[0]}<span className={spanClassName}>{pieces[1]}</span>{pieces[2]}</>;
    }
    return <>{text}</>;
}