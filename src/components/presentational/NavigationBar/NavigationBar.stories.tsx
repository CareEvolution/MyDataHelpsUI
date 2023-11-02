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

export const WithBackButtonCustomColors = {
	args: {
		title: 'My Title',
		showBackButton: true,
		backButtonColor: '#fff',
		backButtonBackgroundColor: '#369cff'
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

export const WithCloseButtonCustomPosition = {
	args: {
		title: 'My Title',
		showCloseButton: true,
		closeButtonPosition: 'left'
	},
	render: render
};

export const WithCloseButtonCustomColors = {
	args: {
		title: 'My Title',
		showCloseButton: true,
		closeButtonColor: '#fff',
		closeButtonBackgroundColor: '#369CFF'
	},
	render: render
};

export const WithSaveButton = {
	args: {
		title: 'My Title',
		showSaveButton: true,
		onSave: () => {
			console.log('save clicked');
		}
	},
	render: render
};

export const WithSaveButtonCustomText = {
	args: {
		title: 'My Title',
		showSaveButton: true,
		saveButtonText: 'Commit',
		onSave: () => {
			console.log('save clicked');
		}
	},
	render: render
};

export const WithSaveButtonCustomPosition = {
	args: {
		title: 'My Title',
		showSaveButton: true,
		saveButtonPosition: 'left',
		onSave: () => {
			console.log('save clicked');
		}
	},
	render: render
};

export const WithSaveButtonCustomColors = {
	args: {
		title: 'My Title',
		showSaveButton: true,
		saveButtonColor: '#fff',
		saveButtonBackgroundColor: '#369cff',
		onSave: () => {
			console.log('save clicked');
		}
	},
	render: render
};

export const Compressed = {
	args: {
		title: 'My Title',
		showCloseButton: true,
		closeButtonPosition: 'left',
		showSaveButton: true,
		saveButtonColor: '#fff',
		saveButtonBackgroundColor: '#369cff',
		onSave: () => {
			console.log('save clicked');
		},
		variant: 'compressed'
	},
	render: render
}

export const CompressedWithSubtitle = {
	args: {
		title: 'My Title',
		subtitle: 'My Subtitle',
		showCloseButton: true,
		closeButtonPosition: 'left',
		showSaveButton: true,
		saveButtonColor: '#fff',
		saveButtonBackgroundColor: '#369cff',
		onSave: () => {
			console.log('save clicked');
		},
		variant: 'compressed'
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