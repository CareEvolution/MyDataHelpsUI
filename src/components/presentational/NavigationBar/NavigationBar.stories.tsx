import React from 'react';
import NavigationBar, { NavigationBarProps } from './NavigationBar';
import Layout from '../Layout'
import DateRangeNavigator from '../DateRangeNavigator';

export default {
	title: 'Presentational/NavigationBar',
	component: NavigationBar,
	parameters: {
		layout: 'fullscreen'
	}
};

const render = (args: NavigationBarProps) => <Layout colorScheme="auto">
	<NavigationBar {...args} />
	<div style={{height: 1500, textAlign: 'center'}}>Scrollable Content</div>
</Layout>;

export const WithBackButton = {
	args: {
		title: 'My Title',
		showBackButton: true
	},
	render: render
};

export const WithBackButtonCustomText = {
	args: {
		title: 'My Title',
		showBackButton: true,
		backButtonText: 'Home'
	},
	render: render
};

export const WithCloseButton = {
	args: {
		title: 'My Title',
		showCloseButton: true
	},
	render: render
};

export const WithCloseButtonCustomText = {
	args: {
		title: 'My Title',
		showCloseButton: true,
		closeButtonText: 'Done'
	},
	render: render
};

export const WithCustomButtons = {
	args: {
		title: 'My Title',
		navigationBarLeft: <div className="button" style={{left: '16px'}}>Close</div>,
		navigationBarRight: <div className="button" style={{color: '#fff', background: '#369cff', right: '16px', padding: '0 16px'}}>Save</div>
	},
	render: render
};

export const Compressed = {
	args: {
		title: 'My Title',
		navigationBarLeft: <div className="button" style={{left: '16px'}}>Close</div>,
		navigationBarRight: <div className="button" style={{color: '#fff', background: '#369cff', right: '16px', padding: '0 16px'}}>Save</div>,
		variant: 'compressed'
	},
	render: render
}

export const CompressedWithSubtitle = {
	args: {
		title: 'My Title',
		subtitle: 'My Subtitle',
		navigationBarLeft: <div className="button" style={{left: '16px'}}>Close</div>,
		navigationBarRight: <div className="button" style={{color: '#fff', background: '#369cff', right: '16px', padding: '0 16px'}}>Save</div>,
		variant: 'compressed'
	},
	render: render
}

export const CompressedModal = {
	args: {
		title: "My Title",
		showCloseButton: true,
		showBackButton: true,
		variant: "compressedModal"
	},
	render: render
}

export const WithDateRangeNavigator = {
	args: {
		title: 'Migraine',
		showCloseButton: true,
		children: <div style={{overflow: 'hidden', borderRadius: '16px', marginTop: '16px'}}>
			<DateRangeNavigator intervalType="Week" intervalStart={new Date()} onIntervalChange={() => {
			}}></DateRangeNavigator>
		</div>
	},
	render: render
}

export const WithRoundedDateRangeNavigator = {
	args: {
		title: 'Migraine',
		showCloseButton: true,
		children: <div style={{overflow: 'hidden', borderRadius: '16px', marginTop: '16px'}}>
			<DateRangeNavigator intervalType="Week" intervalStart={new Date()} onIntervalChange={() => {
			}} variant="rounded"></DateRangeNavigator>
		</div>
	},
	render: render
}