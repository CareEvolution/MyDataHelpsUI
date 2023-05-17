import MyDataHelps from '@careevolution/mydatahelps-js';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react'
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { Action, LoadingIndicator, UnstyledButton } from '../../presentational';
import { TermInformation } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import "./HealthElementList.css"

export interface HealthElement {
    DisplayName: string
    TermInformation?: TermInformation
}

export interface HealthElementListProps {
    type: "Medications" | "Conditions" | "Allergies"
    previewState?: "default"
}

export default function (props: HealthElementListProps) {
    const [elements, setElements] = useState<HealthElement[] | null>(null);

    function load() {
        if (props.previewState == "default") {
            setElements([
                {
                    DisplayName: "Asthma",
                    TermInformation: {
                        TermCode: "195967001",
                        TermNamespace: "SNOMED",
                        TermFamily: "Problem"
                    }
                },
                {
                    DisplayName: "Diabetes"
                }
            ]);
            return;
        }

        MyDataHelps.invokeCustomApi("HealthAndWellnessApi.Conditions", "GET", "", true).then(function (response) {
            setElements(response);
        });;
    }

    useEffect(() => {
        load();
        MyDataHelps.on("externalAccountSyncComplete", load);
        MyDataHelps.on("applicationDidBecomeVisible", load);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", load);
            MyDataHelps.off("applicationDidBecomeVisible", load);
        }
    }, []);

    return <div className="mdhui-health-element-list">
        {!elements && <LoadingIndicator />}
        {!!elements && elements.map((element, index) =>
            <div className="mdhui-health-element">
                <div className="mdhui-health-element-title">
                    {element.DisplayName}
                </div>
                {element.TermInformation &&
                    <UnstyledButton className='mdhui-health-element-info' onClick={() => { }}>
                        <FontAwesomeSvgIcon icon={faInfoCircle} />
                    </UnstyledButton>
                }
            </div>
        )}
    </div>
}