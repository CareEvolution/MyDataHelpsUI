import React, { CSSProperties, useContext, useLayoutEffect, useRef } from 'react'
import './NavigationBar.css'
import MyDataHelps from '@careevolution/mydatahelps-js'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import language from '../../../helpers/language'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon'
import { ColorDefinition, resolveColor } from '../../../helpers/colors';
import { LayoutContext } from '../Layout';

export type NavigationBarButtonPosition = 'left' | 'right';

export interface NavigationBarProps {
	title?: string;
	subtitle?: string;
	showBackButton?: boolean;
	backButtonText?: string;
	backButtonColor?: ColorDefinition;
	backButtonBackgroundColor?: ColorDefinition;
	showCloseButton?: boolean;
	closeButtonText?: string;
	closeButtonColor?: ColorDefinition;
	closeButtonBackgroundColor?: ColorDefinition;
	closeButtonPosition?: NavigationBarButtonPosition;
	showSaveButton?: boolean;
	saveButtonText?: string;
	saveButtonColor?: ColorDefinition;
	saveButtonBackgroundColor?: ColorDefinition;
	saveButtonPosition?: NavigationBarButtonPosition;
	onSave?: () => void;
	children?: React.ReactNode;
	className?: string;
	variant?: 'default' | 'compressed';
	backgroundColor?: ColorDefinition;
	titleColor?: ColorDefinition;
	subtitleColor?: ColorDefinition;
	buttonColor?: ColorDefinition;
	buttonBackgroundColor?: ColorDefinition;
}

export default function (props: NavigationBarProps) {
	const layoutContext = useContext(LayoutContext);
	const navBar = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const {current} = navBar;

		const scrollListener = (): void => {
			if (window.scrollY > 0) {
				current?.classList.add('scroll-shadow');
			} else {
				current?.classList.remove('scroll-shadow');
			}
		};

		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		}
	})

	const getButtonStyle = (position?: NavigationBarButtonPosition, color?: ColorDefinition, backgroundColor?: ColorDefinition): CSSProperties => {
		let customColor = color ?? props.buttonColor;
		let customBackgroundColor = backgroundColor ?? props.buttonBackgroundColor;
		return {
			color: resolveColor(layoutContext?.colorScheme, customColor),
			background: resolveColor(layoutContext?.colorScheme, customBackgroundColor),
			left: position === 'left' ? customBackgroundColor ? '16px' : '0' : undefined,
			right: position === 'right' ? customBackgroundColor ? '16px' : '0' : undefined
		};
	};

	const onBack = (): void => {
		MyDataHelps.back();
	};

	const onClose = (): void => {
		MyDataHelps.dismiss();
	};

	const onSave = (): void => {
		if (props.onSave) {
			props.onSave();
		}
	};

	let classes = ['mdhui-navigation-bar'];
	if (props.className) {
		classes.push(props.className);
	}
	if (props.variant == 'compressed') {
		classes.push('mdhui-navigation-bar-compressed');
	}

	return (
		<div className={classes.join(' ')} ref={navBar} style={{background: resolveColor(layoutContext?.colorScheme, props.backgroundColor)}}>
			{props.title &&
				<div className="title" style={{color: resolveColor(layoutContext?.colorScheme, props.titleColor)}}>
					<span>{props.title}</span>
				</div>
			}
			{props.subtitle &&
				<div className="subtitle" style={{color: resolveColor(layoutContext?.colorScheme, props.subtitleColor)}}>
					<span>{props.subtitle}</span>
				</div>
			}
			{props.showBackButton &&
				<div className="button" onClick={() => onBack()} style={getButtonStyle('left', props.backButtonColor, props.backButtonBackgroundColor)}>
					<FontAwesomeSvgIcon icon={faChevronLeft}/>&nbsp;{props.backButtonText || language('back')}
				</div>
			}
			{props.showCloseButton &&
				<div className="button" onClick={() => onClose()} style={getButtonStyle(props.closeButtonPosition ?? 'right', props.closeButtonColor, props.closeButtonBackgroundColor)}>
					{props.closeButtonText || language('close')}
				</div>
			}
			{props.showSaveButton &&
				<div className="button" onClick={() => onSave()} style={getButtonStyle(props.saveButtonPosition ?? 'right', props.saveButtonColor, props.saveButtonBackgroundColor)}>
					{props.saveButtonText || language('save')}
				</div>
			}
			{props.children}
		</div>
	);
}