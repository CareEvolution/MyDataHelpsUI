import React, { CSSProperties, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js';

export interface PdfPreviewProps {
    url: string | undefined;
    maxHeight: number;
    maxWidth: number;
    style?: CSSProperties
    onLoad?: () => void;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * This component can be used to render a preview of the first page of a PDF.
 */
export default function PdfPreview(props: PdfPreviewProps) {
    const [pageHeight, setPageHeight] = useState<number>();
    const [pageWidth, setPageWidth] = useState<number>();

    if (!props.url) return null;

    const heightScale = pageHeight ? Math.min(props.maxHeight / pageHeight, 1) : 1;
    const widthScale = pageWidth ? Math.min(props.maxWidth / pageWidth, 1) : 1;

    const scale = Math.min(heightScale, widthScale);

    return <div style={props.style} ref={props.innerRef}>
        <Document file={props.url}>
            <Page
                pageNumber={1}
                scale={scale}
                onLoadSuccess={page => {
                    if (!pageHeight) {
                        setPageHeight(page.height);
                        setPageWidth(page.width);
                    } else {
                        props.onLoad?.();
                    }
                }}
                renderTextLayer={false}
                renderAnnotationLayer={false}
            />
        </Document>
    </div>;
}