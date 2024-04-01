import React, { useState } from 'react'
import MyDataHelps from "@careevolution/mydatahelps-js"
import { LoadingIndicator, TextBlock, Title, Card } from '../../presentational'
import { TermInformationReference } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline'
import termInformationPreviewData from './TermInformation.previewData'
import { useInitializeView } from '../../../helpers/Initialization'
import language from '../../../helpers/language'
import parse from 'html-react-parser'
import "./TermInformation.css"

export interface TermInformationProps {
    previewState?: "default" | "noData"
    term?: TermInformationReference
    labObservationID?: string
    openLinksInNewWindow?: boolean
}

export interface TermInformationResult {
    Title: string;
    Link: string;
    Summary: string;
}

export default function (props: TermInformationProps) {
    const [loading, setLoading] = useState(true);
    const [termInformation, setTermInformation] = useState<TermInformationResult[] | null>(null);

    function initialize() {
        if (props.previewState == "default") {
            setTermInformation(termInformationPreviewData);
            setLoading(false);
            return;
        }

        if (props.previewState == "noData") {
            setTermInformation([]);
            setLoading(false);
            return;
        }

        let queryString: string = "";
        if (props.labObservationID) {
            queryString = new URLSearchParams({ LabObservationID: props.labObservationID }).toString();
        } else if (props.term) {
            queryString = new URLSearchParams(props.term as any).toString();
        }
        var endpoint = 'HealthAndWellnessApi.TermInformation';
        return MyDataHelps.invokeCustomApi(endpoint, 'GET', queryString, true)
            .then(function (response) {
                setTermInformation(response);
                setLoading(false);
            });
    }

    useInitializeView(initialize, [], [props.labObservationID, props.term]);

    function elementsForHtml(htmlContent: string) {
        let elements = parse(htmlContent, {
            replace: domNode => {
                let untypedNode = domNode as any;
                // ensure links open in new window
                if (untypedNode.name === "a") {
                    let clickLink = function (e: React.MouseEvent<HTMLAnchorElement>) {
                        if (props.openLinksInNewWindow) {
                            return;
                        }
                        MyDataHelps.openEmbeddedUrl(untypedNode.attribs.href);
                        e.preventDefault();
                    }
                    return <a href={untypedNode.attribs.href} target="_blank" onClick={(e) => clickLink(e)}>{untypedNode.children[0].data}</a>
                }
                return untypedNode;
            }
        });
        return elements;
    }

    if (loading) return <LoadingIndicator />

    return <div className="mdhui-term-information">
        {termInformation?.length == 0 &&
            <>
                <Title order={4} defaultMargin>
                    {language("term-information-not-found-header")}
                </Title >
                <TextBlock>
                    {language("term-information-not-found-body")}
                </TextBlock >
            </>
        }
        {termInformation && termInformation?.length > 0 &&
            <TextBlock className='mdhui-term-information-disclaimer'>
                <div dangerouslySetInnerHTML={{ __html: language("term-information-disclaimer") }} />
            </TextBlock>
        }
        {termInformation?.map((term, index) =>
            <Card key={index}>
                <Title order={3} defaultMargin>
                    {term.Title}
                </Title>
                <TextBlock className="mdhui-term-information-html">
                    {elementsForHtml(term.Summary)}
                </TextBlock>
                <TextBlock>
                    <a href={term.Link} target="_blank">{language("term-information-view-on-medline")}</a>
                </TextBlock>
            </Card>
        )}
    </div>;
}