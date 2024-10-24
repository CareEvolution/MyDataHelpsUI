import React, { CSSProperties, useContext, useState } from 'react';
import { ColorDefinition, computeThresholdDays, getDailyDataTypeDefinition, getSurveyDataProvider, isSurveyDataType, NotEnteredThreshold, OverviewData, OverviewDataProvider, OverviewDataType, resolveColor, useInitializeView } from '../../../helpers';
import { LayoutContext, LoadingIndicator } from '../../presentational';
import './OverviewTable.css';
import { add, startOfToday } from 'date-fns';
import { createPreviewDataProvider } from './OverviewTable.previewData';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';

export interface OverviewTableProps {
    preview?: boolean;
    primaryDataType: OverviewDataType;
    secondaryDataTypes: OverviewDataType[];
    daysToCompute?: number;
    primaryHeaderBackgroundColor?: ColorDefinition;
    primaryHeaderTextColor?: ColorDefinition;
    goodValueBackgroundColor?: ColorDefinition;
    goodValueTextColor?: ColorDefinition;
    goodValueIndicator?: IconDefinition;
    notGoodValueBackgroundColor?: ColorDefinition;
    notGoodValueTextColor?: ColorDefinition;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: OverviewTableProps) {
    const layoutContext = useContext(LayoutContext);

    const [primaryData, setPrimaryData] = useState<OverviewData>();
    const [secondaryData, setSecondaryData] = useState<OverviewData[]>();

    const primaryHeaderBackgroundColor = resolveColor(layoutContext.colorScheme, props.primaryHeaderBackgroundColor ?? { lightMode: '#e2f1ff', darkMode: '#000' });
    const primaryHeaderTextColor = resolveColor(layoutContext.colorScheme, props.primaryHeaderTextColor ?? { lightMode: '#000', darkMode: '#8bcbff' });

    const goodValueBackgroundColor = resolveColor(layoutContext.colorScheme, props.goodValueBackgroundColor ?? { lightMode: '#c8ffc2', darkMode: '#000' });
    const goodValueTextColor = resolveColor(layoutContext.colorScheme, props.goodValueTextColor ?? { lightMode: '#000', darkMode: '#96ff85' });

    const notGoodValueBackgroundColor = resolveColor(layoutContext.colorScheme, props.notGoodValueBackgroundColor ?? { lightMode: '#ffedc2', darkMode: '#000' });
    const notGoodValueTextColor = resolveColor(layoutContext.colorScheme, props.notGoodValueTextColor ?? { lightMode: '#000', darkMode: '#ffc847' });

    const daysToCompute = props.daysToCompute ?? 28;
    const today = startOfToday();
    const startDate = add(today, { days: -daysToCompute });

    const getDataProvider = (dataType: OverviewDataType): OverviewDataProvider => {
        if (isSurveyDataType(dataType.rawDataType)) {
            return { type: dataType, dataProvider: getSurveyDataProvider(dataType.rawDataType) };
        }
        return { type: dataType, dataProvider: getDailyDataTypeDefinition(dataType.rawDataType).dataProvider };
    };

    const getPrimaryDataProvider = (): OverviewDataProvider => {
        if (props.preview) {
            return createPreviewDataProvider(props.primaryDataType);
        }
        return getDataProvider(props.primaryDataType);
    };

    const getSecondaryDataProviders = (): OverviewDataProvider[] => {
        if (props.preview) {
            return props.secondaryDataTypes.map(createPreviewDataProvider);
        }
        return props.secondaryDataTypes.map(getDataProvider);
    };

    useInitializeView(() => {
        const primaryDataProvider = getPrimaryDataProvider();
        primaryDataProvider.dataProvider(startDate, today).then(result => {
            return { type: primaryDataProvider.type, queryResult: result };
        }).then(setPrimaryData);

        const secondaryDataProviders = getSecondaryDataProviders();
        Promise.all(secondaryDataProviders.map(secondaryDataProvider => secondaryDataProvider.dataProvider(startDate, today).then(result => {
            return { type: secondaryDataProvider.type, queryResult: result };
        }))).then(setSecondaryData);
    }, [], [props.preview, props.primaryDataType, props.secondaryDataTypes]);

    if (!primaryData || !secondaryData) {
        return <div className="mdhui-overview-table" ref={props.innerRef}><LoadingIndicator /></div>;
    }

    const thresholdDaysLookup = computeThresholdDays(startDate, today, primaryData);

    const allThresholds = primaryData.type.thresholds.map(threshold => threshold.label).concat(NotEnteredThreshold);
    const filteredThresholds = allThresholds.filter(threshold => Object.keys(thresholdDaysLookup).includes(threshold));

    return <div className="mdhui-overview-table" style={{ gridTemplateColumns: Array(secondaryData.length + 1).fill('1fr').join(' ') }} ref={props.innerRef}>
        <div className="mdhui-overview-table-header-primary" style={{ background: primaryHeaderBackgroundColor, color: primaryHeaderTextColor }}>
            {primaryData.type.label.primary}
        </div>
        {secondaryData.map(data => {
            return <div className="mdhui-overview-table-header-secondary" key={`mdhui-overview-table-header-secondary-${data.type.label.primary}`}>
                <div className="mdhui-overview-table-header-secondary-label">{data.type.label.secondary ?? data.type.label.primary}</div>
                <div className="mdhui-overview-table-header-secondary-units">{data.type.units ?? <div>&nbsp;</div>}</div>
            </div>;
        })}
        {filteredThresholds.map(threshold => {
            const thresholdDays = thresholdDaysLookup[threshold];
            return <React.Fragment key={threshold}>
                <div className="mdhui-overview-table-threshold">{threshold}</div>
                {secondaryData.map(data => {
                    const filteredValues = Object.keys(data.queryResult).filter(key => thresholdDays.includes(key)).map(key => data.queryResult[key]);
                    const calculatedValue = filteredValues.length > 0
                        ? data.type.secondaryValueCalculator(thresholdDays.length, filteredValues)
                        : undefined;
                    const formattedValue = calculatedValue !== undefined
                        ? data.type.secondaryValueFormatter(calculatedValue)
                        : '-';
                    const valueIsGood = calculatedValue !== undefined && data.type.secondaryValueEvaluator(calculatedValue);
                    const valueStyle: CSSProperties = {
                        background: valueIsGood ? goodValueBackgroundColor : notGoodValueBackgroundColor,
                        color: valueIsGood ? goodValueTextColor : notGoodValueTextColor
                    };

                    return <div className="mdhui-overview-table-value" key={data.type.label.primary} style={valueStyle}>
                        {valueIsGood && props.goodValueIndicator &&
                            <div className="mdhui-overview-table-value-good-indicator">
                                <FontAwesomeSvgIcon icon={props.goodValueIndicator} />
                            </div>
                        }
                        {formattedValue}
                    </div>;
                })}
            </React.Fragment>;
        })}
    </div>;
}