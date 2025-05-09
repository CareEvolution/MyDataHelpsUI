import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import markdownIt from 'markdown-it';
// @ts-ignore
import markdownItHighlightjs from 'markdown-it-highlightjs/core';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import parse from 'html-react-parser';

import UnstyledButton from '../UnstyledButton';

import 'highlight.js/styles/atom-one-dark.css';
import './Chat.css';

export type ChatMessageType = "sent" | "received" | "received-image";

export interface ChatProps {
    innerRef?: React.Ref<HTMLDivElement>;
    messages: ChatMessage[];
    onSendMessage: (newMessage: string) => void;
    loading?: string;
    inputDisabled?: boolean;
    suggestions?: string[];
    onSuggestionSelected?: (suggestion: string) => void;
}

export interface ChatMessage {
    icon?: React.JSX.Element;
    content: string;
    type: ChatMessageType;
    cssClass?: string;
}

hljs.registerLanguage('javascript', javascript);

const md = new markdownIt({
    breaks: true
}).use(markdownItHighlightjs, { inline: true, hljs });

/**
 * Presentational component that can be used to display a conversation between two users, one of which could be an AI Assistant.
 */
export default function Chat(props: ChatProps) {

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
        <div className="mdhui-chat" ref={props.innerRef}>
            <div className="mdhui-chat-log">
                <div className="mdhui-chat-messages-scroll-wrapper" ref={logRef}>
                    <div className="mdhui-chat-messages">
                        {props.messages.map((message, index) => {
                            if (message.type === "sent") {
                                return <div key={index} className="mdhui-chat-message mdhui-chat-sent-message-row">
                                    <div className="mdhui-chat-sent-message">
                                        {parse(md.render(message.content))}
                                    </div>
                                </div>
                            }
                            else if (message.type === "received-image") {
                                return <div key={index} className="mdhui-chat-message mdhui-chat-received-message-row">
                                    <img src={message.content} className={message.cssClass} />
                                </div>
                            }
                            else {
                                return <div key={index} className="mdhui-chat-message mdhui-chat-received-message-row">
                                    {message.icon}
                                    <div className={"mdhui-chat-received-message" + (message.cssClass ? (" " + message.cssClass) : "")}>{parse(md.render(message.content))}</div>
                                </div>
                            }
                        })}
                        {props.loading && <div className="mdhui-chat-message-loading">
                            <FontAwesomeSvgIcon icon={faSpinner} spin={true} />{props.loading}
                        </div>}
                    </div>
                </div>
            </div>
            {props.suggestions && props.onSuggestionSelected && (
                <div className="mdhui-chat-suggestions">
                    {props.suggestions.map((suggestion) => (
                        <div key={suggestion} className="mdhui-chat-suggestion" onClick={() => props.onSuggestionSelected?.(suggestion)}>{suggestion}</div>
                    ))}
                </div>
            )}
            <div className="mdhui-chat-input">
                <div className="mdhui-chat-input-group">
                    <input
                        type="text"
                        value={currentUserMessage}
                        onChange={(e) => setCurrentUserMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (props.inputDisabled || !currentUserMessage) return;

                            if (e.key === 'Enter') {
                                sendMessage();
                            }
                        }}
                    />
                    <UnstyledButton onClick={sendMessage} className="mdhui-chat-send-button" disabled={props.inputDisabled || !currentUserMessage}>
                        <FontAwesomeSvgIcon icon={faPaperPlane} />
                    </UnstyledButton>
                </div>
            </div>
        </div>
    );
}
