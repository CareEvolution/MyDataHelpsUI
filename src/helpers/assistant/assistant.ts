import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { END, StateGraph, StateGraphArgs, START, MemorySaver, CompiledStateGraph, messagesStateReducer } from "@langchain/langgraph/web";
import { ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { RunnableConfig } from "@langchain/core/runnables";
import { StructuredTool } from "@langchain/core/tools";

import MyDataHelps, { Guid, ParticipantInfo } from "@careevolution/mydatahelps-js";

import {
    PersistParticipantInfoTool,
    QueryAppleHealthActivitySummariesTool,
    QueryAppleHealthWorkoutsTool,
    QueryDailySleepTool,
    QueryDeviceDataV2AggregateTool,
    QueryDeviceDataV2Tool,
    QueryNotificationsTool,
    QuerySurveyAnswersTool,
    QueryDailyDataTool,
    GetAllDailyDataTypesTool,
    GetEhrNewsFeedPageTool
} from "./tools";


export interface IAssistantState {
    messages: BaseMessage[];
    participantInfo: string;
}

export class MyDataHelpsAssistant {

    constructor(additionalInstructions: string = "", tools: StructuredTool[] = [], appendTools: boolean = true) {
        this.additionalInstructions = additionalInstructions;
        this.tools = tools.length ? (appendTools ? this.defaultTools.concat(tools) : tools) : this.defaultTools;
    }

    async ask(userMessage: string, onEvent: (event: any) => void) {

        if (!this.initialized) {
            let participantInfo = await MyDataHelps.getParticipantInfo();
            this.initialize(participantInfo);
        }

        let config = { configurable: { thread_id: this.participantId } };
        let inputs = {
            messages: [
                new HumanMessage(userMessage)
            ]
        };
        for await (
            const event of await this.graph.streamEvents(inputs, {
                ...config,
                streamMode: "values",
                version: "v1"
            })
        ) {
            onEvent(event);
        }
    }

    private initialize(participantInfo: ParticipantInfo) {

        const toolNode = new ToolNode<{ messages: BaseMessage[] }>(this.tools);

        const graphState: StateGraphArgs<IAssistantState>["channels"] = {
            messages: {
                reducer: messagesStateReducer
            },
            participantInfo: {
                value: (x: string, y: string) => y ? y : x,
                default: () => "{}"
            }
        };

        const boundModel = new ChatOpenAI({
            model: "gpt-4o",
            temperature: 0,
            apiKey: MyDataHelps.token.access_token
        }, {
            baseURL: this.baseUrl
        }).bindTools(this.tools);

        const promptTemplate = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate(`
			You are a health and wellness assistant. Your purpose is to help users understand their health and wearable data.
			
			User information: {participantInfo}
			
			The time right now is ${new Date().toISOString()}.

            ${this.additionalInstructions}
			`),
            new MessagesPlaceholder("messages")
        ]);

        const routeMessage = (state: IAssistantState) => {
            const { messages } = state;
            const lastMessage = messages[messages.length - 1] as AIMessage;
            if (!lastMessage.tool_calls?.length) {
                return END;
            }
            return "tools";
        };

        const callModel = async (state: IAssistantState, config?: RunnableConfig) => {
            const { messages, participantInfo } = state;
            const chain = promptTemplate.pipe(boundModel);
            const response = await chain.invoke({ messages, participantInfo }, config);
            return { messages: [response] };
        };

        const setParticipantInfo = async () => {
            return { participantInfo: JSON.stringify(participantInfo) };
        };

        const workflow = new StateGraph<IAssistantState>({
            channels: graphState
        })
            .addNode("setParticipantInfo", setParticipantInfo)
            .addNode("agent", callModel)
            .addNode("tools", toolNode)
            .addEdge(START, "setParticipantInfo")
            .addEdge("setParticipantInfo", "agent")
            .addConditionalEdges("agent", routeMessage)
            .addEdge("tools", "agent");

        const memory = new MemorySaver();

        this.graph = workflow.compile({ checkpointer: memory });

        this.initialized = true;
        this.participantId = participantInfo.participantID;
    }

    private initialized = false;
    private graph!: CompiledStateGraph<IAssistantState, Partial<IAssistantState>, "agent" | "tools" | "setParticipantInfo" | typeof START>;
    private baseUrl = 'https://2f4jcc2e2wgkjtpckvv2hhaani0ilmam.lambda-url.us-east-1.on.aws/';
    private participantId!: Guid;
    private additionalInstructions: string;
    private tools: StructuredTool[];

    private defaultTools: StructuredTool[] = [
        new QueryDailySleepTool(),
        new PersistParticipantInfoTool(),
        new QueryDeviceDataV2Tool(),
        new QueryDeviceDataV2AggregateTool(),
        new QueryNotificationsTool(),
        new QueryAppleHealthWorkoutsTool(),
        new QueryAppleHealthActivitySummariesTool(),
        new QuerySurveyAnswersTool(),
        new QueryDailyDataTool(),
        new GetAllDailyDataTypesTool(),
        new GetEhrNewsFeedPageTool()
    ];
}
