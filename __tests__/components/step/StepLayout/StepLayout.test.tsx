/**
 * @jest-environment jsdom
 */
import React from 'react';
import StepLayout from '../../../../src/components/step/StepLayout/StepLayout';
import { act, render, cleanup } from '@testing-library/react';

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: { setStatusBarStyle: jest.fn(), on: jest.fn(), off: jest.fn() }
}));
// StepLayout imports Layout through the presentational barrel, which drags the entire
// component tree (svg imports, langchain) into jest. Mock the barrel down to the one real
// export the component uses, so the scheme behavior under test stays genuine.
jest.mock('../../../../src/components/presentational', () => ({
    Layout: jest.requireActual('../../../../src/components/presentational/Layout/Layout').default
}));

describe('StepLayout color scheme', () => {
    // Emotion runs in speedy mode here, so injected CSS lives in CSSOM rules rather than
    // the style tags' text; the scheme is observable through which token set got emitted.
    const globalCss = () =>
        Array.from(document.querySelectorAll('style'))
            .flatMap(s => s.sheet ? Array.from(s.sheet.cssRules).map(r => r.cssText) : [])
            .join('\n');
    const DARK_CARD = 'var(--mdh-grey-85)';

    const setSearch = (search: string) => {
        window.history.replaceState(null, '', search ? `/?${search}` : '/');
    };

    afterEach(() => {
        cleanup();
        document.querySelectorAll('style').forEach(s => s.remove());
        setSearch('');
    });

    it('reads ?colorScheme=dark from the frame URL', async () => {
        setSearch('colorScheme=dark');
        await act(async () => { render(<StepLayout />); });
        expect(globalCss()).toContain(DARK_CARD);
    });

    it('ignores an unrecognized param value and stays light', async () => {
        setSearch('colorScheme=purple');
        await act(async () => { render(<StepLayout />); });
        expect(globalCss()).not.toContain(DARK_CARD);
    });

    it('follows a mid-step RKStudioColorScheme message', async () => {
        setSearch('colorScheme=light');
        await act(async () => { render(<StepLayout />); });
        expect(globalCss()).not.toContain(DARK_CARD);
        await act(async () => {
            window.dispatchEvent(new MessageEvent('message', { data: { name: 'RKStudioColorScheme', colorScheme: 'dark' }, source: window }));
        });
        expect(globalCss()).toContain(DARK_CARD);
    });

    it('follows a mid-step flip back to light without stacking dark rules', async () => {
        setSearch('colorScheme=dark');
        await act(async () => { render(<StepLayout />); });
        expect(globalCss()).toContain(DARK_CARD);
        await act(async () => {
            window.dispatchEvent(new MessageEvent('message', { data: { name: 'RKStudioColorScheme', colorScheme: 'light' }, source: window }));
        });
        // the dark rules must be REPLACED, not merely out-cascaded — stacking would leave them present
        expect(globalCss()).not.toContain(DARK_CARD);
    });

    it('stays light with no param, even on a dark device', async () => {
        // Nothing in the component reads the device today; the dark matchMedia stub pins
        // that no future change may — only the host's explicit ?colorScheme= darkens a step.
        (window as any).matchMedia = (query: string) => ({
            matches: /prefers-color-scheme:\s*dark/.test(query),
            media: query, onchange: null,
            addEventListener() { }, removeEventListener() { },
            addListener() { }, removeListener() { }, dispatchEvent() { return false; }
        });
        try {
            setSearch('');
            await act(async () => { render(<StepLayout />); });
            expect(globalCss()).not.toContain(DARK_CARD);
        } finally {
            delete (window as any).matchMedia;
        }
    });

    it('ignores a valid message from a sender that is not the embedding page', async () => {
        setSearch('colorScheme=light');
        await act(async () => { render(<StepLayout />); });
        await act(async () => {
            // source: null stands in for any window that is neither the parent nor the page itself
            window.dispatchEvent(new MessageEvent('message', { data: { name: 'RKStudioColorScheme', colorScheme: 'dark' }, source: null }));
        });
        expect(globalCss()).not.toContain(DARK_CARD);
    });

    it('ignores unrelated messages', async () => {
        setSearch('colorScheme=light');
        await act(async () => { render(<StepLayout />); });
        await act(async () => {
            window.dispatchEvent(new MessageEvent('message', { data: { name: 'SomethingElse', colorScheme: 'dark' }, source: window }));
            window.dispatchEvent(new MessageEvent('message', { data: { name: 'RKStudioColorScheme', colorScheme: 'weird' }, source: window }));
        });
        expect(globalCss()).not.toContain(DARK_CARD);
    });
});
