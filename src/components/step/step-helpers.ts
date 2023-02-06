import {StepElementProps} from "./shared"

export default function stepElementStyle(props: StepElementProps) {
    var style = {
      textAlign: props.textAlign,
      color: props.color,
      fontSize: props.fontSize ? `${props.fontSize}px` : undefined,
      fontWeight: props.fontWeight,
      backgroundImage: ""
    };
    return style;
}