import React, { createContext, useState } from 'react';

export interface InboxItemListCoordinatorProps {
    children: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export type InboxItemListChangeListener = () => void;

export interface InboxItemListCoordinatorContext {
    registerChangeListener: (changeListener: InboxItemListChangeListener) => void;
    notifyChangeListeners: () => void;
}

export const InboxItemListCoordinatorContext = createContext<InboxItemListCoordinatorContext | null>(null);

export default function (props: InboxItemListCoordinatorProps) {
    const changeListeners: InboxItemListChangeListener[] = [];

    const context: InboxItemListCoordinatorContext = {
        registerChangeListener: (changeListener) => {
            changeListeners.push(changeListener);
        },
        notifyChangeListeners: () => {
            changeListeners.forEach(changeListener => changeListener());
        }
    };

    const [currentContext, setCurrentContext] = useState<InboxItemListCoordinatorContext>(context);

    return <div ref={props.innerRef}>
        <InboxItemListCoordinatorContext.Provider value={currentContext}>
            {props.children}
        </InboxItemListCoordinatorContext.Provider>
    </div>;
}