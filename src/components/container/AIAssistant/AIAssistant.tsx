import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { StreamEvent } from '@langchain/core/tracers/log_stream';
import { AIMessageChunk } from '@langchain/core/messages';
import { StructuredTool } from '@langchain/core/tools';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { RealtimeClient } from '@openai/realtime-api-beta';
import { WavRecorder, WavStreamPlayer } from '../../../helpers/wavtools/index.js';
import { ItemType } from '@openai/realtime-api-beta/dist/lib/client.js';

import { MyDataHelpsAIAssistant } from '../../../helpers/AIAssistant/AIAssistant';
import language from '../../../helpers/language';
import Chat from '../../presentational/Chat';

import '@fortawesome/fontawesome-svg-core/styles.css';
import './AIAssistant.css';
import { convertToOpenAITool } from '@langchain/core/utils/function_calling';
import { MyDataHelpsTools } from '../../../helpers';

export interface AIAssistantProps {
    innerRef?: React.Ref<HTMLDivElement>;
    previewState?: "default";
    debug: boolean;
    additionalInstructions?: string;
    tools?: StructuredTool[];
    appendTools?: boolean;
    baseUrl?: string;
    saveGraphImages?: boolean;
}

export type AIAssistantMessageType = "user" | "ai" | "tool" | "image";

export interface AIAssistantMessage {
    type: AIAssistantMessageType;
    content: string;
    runId?: string;
    audioFileUrl?: string;
}

export default function (props: AIAssistantProps) {

    const [messages, setMessages] = useState<AIAssistantMessage[]>([]);
    const [loading, setLoading] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);

    let lastAIMessage = "";

    const assistantRef = useRef<MyDataHelpsAIAssistant>();

    const clientRef = useRef<RealtimeClient>(new RealtimeClient({
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowAPIKeyInBrowser: true
    }));

    const wavRecorderRef = useRef<WavRecorder>(
        new WavRecorder({ sampleRate: 24000 })
    );
    const wavStreamPlayerRef = useRef<WavStreamPlayer>(
        new WavStreamPlayer({ sampleRate: 24000 })
    );

    const [isRecording, setIsRecording] = useState(false);
    let graphCallIds: string[] = [];

    useEffect(() => {

        const initialize = async () => {
            if (assistantRef.current === undefined) {
                assistantRef.current = new MyDataHelpsAIAssistant(props.baseUrl, props.additionalInstructions, props.tools, props.appendTools);
            }

            const client = clientRef.current;
            const wavRecorder = wavRecorderRef.current;
            const wavStreamPlayer = wavStreamPlayerRef.current;

            let participantInfo = await MyDataHelps.getParticipantInfo();
            let projectInfo = await MyDataHelps.getProjectInfo();

            let instructions = `You are a health and wellness data assistant. Your purpose is to help users understand their health and wearable data,
                which includes providing simple summaries and highlighting insights and connections between data. The tone should
                be clear and friendly. You are not a coach, so should not give advice. You should not be disparaging or discouraging,
                just objectively share information.
                
                You can encourage the user to ask more questions and even suggest additional follow-up questions that might be relevant.

                If the user asks for some data, and you query it with a particular tool, but the returned data does not sufficiently
                answer the user's question, for example, if the user asks for their last 3 LDL values, and you query the getEhrNewsFeedPage
                tool and it returns only the last 2 LDL values and a nextPageID, then query the same tool again while passing the nextPageID as the
                pageID parameter to fetch additional data. Continue this process until you have all the data that the user has asked for, up to 5 iterations.

                User information: ${JSON.stringify(participantInfo)}

                Project information: ${JSON.stringify(projectInfo)}
                
                The time right now is ${new Date().toISOString()}.`

            client.updateSession({
                turn_detection: { type: 'server_vad' },
                input_audio_transcription: { model: 'whisper-1' },
                voice: 'alloy',
                instructions
            });

            let oldTools = [
                MyDataHelpsTools.QueryDailySleepTool,
                MyDataHelpsTools.PersistParticipantInfoTool,
                MyDataHelpsTools.QueryDeviceDataV2Tool,
                MyDataHelpsTools.QueryDeviceDataV2AggregateTool,
                MyDataHelpsTools.QueryNotificationsTool,
                MyDataHelpsTools.QueryAppleHealthWorkoutsTool,
                MyDataHelpsTools.QueryAppleHealthActivitySummariesTool,
                MyDataHelpsTools.QuerySurveyAnswersTool,
                MyDataHelpsTools.QueryDailyDataTool,
                MyDataHelpsTools.GetAllDailyDataTypesTool,
                MyDataHelpsTools.GetEhrNewsFeedPageTool,
                MyDataHelpsTools.GetDeviceDataV2AllDataTypesTool,
                MyDataHelpsTools.GraphingTool,
                MyDataHelpsTools.UploadedFileQueryTool,
                MyDataHelpsTools.GetUploadedFileTool
            ];

            for (let i = 0; i < oldTools.length; i++) {
                let tool = oldTools[i];
                let toolDefinition = convertToOpenAITool(tool);
                client.addTool({
                    name: toolDefinition.function.name,
                    description: toolDefinition.function.description || "",
                    parameters: toolDefinition.function.parameters,
                }, tool.func);
            }

            client.on('error', (event: any) => console.error(event));
            client.on('conversation.interrupted', async () => {
                const trackSampleOffset = await wavStreamPlayer.interrupt();
                if (trackSampleOffset?.trackId) {
                    const { trackId, offset } = trackSampleOffset;
                    await client.cancelResponse(trackId, offset);
                }
            });

            client.on('conversation.updated', async ({ item, delta }: any) => {
                const items = client.conversation.getItems();
                if (delta?.audio) {
                    wavStreamPlayer.add16BitPCM(delta.audio, item.id);
                }
                if (item.status === 'completed' && item.formatted.audio?.length) {
                    const wavFile = await WavRecorder.decode(
                        item.formatted.audio,
                        24000,
                        24000
                    );
                    item.formatted.file = wavFile;
                }

                let updatedMessages = [];

                for (let i = 0; i < items.length; i++) {
                    let conversationItem = items[i];
                    let audioFileUrl, content = "", type: AIAssistantMessageType = "user";

                    if (conversationItem.formatted.file) {
                        audioFileUrl = conversationItem.formatted.file.url;
                    }

                    if (conversationItem.type === 'function_call_output' && graphCallIds.includes((conversationItem as any).call_id)) {
                        if (conversationItem.formatted.output) {
                            let image = JSON.parse(conversationItem.formatted.output);
                            if (image && !image.startsWith("error")) {
                                let imageType: AIAssistantMessageType = 'image';
                                updatedMessages.push({
                                    type: imageType,
                                    content: `data:image/png;base64,${image}`
                                });
                            }
                        }
                    }

                    if (conversationItem.role === 'user') {
                        type = 'user';
                        content = conversationItem.formatted.transcript ||
                            (conversationItem.formatted.audio?.length
                                ? '(awaiting transcript)'
                                : conversationItem.formatted.text ||
                                '(item sent)');
                    }
                    else if (conversationItem.role === 'assistant') {
                        type = 'ai';
                        content = conversationItem.formatted.transcript ||
                            conversationItem.formatted.text ||
                            '(truncated)';
                    }
                    else if (conversationItem.formatted.tool) {
                        try {

                            if (conversationItem.formatted.tool.name === "graphing") {
                                graphCallIds.push((conversationItem as any).call_id);
                            }

                            type = 'tool';
                            let formatted = await formatCode(conversationItem.formatted.tool.name, conversationItem.formatted.tool.arguments);
                            content = "```js\n" + formatted + "```";
                        }
                        catch (e) {

                        }
                    }

                    updatedMessages.push({ type, content, audioFileUrl });
                }

                setMessages(updatedMessages);
            });
        }

        initialize();

        return () => {
            // cleanup; resets to defaults
            clientRef.current.reset();
        };

    }, []);

    const startRecording = useCallback(async () => {
        const client = clientRef.current;
        const wavRecorder = wavRecorderRef.current;
        const wavStreamPlayer = wavStreamPlayerRef.current;

        setIsRecording(true);

        // Connect to microphone
        await wavRecorder.begin();

        // Connect to audio output
        await wavStreamPlayer.connect();

        // Connect to realtime API
        await client.connect();

        await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }, []);

    const stopRecording = useCallback(async () => {
        setIsRecording(false);

        const client = clientRef.current;
        client.disconnect();

        const wavRecorder = wavRecorderRef.current;
        await wavRecorder.end();

        const wavStreamPlayer = wavStreamPlayerRef.current;
        await wavStreamPlayer.interrupt();
    }, []);

    const addUserMessage = async function (newMessage: string) {

        setMessages(prevMessages => [...prevMessages, { type: 'user', content: newMessage }]);

        if (props.previewState === "default") return;

        setInputDisabled(true);

        MyDataHelps.trackCustomEvent({
            eventType: "ai-assistant-message",
            properties: {
                type: "user",
                body: newMessage
            }
        });

        await assistantRef.current?.ask(newMessage, async function (streamEvent: StreamEvent) {

            const [kind, type] = getEventKindType(streamEvent.event);

            if (type === "stream" && kind !== "chain") {
                let msg = streamEvent.data?.chunk as AIMessageChunk;

                if (msg.content && typeof msg.content === "string") {
                    addMessageChunk(streamEvent.run_id, msg.content);
                }
            }

            if (kind === "tool") {
                if (type === "start") {
                    setLoading(language('ai-assistant-loading'));
                }
                else if (type === "end") {
                    setLoading("");

                    let toolName = streamEvent.name;
                    let toolInput = streamEvent.data.input.input;

                    if (props.debug) {
                        let formattedMessage = await formatCode(toolName, toolInput)
                        addMessage(streamEvent.run_id, "```js\n" + formattedMessage + "```", "tool");
                    }

                    if (toolName === "graphing") {
                        let image = streamEvent.data.output.content;
                        if (image && !image.startsWith("error")) {
                            addMessage(streamEvent.run_id, `data:image/png;base64,${image}`, "image");

                            if (props.saveGraphImages) {
                                const binaryString = atob(image);
                                const len = binaryString.length;
                                const uint8Array = new Uint8Array(len);

                                for (let i = 0; i < len; i++) {
                                    uint8Array[i] = binaryString.charCodeAt(i);
                                }

                                const blob = new Blob([uint8Array], { type: 'image/png' });
                                const file = new File([blob], `graph-${new Date().getTime()}.png`, { type: 'image/png' });

                                await MyDataHelps.uploadFile(file, "ai-graph");
                            }
                        }
                    }
                    else if (toolName === "getUploadedFile") {
                        let input = JSON.parse(toolInput);
                        if (input.key && input.key.endsWith(".png")) {
                            let output = JSON.parse(streamEvent.data.output.content);
                            addMessage(streamEvent.run_id, output.preSignedUrl, "image");
                        }
                    }

                    MyDataHelps.trackCustomEvent({
                        eventType: "ai-assistant-message",
                        properties: {
                            type: "tool",
                            body: `${toolName}(${toolInput})`
                        }
                    });
                }
            }

            if (kind === "chat_model" && type === "start") {
                lastAIMessage = "";
            }

            if (kind === "chat_model" && type === "end") {

                MyDataHelps.trackCustomEvent({
                    eventType: "ai-assistant-message",
                    properties: {
                        type: "ai",
                        body: lastAIMessage
                    }
                });

                setInputDisabled(false);
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

        lastAIMessage += message;
    }

    const addMessage = function (runId: string, message: string, type: AIAssistantMessageType) {
        setMessages(prevMessages => [...prevMessages, { type, content: message, runId }]);
    }

    return <>
        {messages && <Chat innerRef={props.innerRef} messages={messages.map((msg) => {
            return {
                icon: msg.type === "ai" ? <FontAwesomeSvgIcon icon={faLightbulb} width={16} /> : undefined,
                content: msg.content,
                type: msg.type === "user" ? "sent" : (msg.type === "image" ? "received-image" : "received"),
                cssClass: msg.type === "tool" ? "tool" : (msg.type === "image" ? "image" : undefined),
                audioFileUrl: msg.audioFileUrl
            }
        })} onSendMessage={addUserMessage} onStartRecording={startRecording} onStopRecording={stopRecording} isRecording={isRecording}
            loading={loading} inputDisabled={inputDisabled} />}
    </>
}

function getEventKindType(input: string) {
    const parts = input.split('_');
    const type = parts.pop();
    const kind = parts.slice(1).join('_');
    return [kind, type];
}

async function formatCode(toolName: string, toolInput: string) {
    const prettier = await import("prettier/standalone");
    const babelPlugin = await import("prettier/plugins/babel");
    const estreePlugin = await import("prettier/plugins/estree");

    return prettier.format(`${toolName}(${toolInput})`, {
        parser: "babel",
        plugins: [babelPlugin, estreePlugin.default]
    });
}
