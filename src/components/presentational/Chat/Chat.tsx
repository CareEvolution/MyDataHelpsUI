import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';

import UnstyledButton from '../UnstyledButton';

import './Chat.css';

export type ChatMessageType = "sent" | "received";

export interface ChatProps {
    messages: ChatMessage[];
    onSendMessage: (newMessage: string) => void;
    loading?: string;
}

export interface ChatMessage {
    icon?: React.JSX.Element;
    content: string;
    type: ChatMessageType;
}

const md = new MarkdownIt();

export default function (props: ChatProps) {

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
                {props.messages.map((message, index) => {
                    if (message.type === "sent") {
                        return <div key={index} className="mdhui-chat-message mdhui-chat-sent-message-row">
                            <div className="mdhui-chat-sent-message">
                                {parse(md.render(message.content))}
                            </div>
                        </div>
                    }
                    else {
                        return <div key={index} className="mdhui-chat-message mdhui-chat-received-message-row">
                            {message.icon}
                            <div className="mdhui-chat-received-message">{parse(md.render(message.content))}</div>
                        </div>
                    }
                })}
                {props.loading && <div className="mdhui-chat-message-loading">
                    <FontAwesomeSvgIcon icon={faSpinner} spin={true} />{props.loading}
                </div>}
            </div>
            <div className="mdhui-chat-input">
                <div className="mdhui-chat-input-group">
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
                    <UnstyledButton onClick={sendMessage} className="mdhui-chat-send-button">
                        <FontAwesomeSvgIcon icon={faPaperPlane} />
                    </UnstyledButton>
                </div>
            </div>
        </div>
    );
}
