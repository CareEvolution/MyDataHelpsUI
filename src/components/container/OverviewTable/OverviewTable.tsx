import React, { CSSProperties, useContext, useState } from 'react';
import { ColorDefinition, computeThresholdDays, getDailyDataTypeDefinition, getSurveyDataProvider, isSurveyDataType, NotEnteredThreshold, OverviewData, OverviewDataProvider, OverviewDataType, PrimaryOverviewDataType, resolveColor, SecondaryOverviewDataType, useInitializeView } from '../../../helpers';
import { LayoutContext, LoadingIndicator } from '../../presentational';
import './OverviewTable.css';
import { add, startOfToday } from 'date-fns';
import { createPreviewDataProvider } from './OverviewTable.previewData';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import language from '../../../helpers/language';

export interface OverviewTableProps {
    preview?: boolean;
    primaryDataType: PrimaryOverviewDataType;
    secondaryDataTypes: SecondaryOverviewDataType[];
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

/**
 * The overview table component can be used to compare multiple daily survey and daily data values in a tabular format.
 *
 * The primary data type is first grouped by value threshold.  The secondary data types are then grouped by the same
 * days in which the primary values met each threshold.  This is intended to illustrate what the values from each of
 * the secondary data types looked like on the days when the values from the primary data type were within a given
 * threshold (i.e. What did my step count look like when my mood rating was high?).
 */
export default function OverviewTable(props: OverviewTableProps) {
    const layoutContext = useContext(LayoutContext);

    const [primaryData, setPrimaryData] = useState<OverviewData<PrimaryOverviewDataType>>();
    const [secondaryData, setSecondaryData] = useState<OverviewData<SecondaryOverviewDataType>[]>();

    const primaryHeaderBackgroundColor = resolveColor(layoutContext.colorScheme, props.primaryHeaderBackgroundColor ?? { lightMode: '#e2f1ff', darkMode: '#000' });
    const primaryHeaderTextColor = resolveColor(layoutContext.colorScheme, props.primaryHeaderTextColor ?? { lightMode: '#000', darkMode: '#8bcbff' });

    const goodValueBackgroundColor = resolveColor(layoutContext.colorScheme, props.goodValueBackgroundColor ?? { lightMode: '#c8ffc2', darkMode: '#000' });
    const goodValueTextColor = resolveColor(layoutContext.colorScheme, props.goodValueTextColor ?? { lightMode: '#000', darkMode: '#96ff85' });

    const notGoodValueBackgroundColor = resolveColor(layoutContext.colorScheme, props.notGoodValueBackgroundColor ?? { lightMode: '#ffedc2', darkMode: '#000' });
    const notGoodValueTextColor = resolveColor(layoutContext.colorScheme, props.notGoodValueTextColor ?? { lightMode: '#000', darkMode: '#ffc847' });

    const daysToCompute = props.daysToCompute ?? 28;
    const today = startOfToday();
    const startDate = add(today, { days: -daysToCompute });

    const getDataProvider = <T extends OverviewDataType>(dataType: T): OverviewDataProvider<T> => {
        if (isSurveyDataType(dataType.rawDataType)) {
            return { type: dataType, dataProvider: getSurveyDataProvider(dataType.rawDataType) };
        }
        return { type: dataType, dataProvider: getDailyDataTypeDefinition(dataType.rawDataType).dataProvider };
    };

    const getPrimaryDataProvider = (): OverviewDataProvider<PrimaryOverviewDataType> => {
        if (props.preview) {
            return createPreviewDataProvider(props.primaryDataType);
        }
        return getDataProvider(props.primaryDataType);
    };

    const getSecondaryDataProviders = (): OverviewDataProvider<SecondaryOverviewDataType>[] => {
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

    const getDefaultOverviewDataTypeLabel = (dataType: OverviewDataType): string => {
        if (isSurveyDataType(dataType.rawDataType)) {
            return dataType.rawDataType.stepIdentifier;
        }
        const labelKey = getDailyDataTypeDefinition(dataType.rawDataType).labelKey;
        return labelKey ? language(labelKey) : dataType.rawDataType;
    };

    return <div className="mdhui-overview-table" style={{ gridTemplateColumns: '112px 1fr ' + Array(Math.max(0, secondaryData.length - 1)).fill('1fr').join(' ') }} ref={props.innerRef}>
        <div className="mdhui-overview-table-header-primary" style={{ background: primaryHeaderBackgroundColor, color: primaryHeaderTextColor }}>
            {primaryData.type.label ?? getDefaultOverviewDataTypeLabel(primaryData.type)}
        </div>
        {secondaryData.length === 0 &&
            <div className="mdhui-overview-table-no-secondary-data">{language('overview-table-no-secondary-data')}</div>
        }
        {secondaryData.map(data => data.type).map((overviewDataType: SecondaryOverviewDataType, index: number) => {
            return <div className="mdhui-overview-table-header-secondary" key={index}>
                <div className="mdhui-overview-table-header-secondary-label">{overviewDataType.label ?? getDefaultOverviewDataTypeLabel(overviewDataType)}</div>
                <div className="mdhui-overview-table-header-secondary-units">{overviewDataType.units ?? <div>&nbsp;</div>}</div>
            </div>;
        })}
        {filteredThresholds.map(threshold => {
            const thresholdDays = thresholdDaysLookup[threshold];
            return <React.Fragment key={threshold}>
                <div className="mdhui-overview-table-threshold">{threshold}</div>
                {secondaryData.map((data: OverviewData<SecondaryOverviewDataType>, index: number) => {
                    const filteredValues = Object.keys(data.queryResult).filter(key => thresholdDays.includes(key)).map(key => data.queryResult[key]);
                    const calculatedValue = filteredValues.length > 0
                        ? data.type.valueCalculator.calculate(thresholdDays, filteredValues)
                        : undefined;
                    const formattedValue = calculatedValue !== undefined
                        ? data.type.valueFormatter.format(calculatedValue)
                        : '-';
                    const valueIsGood = calculatedValue !== undefined && data.type.valueEvaluator.evaluate(calculatedValue);
                    const valueStyle: CSSProperties = {
                        background: valueIsGood ? goodValueBackgroundColor : notGoodValueBackgroundColor,
                        color: valueIsGood ? goodValueTextColor : notGoodValueTextColor
                    };

                    return <div className="mdhui-overview-table-value" key={index} style={valueStyle}>
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