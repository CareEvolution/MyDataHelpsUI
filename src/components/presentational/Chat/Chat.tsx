import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faMicrophone, faPaperPlane, faSpinner, faStopCircle } from '@fortawesome/free-solid-svg-icons';
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
    onStartRecording: () => void;
    onStopRecording: () => void;
    isRecording: boolean;
    loading?: string;
    inputDisabled?: boolean;
    clientCanvasRef?: React.RefObject<HTMLCanvasElement>;
    serverCanvasRef?: React.RefObject<HTMLCanvasElement>;
}

export interface ChatMessage {
    icon?: React.JSX.Element;
    content: string;
    type: ChatMessageType;
    cssClass?: string;
    audioFileUrl?: string;
}

hljs.registerLanguage('javascript', javascript);

const md = new markdownIt({
    breaks: true
}).use(markdownItHighlightjs, { inline: true, hljs });

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
                                    {message.audioFileUrl && <audio src={message.audioFileUrl} controls />}
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
                                    {message.audioFileUrl && <audio src={message.audioFileUrl} controls />}
                                </div>
                            }
                        })}
                        {props.loading && <div className="mdhui-chat-message-loading">
                            <FontAwesomeSvgIcon icon={faSpinner} spin={true} />{props.loading}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="mdhui-chat-input">
                <div className="visualization">
                    <div className="visualization-entry client">
                        <canvas ref={props.clientCanvasRef} />
                    </div>
                    <div className="visualization-entry server">
                        <canvas ref={props.serverCanvasRef} />
                    </div>
                </div>
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
                    <UnstyledButton onClick={props.onStartRecording} disabled={props.isRecording}>
                        <FontAwesomeSvgIcon icon={faMicrophone} />
                    </UnstyledButton>
                    <UnstyledButton onClick={props.onStopRecording} disabled={!props.isRecording}>
                        <FontAwesomeSvgIcon icon={faStopCircle} />
                    </UnstyledButton>
                    <UnstyledButton onClick={sendMessage} className="mdhui-chat-send-button" disabled={props.inputDisabled || !currentUserMessage}>
                        <FontAwesomeSvgIcon icon={faPaperPlane} />
                    </UnstyledButton>
                </div>
            </div>
        </div>
    );
}
