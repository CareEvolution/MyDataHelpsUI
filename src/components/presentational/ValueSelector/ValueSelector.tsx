import React, { CSSProperties, useContext } from 'react';
import './ValueSelector.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';
import UnstyledButton from '../UnstyledButton';

export interface ValueSelectorProps {
	title?: string;
	titleColor?: ColorDefinition;
	subtitle?: string;
	subtitleColor?: ColorDefinition;
	values: string[];
	valueBackgroundColor?: ColorDefinition;
	valueTextColor?: ColorDefinition;
	checkboxColor?: ColorDefinition;
	selectedValues?: string[];
	selectedButtonBackgroundColor?: ColorDefinition;
	selectedButtonTextColor?: ColorDefinition;
	selectedCheckboxColor?: ColorDefinition;
	onChange?: (selectedValues: string[]) => void;
	variant?: 'default' | 'checkboxes';
	multiSelect?: boolean;
	preventEmptySelections?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: ValueSelectorProps) {
	const layoutContext = useContext(LayoutContext);

	const selectedValues = props.selectedValues ?? [];

	const onChange = (selectedValues: string[]): void => {
		if (props.onChange) {
			props.onChange(selectedValues);
		}
	};

	const onClick = (value: string): void => {
		if (selectedValues.includes(value)) {
			if (selectedValues.length > 1 || !props.preventEmptySelections) {
				onChange(selectedValues.filter(v => v !== value));
			}
		} else if (props.multiSelect) {
			onChange([...selectedValues, value]);
		} else {
			onChange([value]);
		}
	};

	let colorStyles = {
		'--mdhui-value-selector-title-color': resolveColor(layoutContext?.colorScheme, props.titleColor),
		'--mdhui-value-selector-subtitle-color': resolveColor(layoutContext?.colorScheme, props.subtitleColor),
		'--mdhui-value-selector-value-background-color': resolveColor(layoutContext?.colorScheme, props.valueBackgroundColor),
		'--mdhui-value-selector-value-text-color': resolveColor(layoutContext?.colorScheme, props.valueTextColor),
		'--mdhui-value-selector-button-value-selected-background-color': resolveColor(layoutContext?.colorScheme, props.selectedButtonBackgroundColor),
		'--mdhui-value-selector-button-value-selected-text-color': resolveColor(layoutContext?.colorScheme, props.selectedButtonTextColor),
		'--mdhui-value-selector-checkbox-color': resolveColor(layoutContext?.colorScheme, props.checkboxColor),
		'--mdhui-value-selector-checkbox-selected-color': resolveColor(layoutContext?.colorScheme, props.selectedCheckboxColor)
	} as CSSProperties;

	return <div className="mdhui-value-selector" style={colorStyles} ref={props.innerRef}>
		{props.title &&
			<div className="mdhui-value-selector-title">{props.title}</div>
		}
		{props.subtitle &&
			<div className="mdhui-value-selector-subtitle">{props.subtitle}</div>
		}
		<div className="mdhui-value-selector-values">
			{props.values.map((value, index) => {
				let classes: string[] = ['mdhui-value-selector-value'];
				if (selectedValues.includes(value)) {
					classes.push('mdhui-value-selector-value-selected');
				}
				if (props.variant === 'checkboxes') {
					classes.push('mdhui-value-selector-value-checkbox');
				} else {
					classes.push('mdhui-value-selector-value-button');
				}
				return <UnstyledButton key={index} onClick={() => onClick(value)}>
					<div className={classes.join(' ')}>
						<div className="mdhui-value-selector-value-text">{value}</div>
						{props.variant === 'checkboxes' && selectedValues.includes(value) &&
							<FontAwesomeIcon className="mdhui-value-selector-value-checkbox-icon mdhui-value-selector-value-checkbox-icon-selected" icon={faCheckCircle}/>
						}
						{props.variant === 'checkboxes' && !selectedValues.includes(value) &&
							<FontAwesomeIcon className="mdhui-value-selector-value-checkbox-icon" icon={faCircle}/>
						}
					</div>
				</UnstyledButton>;
			})}
		</div>
	</div>;
}