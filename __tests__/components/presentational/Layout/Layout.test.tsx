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
});
