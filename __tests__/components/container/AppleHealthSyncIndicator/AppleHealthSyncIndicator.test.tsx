/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, render } from '@testing-library/react';
import MyDataHelps from '@careevolution/mydatahelps-js';
import AppleHealthSyncIndicator from '../../../../src/components/container/AppleHealthSyncIndicator/AppleHealthSyncIndicator';

// The helpers barrel pulls in langchain, which needs TextEncoder (absent from jsdom).
jest.mock('../../../../src/helpers/AIAssistant', () => ({}));
jest.mock('../../../../src/assets/applehealth-logo.svg', () => 'applehealth-logo.svg');

const eventHandlers: Record<string, Function[]> = {};

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: {
        getCurrentLanguage: jest.fn(() => 'en'),
        getDeviceInfo: jest.fn(),
        getAppleHealthStatus: jest.fn(),
        on: jest.fn((name: string, handler: Function) => {
            (eventHandlers[name] ??= []).push(handler);
        }),
        off: jest.fn((name: string, handler: Function) => {
            eventHandlers[name] = (eventHandlers[name] ?? []).filter(h => h !== handler);
        })
    }
}));

const getDeviceInfoMock = MyDataHelps.getDeviceInfo as jest.Mock;
const getAppleHealthStatusMock = MyDataHelps.getAppleHealthStatus as jest.Mock;

const syncingStatus = { available: true, enabled: true, syncSession: { syncStartDate: '2026-10-23T12:00:00Z' } };
const idleStatus = { available: true, enabled: true, lastSyncCompletionDate: '2026-10-23T12:05:00Z' };

async function advance(ms: number) {
    await act(async () => {
        await jest.advanceTimersByTimeAsync(ms);
    });
}

function trigger(eventName: string) {
    act(() => {
        (eventHandlers[eventName] ?? []).forEach(handler => handler({ type: eventName }));
    });
}

describe('AppleHealthSyncIndicator', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
        Object.keys(eventHandlers).forEach(key => delete eventHandlers[key]);
        getDeviceInfoMock.mockResolvedValue({ platform: 'iOS' });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('shows the syncing preview state', async () => {
        const { container } = render(<AppleHealthSyncIndicator previewState="syncing" />);
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator')).not.toBeNull();
        expect(container.textContent).toContain('Syncing Apple Health data…');
        expect(getAppleHealthStatusMock).not.toHaveBeenCalled();
    });

    it('hides the message when hideMessage is set', async () => {
        const { container } = render(<AppleHealthSyncIndicator previewState="syncing" hideMessage />);
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator')).not.toBeNull();
        expect(container.querySelector('.mdhui-apple-health-sync-indicator-message')).toBeNull();
        expect(container.querySelector('.mdhui-apple-health-sync-indicator-message-hidden')?.textContent).toContain('Syncing Apple Health data…');
        expect(container.querySelector('.mdhui-apple-health-sync-indicator-name')?.textContent).toBe('Apple Health');
    });

    it('renders nothing in the not syncing preview state', async () => {
        const { container } = render(<AppleHealthSyncIndicator previewState="notSyncing" />);
        await advance(600);
        expect(container.firstChild).toBeNull();
    });

    it('shows while a sync session is in progress and hides when it completes', async () => {
        getAppleHealthStatusMock.mockResolvedValue(syncingStatus);
        const { container } = render(<AppleHealthSyncIndicator />);
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator')).not.toBeNull();

        getAppleHealthStatusMock.mockResolvedValue(idleStatus);
        trigger('appleHealthSyncComplete');
        await advance(600);
        expect(container.firstChild).toBeNull();
    });

    it('appears when a sync starts', async () => {
        getAppleHealthStatusMock.mockResolvedValue(idleStatus);
        const { container } = render(<AppleHealthSyncIndicator />);
        await advance(600);
        expect(container.firstChild).toBeNull();

        getAppleHealthStatusMock.mockResolvedValue(syncingStatus);
        trigger('appleHealthSyncResume');
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator')).not.toBeNull();
    });

    it('re-checks status while syncing in case no completion event arrives', async () => {
        getAppleHealthStatusMock.mockResolvedValue(syncingStatus);
        const { container } = render(<AppleHealthSyncIndicator />);
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator')).not.toBeNull();

        getAppleHealthStatusMock.mockResolvedValue(idleStatus);
        await advance(10000);
        expect(container.firstChild).toBeNull();
    });

    it('stays hidden after a sync completes without alwaysDisplay', async () => {
        getAppleHealthStatusMock.mockResolvedValue(syncingStatus);
        const { container } = render(<AppleHealthSyncIndicator />);
        await advance(600);

        getAppleHealthStatusMock.mockResolvedValue(idleStatus);
        trigger('appleHealthSyncComplete');
        await advance(600);
        expect(container.firstChild).toBeNull();
    });

    it('shows the last full sync time when idle with alwaysDisplay', async () => {
        getAppleHealthStatusMock.mockResolvedValue(idleStatus);
        const { container } = render(<AppleHealthSyncIndicator alwaysDisplay />);
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator-complete')).not.toBeNull();
        expect(container.textContent).toContain('Last full Apple Health sync:');
        expect(container.textContent).not.toContain('Apple Health sync complete');
    });

    it('shows sync complete briefly after a first full sync with alwaysDisplay, then the last full sync time', async () => {
        getAppleHealthStatusMock.mockResolvedValue(syncingStatus);
        const { container } = render(<AppleHealthSyncIndicator alwaysDisplay />);
        await advance(600);
        expect(container.textContent).toContain('Syncing Apple Health data…');

        getAppleHealthStatusMock.mockResolvedValue(idleStatus);
        trigger('appleHealthSyncComplete');
        await advance(600);
        expect(container.textContent).toContain('Apple Health sync complete');

        await advance(5000);
        expect(container.textContent).toContain('Last full Apple Health sync:');
    });

    it('shows sync complete when a session advances the last full sync date with alwaysDisplay', async () => {
        getAppleHealthStatusMock.mockResolvedValue({ ...syncingStatus, lastSyncCompletionDate: '2026-10-22T08:00:00Z' });
        const { container } = render(<AppleHealthSyncIndicator alwaysDisplay />);
        await advance(600);

        getAppleHealthStatusMock.mockResolvedValue(idleStatus);
        trigger('appleHealthSyncComplete');
        await advance(600);
        expect(container.textContent).toContain('Apple Health sync complete');
    });

    it('skips sync complete when a session ends without a new full sync with alwaysDisplay', async () => {
        getAppleHealthStatusMock.mockResolvedValue({ ...syncingStatus, lastSyncCompletionDate: '2026-10-22T08:00:00Z' });
        const { container } = render(<AppleHealthSyncIndicator alwaysDisplay />);
        await advance(600);
        expect(container.textContent).toContain('Syncing Apple Health data…');

        // Canceled or partial session: no completion event, and the last full sync date is unchanged.
        getAppleHealthStatusMock.mockResolvedValue({ available: true, enabled: true, lastSyncCompletionDate: '2026-10-22T08:00:00Z' });
        await advance(10000);
        expect(container.textContent).not.toContain('Apple Health sync complete');
        expect(container.textContent).toContain('Last full Apple Health sync:');
    });

    it('renders nothing with alwaysDisplay when a session ends before any full sync', async () => {
        getAppleHealthStatusMock.mockResolvedValue(syncingStatus);
        const { container } = render(<AppleHealthSyncIndicator alwaysDisplay />);
        await advance(600);

        getAppleHealthStatusMock.mockResolvedValue({ available: true, enabled: true });
        await advance(10000);
        expect(container.firstChild).toBeNull();
    });

    it('renders nothing with alwaysDisplay when there has never been a completed sync', async () => {
        getAppleHealthStatusMock.mockResolvedValue({ available: true, enabled: true });
        const { container } = render(<AppleHealthSyncIndicator alwaysDisplay />);
        await advance(600);
        expect(container.firstChild).toBeNull();
    });

    it('renders nothing with alwaysDisplay when Apple Health sync is not enabled', async () => {
        getAppleHealthStatusMock.mockResolvedValue({ available: true, enabled: false, lastSyncCompletionDate: '2026-10-23T12:05:00Z' });
        const { container } = render(<AppleHealthSyncIndicator alwaysDisplay />);
        await advance(600);
        expect(container.firstChild).toBeNull();
    });

    it('shows the sync complete preview state with alwaysDisplay', async () => {
        const { container } = render(<AppleHealthSyncIndicator previewState="syncComplete" alwaysDisplay />);
        await advance(600);
        expect(container.textContent).toContain('Apple Health sync complete');
    });

    it('uses custom labels in place of the defaults', async () => {
        const labels = { syncingText: 'Custom syncing', syncCompleteText: 'Custom complete', lastFullSyncText: 'Custom last sync' };

        const syncing = render(<AppleHealthSyncIndicator previewState="syncing" {...labels} />);
        await advance(600);
        expect(syncing.container.textContent).toContain('Custom syncing');
        expect(syncing.container.textContent).not.toContain('Syncing Apple Health data…');
        syncing.unmount();

        const complete = render(<AppleHealthSyncIndicator previewState="syncComplete" alwaysDisplay {...labels} />);
        await advance(600);
        expect(complete.container.textContent).toContain('Custom complete');
        expect(complete.container.textContent).not.toContain('Apple Health sync complete');
        complete.unmount();

        const idle = render(<AppleHealthSyncIndicator previewState="notSyncing" alwaysDisplay {...labels} />);
        await advance(600);
        expect(idle.container.textContent).toContain('Custom last sync');
        expect(idle.container.textContent).not.toContain('Last full Apple Health sync:');
    });

    it('falls back to the default labels when custom labels are blank', async () => {
        const { container } = render(<AppleHealthSyncIndicator previewState="syncing" syncingText="   " />);
        await advance(600);
        expect(container.textContent).toContain('Syncing Apple Health data…');
    });

    it('trims custom labels', async () => {
        const { container } = render(<AppleHealthSyncIndicator previewState="syncing" hideMessage syncingText="  Custom syncing  " />);
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator-message-hidden')?.textContent).toBe('Custom syncing');
    });

    it('keeps the Apple Health name visible with a custom label and hideMessage', async () => {
        const { container } = render(<AppleHealthSyncIndicator previewState="syncing" hideMessage syncingText="Custom syncing" />);
        await advance(600);
        expect(container.querySelector('.mdhui-apple-health-sync-indicator-name')?.textContent).toBe('Apple Health');
        expect(container.querySelector('.mdhui-apple-health-sync-indicator-message-hidden')?.textContent).toBe('Custom syncing');
    });

    it('renders nothing when Apple Health sync is not enabled', async () => {
        getAppleHealthStatusMock.mockResolvedValue({ available: true, enabled: false, syncSession: { syncStartDate: '2026-10-23T12:00:00Z' } });
        const { container } = render(<AppleHealthSyncIndicator />);
        await advance(600);
        expect(container.firstChild).toBeNull();
    });

    it('does not query Apple Health status off iOS', async () => {
        getDeviceInfoMock.mockResolvedValue({ platform: 'Android' });
        const { container } = render(<AppleHealthSyncIndicator />);
        await advance(600);
        expect(container.firstChild).toBeNull();
        expect(getAppleHealthStatusMock).not.toHaveBeenCalled();
    });

    it('renders nothing when the app does not support the status call', async () => {
        getAppleHealthStatusMock.mockRejectedValue(undefined);
        const { container } = render(<AppleHealthSyncIndicator />);
        await advance(600);
        expect(container.firstChild).toBeNull();
    });
});
