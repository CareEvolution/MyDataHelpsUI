/**
 * @jest-environment jsdom
 */
import React, { ReactNode } from 'react';
import ReportContent from '../../../../src/components/presentational/ReportContent/ReportContent';
import { act, render } from '@testing-library/react';
import { randomUUID } from 'crypto';

jest.mock('../../../../src/components/container', () => ({
    EhrDownloadButton: () => null,
    PdfPreview: () => null
}));

describe('ReportContent Component Tests', () => {
    const defaultReportContentProps = { reportId: randomUUID(), type: 'Any Type', contentType: 'text/html' };

    const getContainer = async (component: ReactNode): Promise<HTMLElement | undefined> => {
        let container: HTMLElement | undefined = undefined;
        await act(async () => ({ container } = render(component)));
        return container;
    };

    describe('HTML Sanitization', () => {
        const getIFrame = async (component: ReactNode): Promise<HTMLIFrameElement | undefined> => {
            const container = await getContainer(component);
            return container?.querySelector('iframe') as HTMLIFrameElement;
        };

        const getSrcDoc = async (html: string): Promise<string> => {
            const iframe = await getIFrame(<ReportContent {...defaultReportContentProps} content={html} />);
            return iframe?.srcdoc ?? '';
        };

        it('Should remove script tags.', async () => {
            const srcDoc = await getSrcDoc('<p>Safe content</p><script>alert("xss")</script>');
            expect(srcDoc).toBe('<html><head></head><body><p>Safe content</p></body></html>');
        });

        it('Should remove inline event handler attributes.', async () => {
            const srcDoc = await getSrcDoc('<img src="some.png" alt="some image" onclick=alert(\'xss\') />');
            expect(srcDoc).toBe('<html><head></head><body><img src="some.png" alt="some image"></body></html>');
        });

        it('Should strip the javascript: protocol from anchor href attributes.', async () => {
            const srcDoc = await getSrcDoc('<a href="javascript:alert(\'xss\')">Unsafe Link</a><a href="https://good.com">Safe Link</a>');
            expect(srcDoc).toBe('<html><head></head><body><a>Unsafe Link</a><a href="https://good.com">Safe Link</a></body></html>');
        });

        it('Should remove external stylesheet link tags.', async () => {
            const srcDoc = await getSrcDoc('<head><link rel="stylesheet" href="https://evil.com/evil.css" /></head><p>Content</p>');
            expect(srcDoc).toBe('<html><head></head><body><p>Content</p></body></html>');
        });

        it('Should remove object tags used to embed external content.', async () => {
            const srcDoc = await getSrcDoc('<p>Text</p><object data="https://evil.com/evil.swf" type="application/x-shockwave-flash"></object>');
            expect(srcDoc).toBe('<html><head></head><body><p>Text</p></body></html>');
        });

        it('Should remove script tags embedded inside SVG elements.', async () => {
            const srcDoc = await getSrcDoc('<svg xmlns="http://www.w3.org/2000/svg"><script>alert("xss")</script><circle r="10"/></svg>');
            expect(srcDoc).toBe('<html><head></head><body><svg xmlns="http://www.w3.org/2000/svg"><circle r="10"></circle></svg></body></html>');
        });
    });

    describe('Other', () => {
        it('Should not render an iframe when contentType is not text/html.', async () => {
            const container = await getContainer(<ReportContent {...defaultReportContentProps} contentType="application/pdf" content="JVBERi0xLjQ=" />);
            expect(container?.querySelector('iframe')).toBeNull();
        });
    });
});
