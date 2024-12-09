import React, { CSSProperties, useContext, useState } from 'react';
import { ColorDefinition, computeThresholdDays, getDailyDataTypeDefinition, getSurveyDataProvider, InsightMatrixComparisonDataConfiguration, InsightMatrixData, InsightMatrixDataConfiguration, InsightMatrixDataProvider, InsightMatrixGroupByDataConfiguration, isSurveyDataType, NotEnteredThreshold, resolveColor, useInitializeView } from '../../../helpers';
import { LayoutContext, LoadingIndicator } from '../../presentational';
import './InsightMatrix.css';
import { add, startOfToday } from 'date-fns';
import { createPreviewDataProvider } from './InsightMatrix.previewData';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import language from '../../../helpers/language';

export interface InsightMatrixProps {
    preview?: boolean;
    groupByDataConfiguration: InsightMatrixGroupByDataConfiguration;
    comparisonDataConfigurations: InsightMatrixComparisonDataConfiguration[];
    daysToCompute?: number;
    showUnmatchedThresholds?: boolean;
    groupByHeaderBackgroundColor?: ColorDefinition;
    groupByHeaderTextColor?: ColorDefinition;
    goodValueBackgroundColor?: ColorDefinition;
    goodValueTextColor?: ColorDefinition;
    goodValueIndicator?: IconDefinition;
    otherValueBackgroundColor?: ColorDefinition;
    otherValueTextColor?: ColorDefinition;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * The insight matrix component can be used to compare multiple daily survey and daily data values in a tabular format.
 *
 * The group-by data is first grouped by value threshold.  The comparison data are then grouped by the same days in
 * which the group-by data values met each threshold.  This is intended to illustrate what the values from each of the
 * comparison data looked like on the days when the values from the group-by data were within a given threshold (i.e.
 * What did my step count look like when my mood rating was high?).
 */
export default function InsightMatrix(props: InsightMatrixProps) {
    const layoutContext = useContext(LayoutContext);

    const [groupByData, setGroupByData] = useState<InsightMatrixData<InsightMatrixGroupByDataConfiguration>>();
    const [comparisonData, setComparisonData] = useState<InsightMatrixData<InsightMatrixComparisonDataConfiguration>[]>();

    const daysToCompute = props.daysToCompute ?? 28;
    const startDate = add(startOfToday(), { days: -daysToCompute });
    const endDate = add(startOfToday(), { days: -1 })

    const getDataProvider = <T extends InsightMatrixDataConfiguration>(configuration: T): InsightMatrixDataProvider<T> => {
        if (isSurveyDataType(configuration.rawDataType)) {
            return { configuration: configuration, loadData: getSurveyDataProvider(configuration.rawDataType) };
        }
        return { configuration: configuration, loadData: getDailyDataTypeDefinition(configuration.rawDataType).dataProvider };
    };

    const getGroupByDataProvider = (): InsightMatrixDataProvider<InsightMatrixGroupByDataConfiguration> => {
        if (props.preview) {
            return createPreviewDataProvider(props.groupByDataConfiguration);
        }
        return getDataProvider(props.groupByDataConfiguration);
    };

    const getComparisonDataProviders = (): InsightMatrixDataProvider<InsightMatrixComparisonDataConfiguration>[] => {
        if (props.preview) {
            return props.comparisonDataConfigurations.map(createPreviewDataProvider);
        }
        return props.comparisonDataConfigurations.map(getDataProvider);
    };

    useInitializeView(() => {
        const groupByDataProvider = getGroupByDataProvider();
        groupByDataProvider.loadData(startDate, endDate).then(result => {
            return { configuration: groupByDataProvider.configuration, result: result };
        }).then(setGroupByData);

        const comparisonDataProviders = getComparisonDataProviders();
        Promise.all(comparisonDataProviders.map(comparisonDataProvider => comparisonDataProvider.loadData(startDate, endDate).then(result => {
            return { configuration: comparisonDataProvider.configuration, result: result };
        }))).then(setComparisonData);
    }, [], [props.preview, props.groupByDataConfiguration, props.comparisonDataConfigurations]);

    if (!groupByData || !comparisonData) {
        return <div className="mdhui-insight-matrix" ref={props.innerRef}><LoadingIndicator /></div>;
    }

    const thresholdDaysLookup = computeThresholdDays(startDate, endDate, groupByData);

    let thresholds = groupByData.configuration.thresholds.map(threshold => threshold.label).concat(NotEnteredThreshold);
    if (!props.showUnmatchedThresholds) {
        const matchedThresholds = Object.keys(thresholdDaysLookup);
        thresholds = thresholds.filter(threshold => matchedThresholds.includes(threshold));
    }

    const getDefaultDataLabel = (configuration: InsightMatrixDataConfiguration): string => {
        if (isSurveyDataType(configuration.rawDataType)) {
            return configuration.rawDataType.stepIdentifier;
        }
        const labelKey = getDailyDataTypeDefinition(configuration.rawDataType).labelKey;
        return labelKey ? language(labelKey) : configuration.rawDataType;
    };

    const getColorVariable = (variable: string, colorDefinition: ColorDefinition | undefined) => {
        const color: { [key: string]: string | undefined } = {};
        color[variable] = resolveColor(layoutContext.colorScheme, colorDefinition ?? { lightMode: `var(${variable}-light)`, darkMode: `var(${variable}-dark)` });
        return color;
    };

    const colorStyles = {
        ...getColorVariable('--mdhui-insight-matrix-header-group-by-background-color', props.groupByHeaderBackgroundColor),
        ...getColorVariable('--mdhui-insight-matrix-header-group-by-text-color', props.groupByHeaderTextColor),
        ...getColorVariable('--mdhui-insight-matrix-value-good-background-color', props.goodValueBackgroundColor),
        ...getColorVariable('--mdhui-insight-matrix-value-good-text-color', props.goodValueTextColor),
        ...getColorVariable('--mdhui-insight-matrix-value-other-background-color', props.otherValueBackgroundColor),
        ...getColorVariable('--mdhui-insight-matrix-value-other-text-color', props.otherValueTextColor)
    } as CSSProperties;

    const matrixStyles = {
        gridTemplateColumns: '112px 1fr ' + Array(Math.max(0, comparisonData.length - 1)).fill('1fr').join(' ')
    } as CSSProperties;

    return <div className="mdhui-insight-matrix" style={{ ...colorStyles, ...matrixStyles }} ref={props.innerRef}>
        <div className="mdhui-insight-matrix-header-group-by">
            {groupByData.configuration.label ?? getDefaultDataLabel(groupByData.configuration)}
        </div>
        {comparisonData.length === 0 &&
            <div className="mdhui-insight-matrix-no-comparison-data">{language('insight-matrix-no-comparison-data')}</div>
        }
        {comparisonData.map(data => data.configuration).map((configuration: InsightMatrixComparisonDataConfiguration, index: number) => {
            return <div className="mdhui-insight-matrix-header-comparison" key={index}>
                <div className="mdhui-insight-matrix-header-comparison-label">{configuration.label ?? getDefaultDataLabel(configuration)}</div>
                <div className="mdhui-insight-matrix-header-comparison-units">{configuration.units ?? <div>&nbsp;</div>}</div>
            </div>;
        })}
        {thresholds.map(threshold => {
            const thresholdDays = thresholdDaysLookup[threshold] ?? [];
            return <React.Fragment key={threshold}>
                <div className="mdhui-insight-matrix-threshold">{threshold}</div>
                {comparisonData.map((data: InsightMatrixData<InsightMatrixComparisonDataConfiguration>, index: number) => {
                    const filteredValues = Object.keys(data.result).filter(key => thresholdDays.includes(key)).map(key => data.result[key]);
                    const calculatedValue = filteredValues.length > 0
                        ? data.configuration.valueCalculator.calculate(thresholdDays, filteredValues)
                        : undefined;
                    const formattedValue = calculatedValue !== undefined
                        ? data.configuration.valueFormatter.format(calculatedValue)
                        : '-';
                    const valueIsGood = calculatedValue !== undefined && data.configuration.valueEvaluator.evaluate(calculatedValue);
                    const valueClassNames = ['mdhui-insight-matrix-value'].concat(valueIsGood ? 'mdhui-insight-matrix-value-good' : 'mdhui-insight-matrix-value-other');
                    return <div className={valueClassNames.join(' ')} key={index}>
                        {valueIsGood && props.goodValueIndicator &&
                            <div className="mdhui-insight-matrix-value-good-indicator">
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