import React, { useEffect, useState } from 'react';
import './ValueSelector.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export interface ValueSelectorProps {
	title?: string;
	subtitle?: string;
	values: string[],
	selectedValues?: string[],
	onChange?: (selectedValues: string[]) => void;
	variant?: 'default' | 'checkboxes';
	multiSelect?: boolean;
	preventEmptySelections?: boolean;
	innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: ValueSelectorProps) {
	const [selectedValues, setSelectedValues] = useState<string[]>([]);

	useEffect(() => {
		setSelectedValues(props.selectedValues ?? []);
	}, [props.selectedValues]);

	const updateSelectedValues = (updatedSelectedValues: string[]): void => {
		setSelectedValues(updatedSelectedValues);
		if (props.onChange) {
			props.onChange(updatedSelectedValues);
		}
	};

	const onClick = (value: string): void => {
		if (selectedValues.includes(value)) {
			if (selectedValues.length > 1 || !props.preventEmptySelections) {
				updateSelectedValues(selectedValues.filter(v => v !== value));
			}
		} else if (props.multiSelect) {
			updateSelectedValues([...selectedValues, value]);
		} else {
			updateSelectedValues([value]);
		}
	};

	return <div className="mdhui-value-selector" ref={props.innerRef}>
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
				return <div key={index} className={classes.join(' ')} onClick={() => onClick(value)}>
					<div className="mdhui-value-selector-value-text">{value}</div>
					{props.variant === 'checkboxes' && selectedValues.includes(value) &&
						<FontAwesomeIcon className="mdhui-value-selector-value-checkbox-icon-selected" icon={faCheckCircle}/>
					}
					{props.variant === 'checkboxes' && !selectedValues.includes(value) &&
						<FontAwesomeIcon className="mdhui-value-selector-value-checkbox-icon" icon={faCircle}/>
					}
				</div>;
			})}
		</div>
	</div>;
}