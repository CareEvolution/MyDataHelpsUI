import React, { useEffect, useState } from 'react';
import MyDataHelps from "@careevolution/mydatahelps-js";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPlane } from '@fortawesome/free-solid-svg-icons/faPlane';

import "./MyDataHelpsAssistant.css";

export interface MyDataHelpsAssistantProps {
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "default";
}

export interface MyDataHelpsAssistantMessage {
    type: string;
    content: string;
}

export default function(props: MyDataHelpsAssistantProps) {

    const [currentUserMessage, setCurrentUserMessage] = useState('');
    const [messages, setMessages] = useState<MyDataHelpsAssistantMessage[]>([]);
    const [loading, setLoading] = useState("");

    function initialize() {
        MyDataHelps.initializeAssistant();
    }

    useEffect(() => {
        initialize();
    }, []);

    const addUserMessage = async function() {

        let newMessage = currentUserMessage;
        setMessages([...messages, { type: 'user', content: newMessage }]);

        setCurrentUserMessage('');

        let currentAIMessage = "";

        await MyDataHelps.addUserMessage(newMessage, async function(event) {

            console.log(event);
            console.log(messages);

            setLoading(event.loading);

            if (event.event === "on_llm_start") {
                currentAIMessage = "";
                setMessages([...messages, { type: 'ai', content: currentAIMessage }])
            }
            else if (event.event === "on_llm_end") {
            }

            if (event.text) {
                currentAIMessage += event.text;
                setMessages([...messages.slice(0, -1), { type: 'ai', content: currentAIMessage }])
            }
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUserMessage(event.target.value);
    }

    return (
        <>
            <div id="log">
                {messages && messages.map((message: MyDataHelpsAssistantMessage, index: number) => {
                    if (message.type === 'user') {
                        return <div className="user-message" key={index}><p>{message.content}</p></div>
                    }
                    else if (message.type === 'ai') {
                        return <div className="ai-message" key={index}><p>{message.content}</p></div>
                    }
                })}
                {loading && <div id="loading">{loading}</div>}
            </div>

            <div className="input">
                <div className="input-group">
                    <input type="text" id="user-input" value={currentUserMessage} onChange={handleChange} onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            addUserMessage();
                        }
                    }} />
                    <button type="button" id="send">
                        <FontAwesomeSvgIcon icon={faPlane} />
                    </button>
                </div>
            </div>
        </>
    );
}
