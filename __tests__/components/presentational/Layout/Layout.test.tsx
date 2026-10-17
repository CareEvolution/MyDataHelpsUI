/**
 * @jest-environment jsdom
 */
import React from 'react';
import Layout from '../../../../src/components/presentational/Layout/Layout';
import { act, render, cleanup } from '@testing-library/react';

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: { setStatusBarStyle: jest.fn(), on: jest.fn(), off: jest.fn() }
}));

describe('Layout brand color tokens', () => {
    // Emotion runs in speedy mode here, so injected CSS lives in CSSOM rules rather than
    // the style tags' text. Reading the rules back is the observable behavior — which
    // tokens the brand drives per scheme.
    const globalCss = () =>
        Array.from(document.querySelectorAll('style'))
            .flatMap(s => s.sheet ? Array.from(s.sheet.cssRules).map(r => r.cssText) : [])
            .join('\n');

    const renderLayout = async (element: React.ReactElement) => act(async () => { render(element); });

    afterEach(() => {
        cleanup();
        document.querySelectorAll('style').forEach(s => s.remove());
    });

    it('drives fill and foreground in light', async () => {
        await renderLayout(<Layout colorScheme="light" primaryColor="#00693E" />);
        expect(globalCss()).toContain('--mdhui-color-primary: #00693E');
        expect(globalCss()).toContain('--mdhui-color-primary-text: #00693E');
    });

    it('drives fill and foreground in dark for a plain-string brand', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor="#00693E" />);
        expect(globalCss()).toContain('--mdhui-color-primary: #00693E');
        expect(globalCss()).toContain('--mdhui-color-primary-text: #00693E');
    });

    it('uses the dark value for both tokens in dark', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor={{ lightMode: '#00693E', darkMode: '#00B068' }} />);
        expect(globalCss()).toContain('--mdhui-color-primary: #00B068');
        expect(globalCss()).toContain('--mdhui-color-primary-text: #00B068');
        expect(globalCss()).not.toContain('#00693E');
    });

    it('falls back to the light value in dark when no dark value is given', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor={{ lightMode: '#00693E' }} />);
        expect(globalCss()).toContain('--mdhui-color-primary: #00693E');
        expect(globalCss()).toContain('--mdhui-color-primary-text: #00693E');
    });

    it('leaves marks to follow text', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor={{ lightMode: '#00693E', darkMode: '#00B068' }} />);
        expect(globalCss()).not.toContain('--mdhui-color-primary-mark: #00B068');
    });

    it('uses primaryTextColor for text and keeps the brand on fills', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor="#C2185B" primaryTextColor={{ lightMode: '#C2185B', darkMode: '#F48FB1' }} />);
        expect(globalCss()).toContain('--mdhui-color-primary: #C2185B');
        expect(globalCss()).toContain('--mdhui-color-primary-text: #F48FB1');
        expect(globalCss()).toContain('--mdhui-color-primary-mark: #C2185B');
    });

    it('uses primaryTextColor without a brand and leaves marks on the scheme default', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryTextColor="#00693E" />);
        expect(globalCss()).toContain('--mdhui-color-primary-text: #00693E');
        expect(globalCss()).not.toContain('--mdhui-color-primary: #00693E');
        expect(globalCss()).toContain('--mdhui-color-primary-mark: var(--mdh-blue-30)');
    });

    it('falls back to the brand for text in dark when the text color has no dark value', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor="#E91E63" primaryTextColor={{ lightMode: '#C2185B' }} />);
        expect(globalCss()).toContain('--mdhui-color-primary-text: #E91E63');
        expect(globalCss()).not.toContain('#C2185B');
    });

    it('falls back to the brand for text in light when the text color has no light value', async () => {
        await renderLayout(<Layout colorScheme="light" primaryColor="#E91E63" primaryTextColor={{ darkMode: '#F48FB1' }} />);
        expect(globalCss()).toContain('--mdhui-color-primary-text: #E91E63');
        expect(globalCss()).not.toContain('#F48FB1');
    });

    it('does not pin marks when text falls back to the brand', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor="#E91E63" primaryTextColor={{ lightMode: '#C2185B' }} />);
        expect(globalCss()).toContain('--mdhui-color-primary-mark: var(--mdhui-color-primary-text)');
        expect(globalCss()).not.toContain('--mdhui-color-primary-mark: #');
    });

    it('falls back to the brand for an invalid or null text color', async () => {
        await renderLayout(<Layout colorScheme="dark" primaryColor="#E91E63" primaryTextColor={'not-a-color'} />);
        expect(globalCss()).toContain('--mdhui-color-primary-text: #E91E63');
        cleanup();
        document.querySelectorAll('style').forEach(s => s.remove());
        await renderLayout(<Layout colorScheme="dark" primaryColor="#E91E63" primaryTextColor={null as any} />);
        expect(globalCss()).toContain('--mdhui-color-primary-text: #E91E63');
    });

    it('leaves marks on the light default when a text color is set without a brand', async () => {
        await renderLayout(<Layout colorScheme="light" primaryTextColor="#00693E" />);
        expect(globalCss()).toContain('--mdhui-color-primary-text: #00693E');
        expect(globalCss()).toContain('--mdhui-color-primary-mark: var(--mdhui-color-primary)');
    });

    it('applies a plain-string text color in light and keeps marks on the brand', async () => {
        await renderLayout(<Layout colorScheme="light" primaryColor="#E91E63" primaryTextColor="#C2185B" />);
        expect(globalCss()).toContain('--mdhui-color-primary: #E91E63');
        expect(globalCss()).toContain('--mdhui-color-primary-text: #C2185B');
        expect(globalCss()).toContain('--mdhui-color-primary-mark: #E91E63');
    });
});
