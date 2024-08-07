import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import MarkdownIt from 'markdown-it';

import UnstyledButton from '../UnstyledButton';

import './Chat.css';

export type ChatMessageType = "sent" | "received";

export interface ChatProps {
    messages: ChatMessage[];
    onSendMessage: (newMessage: string) => void;
    loading?: string;
}

export interface ChatMessage {
    icon: React.JSX.Element;
    content: string;
    type: ChatMessageType;
}

export default function (props: ChatProps) {

    let md = new MarkdownIt();

    const [currentUserMessage, setCurrentUserMessage] = useState('');
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [props.messages]);

    const sendMessage = async function () {
        let newMessage = currentUserMessage;
        props.onSendMessage(newMessage);
        setCurrentUserMessage('');
    }

    return (
        <div className="mdhui-chat">
            <div className="mdhui-chat-log" ref={logRef}>
                {props.messages.map((message, index) => (
                    <div key={index} className={"mdhui-chat-message " + message.type}>
                        {message.icon}
                        <p>{md.renderInline(message.content)}</p>
                    </div>
                ))}
                {props.loading && <div className="message-loading">
                    <FontAwesomeSvgIcon icon={faSpinner} spin={true} />
                    <p>{props.loading}</p>
                </div>}
            </div>
            <div className="mdhui-chat-input">
                <input
                    type="text"
                    value={currentUserMessage}
                    onChange={(e) => setCurrentUserMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <UnstyledButton onClick={sendMessage}>
                    <FontAwesomeSvgIcon icon={faPaperPlane} />
                </UnstyledButton>
            </div>
        </div>
    );
}
