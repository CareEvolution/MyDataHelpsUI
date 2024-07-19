import React from "react";
import "@careevolution/mydatahelps-js";
import { Global as EmotionGlobal, css } from "@emotion/react";
import classesCSS from "./classes.css?raw";
import { InnerHTML } from "./InnerHtml";

export interface HtmlStepProps {
    html?: string;
    styles: {
        titleFontSize?: string;
        titleAlignment?: string;
        titleColor?: string;
        titleFontWeight?: string;
        textFontSize?: string;
        textAlignment?: string;
        textColor?: string;
        textFontWeight?: string;
        nextButtonTextColor?: string;
        nextButtonBackgroundColor?: string;
        nextButtonFontWeight?: string;
        nextButtonLetterSpacing?: string;
        nextButtonTextTransform?: string;
        nextButtonBackgroundGradient?: {
            direction: "LeftToRight" | "TopToBottom";
            startColor: string;
            endColor: string;
        };
    };
}

export default function (props: HtmlStepProps) {
    const customStyleVars = makeCustomStyleVars(props.styles);

    return (
        <div className="mdhui-html-step">
            <EmotionGlobal styles={classesCSS} />
            {customStyleVars &&
                <EmotionGlobal
                    styles={css`
                        ${customStyleVars}
                    `}
                />
            }
            {props.html && <InnerHTML html={props.html} />}
        </div>
    );
}

function makeCustomStyleVars(styles: HtmlStepProps["styles"]): string | null {
    function makeVarIfSet(varName: string, value?: string) {
        if (value) {
            return ` ${varName}: ${value};`;
        }
        return "";
    }

    let providedStyleVars = "";
    providedStyleVars += makeVarIfSet("--mdhui-title-font-size", styles.titleFontSize);
    providedStyleVars += makeVarIfSet("--mdhui-title-text-align", styles.titleAlignment);
    providedStyleVars += makeVarIfSet("--mdhui-title-color", styles.titleColor);
    providedStyleVars += makeVarIfSet("--mdhui-title-font-weight", styles.titleFontWeight);

    providedStyleVars += makeVarIfSet("--mdhui-text-font-size", styles.textFontSize);
    providedStyleVars += makeVarIfSet("--mdhui-text-text-align", styles.textAlignment);
    providedStyleVars += makeVarIfSet("--mdhui-text-color", styles.textColor);
    providedStyleVars += makeVarIfSet("--mdhui-text-font-weight", styles.textFontWeight);

    providedStyleVars += makeVarIfSet("--mdhui-next-button-color", styles.nextButtonTextColor);
    providedStyleVars += makeVarIfSet("--mdhui-next-button-background-color", styles.nextButtonBackgroundColor);
    providedStyleVars += makeVarIfSet("--mdhui-next-button-font-weight", styles.nextButtonFontWeight);
    providedStyleVars += makeVarIfSet("--mdhui-next-button-letter-spacing", styles.nextButtonLetterSpacing);
    providedStyleVars += makeVarIfSet("--mdhui-next-button-text-transform", styles.nextButtonTextTransform?.toLowerCase());
    if (styles.nextButtonBackgroundGradient) {
        const gradientStyle =
            styles.nextButtonBackgroundGradient.direction === "LeftToRight"
                ? `linear-gradient(to right, ${styles.nextButtonBackgroundGradient.startColor} 0%, ${styles.nextButtonBackgroundGradient.endColor} 100%)`
                : `linear-gradient(to bottom, ${styles.nextButtonBackgroundGradient.startColor} 0%, ${styles.nextButtonBackgroundGradient.endColor} 100%)`;
        providedStyleVars += ` --mdhui-next-button-background-image: ${gradientStyle};`;
    }
    providedStyleVars += "";

    return providedStyleVars.length ? `:root { ${providedStyleVars} }` : null;
}