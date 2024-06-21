import React, { useEffect, useState } from 'react';
import MyDataHelps from "@careevolution/mydatahelps-js";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGears } from '@fortawesome/free-solid-svg-icons/faGears';

import '@fortawesome/fontawesome-svg-core/styles.css';
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
        setMessages(prevMessages => [...prevMessages, { type: 'user', content: newMessage }]);

        setCurrentUserMessage('');

        let currentAIMessage = "";

        await MyDataHelps.addUserMessage(newMessage, async function(event) {

            setLoading(event.loading);

            if (event.event === "on_llm_start") {
                currentAIMessage = "";
                setMessages(prevMessages => [...prevMessages, { type: 'ai', content: currentAIMessage }])
            }
            else if (event.event === "on_llm_end") {
            }

            if (event.text) {
                currentAIMessage += event.text;
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1] = { type: 'ai', content: currentAIMessage };
                    return newMessages;
                });
            }
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUserMessage(event.target.value);
    }

    return (
        <div className="mdh-assistant">
            <div id="log">
                {messages && messages.map((message: MyDataHelpsAssistantMessage, index: number) => {
                    if (message.type === 'user') {
                        return <div className="user-message" key={index}>
                            <FontAwesomeSvgIcon icon={faUser} />
                            <p>{message.content}</p>
                        </div>
                    }
                    else if (message.type === 'ai') {
                        return <div className="ai-message" key={index}>
                            <FontAwesomeSvgIcon icon={faGears} />
                            <p>{message.content}</p>
                        </div>
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
                        <FontAwesomeSvgIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    );
}
