import React from 'react';
import AsthmaControlStatusHeader, { AsthmaControlStatusHeaderProps } from './AsthmaControlStatusHeader';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Container/AsthmaControlStatusHeader',
    component: AsthmaControlStatusHeader,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaControlStatusHeaderProps) => <Layout colorScheme="auto">
    <AsthmaControlStatusHeader {...args} />
</Layout>;

export const NoDataBeforeDevicePaired = {
    args: {
        previewState: 'no-data',
        participant: {
            hasPairedDevice: () => false,
            hasEstablishedBaseline: () => false
        }
    },
    render: render
};

export const NoDataBeforeBaselineEstablished = {
    args: {
        previewState: 'no-data',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => false
        }
    },
    render: render
};

export const NoDataBaselineEstablishedNothingOutOfRange = {
    args: {
        previewState: 'no-data',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedDaytimeHeartRateOutOfRange = {
    args: {
        previewState: 'abnormal-dhr',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedNighttimeHeartRateOutOfRange = {
    args: {
        previewState: 'abnormal-nhr',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedRROutOfRange = {
    args: {
        previewState: 'abnormal-rr',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedActivityOutOfRange = {
    args: {
        previewState: 'abnormal-activity',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedSleepOutOfRange = {
    args: {
        previewState: 'abnormal-sleep',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedHomeAQOutOfRange = {
    args: {
        previewState: 'abnormal-home-aqi',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedWorkAQOutOfRange = {
    args: {
        previewState: 'abnormal-work-aqi',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NoDataBaselineEstablishedMultipleOutOfRange = {
    args: {
        previewState: 'abnormal-multiple',
        participant: {
            hasPairedDevice: () => true,
            hasEstablishedBaseline: () => true
        }
    },
    render: render
};

export const NotDetermined = {
    args: {
        previewState: 'not-determined'
    },
    render: render
};

export const NotControlled = {
    args: {
        previewState: 'not-controlled'
    },
    render: render
};

export const Controlled = {
    args: {
        previewState: 'controlled'
    },
    render: render
};