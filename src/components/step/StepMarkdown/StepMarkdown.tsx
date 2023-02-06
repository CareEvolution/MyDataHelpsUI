import React from 'react'
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser'

export interface StepMarkdownProps {
  text: string;
  inline?: boolean;
}

export default function (props: StepMarkdownProps) {
    let md = new MarkdownIt();
    let htmlContent;
    if (props.inline) {
      htmlContent = md.renderInline(props.text ?? "");
    }
    else {
      htmlContent = md.render(props.text ?? "");
    }
    // trim prevents white-space: "pre" from adding unwanted line breaks
    htmlContent = htmlContent?.trim();
    let elements = parse(htmlContent, {
      replace: domNode => {
        let untypedNode = domNode as any;
        // ensure markdown links open in new window
        if (untypedNode.name === "a" ) {
          untypedNode.attribs.target = "_blank";
        }
      }
    });
    return (
      <>{elements}</>
    );
}

