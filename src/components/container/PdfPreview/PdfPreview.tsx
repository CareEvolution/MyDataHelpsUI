import React, { CSSProperties, useState, useEffect } from 'react';
import './PdfPreview.css';

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
    const [reactPdf, setReactPdf] = useState<any>();

    if (!props.url) return null;

    const heightScale = pageHeight ? Math.min(props.maxHeight / pageHeight, 1) : 1;
    const widthScale = pageWidth ? Math.min(props.maxWidth / pageWidth, 1) : 1;

    const scale = Math.min(heightScale, widthScale);

    useEffect(() => {
        const loadPdfPreview = async function () {
        // Dynamic imports to keep bundle size down.
        const reactPdfImport = await import("react-pdf");
        reactPdfImport.pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js';
        setReactPdf(reactPdfImport);
        }    
        loadPdfPreview();
    }, []);
   
    if (!reactPdf) {
        return <p>Loading!</p>;
    }

    return <div className="mdhui-pdf-preview" style={props.style} ref={props.innerRef}>
        <reactPdf.Document file={props.url}>
            <reactPdf.Page
                pageNumber={1}
                scale={scale}
                onLoadSuccess={(page : any) => {
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
        </reactPdf.Document>
    </div>;
}