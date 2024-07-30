import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faFlask } from '@fortawesome/free-solid-svg-icons/faFlask';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import Markdown from 'react-markdown';
import { MyDataHelpsAssistant } from '../../../helpers/assistant/assistant';

import '@fortawesome/fontawesome-svg-core/styles.css';
import "./MyDataHelpsAssistant.css";

export interface MyDataHelpsAssistantProps {
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "default";
    debug: boolean;
    additionalInstructions?: string;
    tools?: StructuredTool[];
    appendTools?: boolean;
}

export interface MyDataHelpsAssistantMessage {
    type: string;
    content: string;
    runId?: string;
}

export default function (props: MyDataHelpsAssistantProps) {

    const [currentUserMessage, setCurrentUserMessage] = useState('');
    const [messages, setMessages] = useState<MyDataHelpsAssistantMessage[]>([]);
    const [loading, setLoading] = useState("");
    const [collapsed, setCollapsed] = useState(true);

    const assistantRef = useRef<MyDataHelpsAssistant>();
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (assistantRef.current === undefined) {
            assistantRef.current = new MyDataHelpsAssistant(props.additionalInstructions, props.tools, props.appendTools);
        }
    }, []);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [messages]);

    const addUserMessage = async function () {

        let newMessage = currentUserMessage;
        setMessages(prevMessages => [...prevMessages, { type: 'user', content: newMessage }]);

        setCurrentUserMessage('');

        await assistantRef.current?.ask(newMessage, function (streamEvent: StreamEvent) {

            const [kind, type] = streamEvent.event.split("_").slice(1);

            if (type === "stream" && kind !== "chain") {
                const chunk = streamEvent.data?.chunk;
                let msg = chunk.message as AIMessageChunk;

                if (msg.content && typeof msg.content === "string") {
                    addMessageChunk(streamEvent.run_id, msg.content);
                }
                else if (props.debug && msg.tool_call_chunks && msg.tool_call_chunks.length > 0) {
                    if (msg.tool_call_chunks[0].args) {
                        addMessageChunk(streamEvent.run_id, msg.tool_call_chunks[0].args);
                    }
                    else if (msg.tool_call_chunks[0].name) {
                        addMessageChunk(streamEvent.run_id, msg.tool_call_chunks[0].name + " ");
                    }
                }
            }

            if (kind === "tool") {
                if (type === "start") {
                    setLoading(`Querying your data...`);
                }
                else if (type === "end") {
                    setLoading("");
                }
            }
        });
    }

    const addMessageChunk = function (runId: string, message: string) {
        setMessages(prevMessages => {
            let existingMessage = prevMessages.find((msg) => msg.runId === runId);
            if (existingMessage) {
                const updatedMessage = { ...existingMessage, content: existingMessage.content + message };
                return prevMessages.map(msg => msg.runId === runId ? updatedMessage : msg);
            }
            else {
                return [...prevMessages, { type: 'ai', content: message, runId: runId }];
            }
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUserMessage(event.target.value);
    }

    const handleExpandClick = async () => {
        setCollapsed(false);
    }

    return <>
        {collapsed && <div className="mdh-assistant-collapsed" onClick={handleExpandClick}><FontAwesomeSvgIcon icon={faFlask} size="lg" /></div>}
        {!collapsed && <div className="mdh-assistant">
            <div className="mdh-assistant-header">
                <div>
                    <FontAwesomeSvgIcon icon={faFlask} />
                    MyDataHelps Assistant
                </div>
                <FontAwesomeSvgIcon icon={faChevronDown} className="collapse-button" onClick={() => setCollapsed(true)} />
            </div>
            <div id="log" ref={logRef}>
                {messages && messages.map((message: MyDataHelpsAssistantMessage, index: number) => {
                    if (message.type === 'user') {
                        return <div className="user-message" key={index}>
                            <FontAwesomeSvgIcon icon={faUser} />
                            <p>{message.content}</p>
                        </div>
                    }
                    else if (message.type === 'ai') {
                        return <div className="ai-message" key={index}>
                            <FontAwesomeSvgIcon icon={faGear} />
                            <Markdown>{message.content}</Markdown>
                        </div>
                    }
                })}
                {loading && <div id="loading">
                    <FontAwesomeSvgIcon icon={faSpinner} spin={true} />
                    <p>{loading}</p>
                </div>}
            </div>

            <div className="input">
                <div className="input-group">
                    <input type="text" id="user-input" value={currentUserMessage} onChange={handleChange} onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            addUserMessage();
                        }
                    }} />
                    <button type="button" id="send" onClick={addUserMessage}>
                        <FontAwesomeSvgIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
        }
    </>
}
