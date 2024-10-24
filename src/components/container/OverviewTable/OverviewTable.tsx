import React, { useState } from 'react';
import { getDailyDataTypeDefinition, getDayKey, OverviewData, OverviewDataType, SecondaryOverviewDataType, useInitializeView } from '../../../helpers';
import { LoadingIndicator } from '../../presentational';
import './OverviewTable.css';
import { PreviewData } from './OverviewTable.previewData';
import { add, startOfToday } from 'date-fns';

export interface OverviewThresholdEvaluator {
    getAllThresholds: () => string[];
    getThreshold: (value: number) => string;
}

export interface OverviewTableProps {
    previewState?: 'mood';
    primaryDataType: OverviewDataType;
    secondaryDataTypes: SecondaryOverviewDataType[];
    thresholdEvaluator: OverviewThresholdEvaluator;
    daysToCompute?: number;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: OverviewTableProps) {
    const [primaryData, setPrimaryData] = useState<OverviewData>();
    const [secondaryData, setSecondaryData] = useState<OverviewData[]>();

    const daysToCompute = props.daysToCompute ?? 28;
    const today = startOfToday();
    const startDate = add(today, { days: -daysToCompute });

    useInitializeView(() => {
        const primaryDataProvider = props.previewState
            ? PreviewData.createPrimaryDataProvider(props.previewState)
            : { type: props.primaryDataType, dataProvider: getDailyDataTypeDefinition(props.primaryDataType.dailyDataType).dataProvider };

        primaryDataProvider.dataProvider(startDate, today).then(data => {
            return { type: primaryDataProvider.type, data: data };
        }).then(setPrimaryData);

        const secondaryDataProviders = props.previewState
            ? PreviewData.createSecondaryDataProviders(props.previewState)
            : props.secondaryDataTypes.map(type => {
                return { type: type, dataProvider: getDailyDataTypeDefinition(type.dailyDataType).dataProvider };
            });

        Promise.all(secondaryDataProviders.map(provider => provider.dataProvider(startDate, today).then(data => {
            return { type: provider.type, data: data };
        }))).then(setSecondaryData);
    }, [], [props.previewState]);

    if (!primaryData || !secondaryData) {
        return <div className="mdhui-overview-table" ref={props.innerRef}><LoadingIndicator /></div>;
    }

    const thresholdDaysLookup: { [key: string]: string[] } = {};
    const thresholdEvaluator = props.previewState ? PreviewData.createThresholdEvaluator(props.previewState) : props.thresholdEvaluator
    const allThresholds = thresholdEvaluator.getAllThresholds();

    let currentDate = startDate;
    while (currentDate <= today) {
        const currentDayKey = getDayKey(currentDate);
        const threshold = thresholdEvaluator.getThreshold(primaryData.data[currentDayKey]);
        if (!thresholdDaysLookup.hasOwnProperty(threshold)) {
            thresholdDaysLookup[threshold] = [];
        }
        thresholdDaysLookup[threshold].push(currentDayKey);
        currentDate = add(currentDate, { days: 1 });
    }

    return <div className="mdhui-overview-table" ref={props.innerRef} style={{ gridTemplateColumns: Array(secondaryData.length + 1).fill('1fr').join(' ') }}>
        <div className="mdhui-overview-table-header-primary">{primaryData.type.label}</div>
        {secondaryData.map((data, index) => {
            return <div
                className="mdhui-overview-table-header-secondary"
                style={{ borderRight: index === secondaryData.length - 1 ? 0 : undefined }}
                key={`mdhui-overview-table-header-${index}`}
            >
                {data.type.label}
            </div>;
        })}
        {allThresholds.map((threshold, thresholdIndex) => {
            const thresholdDays = thresholdDaysLookup[threshold];
            return <React.Fragment key={threshold}>
                <div
                    className="mdhui-overview-table-threshold"
                    style={{ borderBottom: thresholdIndex === allThresholds.length - 1 ? 0 : undefined }}
                    key={`${threshold} - ${primaryData.type.label}`}
                >
                    {threshold}
                </div>
                {secondaryData.map((overviewData, secondaryDataIndex) => {
                    const filteredValues = Object.keys(overviewData.data).filter(key => thresholdDays.includes(key)).map(key => overviewData.data[key]);
                    const calculatedValue = filteredValues.length > 0
                        ? overviewData.type.valueCalculator.calculate(thresholdDays.length, filteredValues)
                        : undefined;
                    const formattedValue = calculatedValue !== undefined
                        ? overviewData.type.valueFormatter.format(calculatedValue)
                        : '-';
                    const valueClass = calculatedValue !== undefined && overviewData.type.valueEvaluator.isGood(calculatedValue)
                        ? 'mdhui-overview-table-value-good'
                        : 'mdhui-overview-table-value-not-good'

                    return <div
                        className={`mdhui-overview-table-value ${valueClass}`}
                        style={{
                            borderRight: secondaryDataIndex === secondaryData.length - 1 ? 0 : undefined,
                            borderBottom: thresholdIndex === allThresholds.length - 1 ? 0 : undefined
                        }}
                        key={`${threshold} - ${overviewData.type.label}`}
                    >
                        {formattedValue}
                    </div>
                })}
            </React.Fragment>;
        })}
    </div>;
}