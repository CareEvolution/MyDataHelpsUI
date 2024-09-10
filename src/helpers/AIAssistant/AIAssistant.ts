import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { END, StateGraph, StateGraphArgs, START, MemorySaver, CompiledStateGraph, messagesStateReducer } from "@langchain/langgraph/web";
import { ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { RunnableConfig } from "@langchain/core/runnables";
import { StructuredTool } from "@langchain/core/tools";

import MyDataHelps, { Guid, ParticipantInfo, ProjectInfo } from "@careevolution/mydatahelps-js";

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
    GetEhrNewsFeedPageTool,
    GetDeviceDataV2AllDataTypesTool
} from "./Tools";


export interface AIAssistantState {
    messages: BaseMessage[];
    participantInfo: string;
    projectInfo: string;
}

export class MyDataHelpsAIAssistant {

    constructor(baseUrl: string = "", additionalInstructions: string = "", tools: StructuredTool[] = [], appendTools: boolean = true) {
        this.baseUrl = baseUrl || "https://xwk5dezh5vnf4in2avp6dxswym0tmgxg.lambda-url.us-east-1.on.aws/";
        this.additionalInstructions = additionalInstructions;
        this.tools = tools.length ? (appendTools ? this.defaultTools.concat(tools) : tools) : this.defaultTools;
    }

    async ask(userMessage: string, onEvent: (event: any) => void) {

        if (!this.initialized) {
            let participantInfo = await MyDataHelps.getParticipantInfo();
            let projectInfo = await MyDataHelps.getProjectInfo();
            this.initialize(participantInfo, projectInfo);
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

    private initialize(participantInfo: ParticipantInfo, projectInfo: ProjectInfo) {

        const toolNode = new ToolNode<{ messages: BaseMessage[] }>(this.tools);

        const graphState: StateGraphArgs<AIAssistantState>["channels"] = {
            messages: {
                reducer: messagesStateReducer
            },
            participantInfo: {
                value: (x: string, y: string) => y ? y : x,
                default: () => "{}"
            },
            projectInfo: {
                value: (x: string, y: string) => y ? y : x,
                default: () => "{}"
            }
        };

        const boundModel = new ChatOpenAI({
            model: "gpt-4o-2024-08-06",
            temperature: 0,
            apiKey: MyDataHelps.token.access_token
        }, {
            baseURL: this.baseUrl
        }).bindTools(this.tools);

        const promptTemplate = ChatPromptTemplate.fromMessages([
            SystemMessagePromptTemplate.fromTemplate(`
			You are a health and wellness data assistant. Your purpose is to help users understand their health and wearable data,
            which includes providing simple summaries and highlighting insights and connections between data. The tone should
            be clear and friendly. You are not a coach, so should not give advice. You should not be disparaging or discouraging,
            just objectively share information.
            
            You can encourage the user to ask more questions and even suggest additional follow-up questions that might be relevant.

            If the user asks for some data, and you query it with a particular tool, but the returned data does not sufficiently
            answer the user's question, for example, if the user asks for their last 3 LDL values, and you query the getEhrNewsFeedPage
            tool and it returns only the last 2 LDL values and a nextPageID, then query the same tool again while passing the nextPageID as the
            pageID parameter to fetch additional data. Continue this process until you have all the data that the user has asked for, up to 5 iterations.

			User information: {participantInfo}

            Project information: {projectInfo}
			
			The time right now is ${new Date().toISOString()}.

            ${this.additionalInstructions}
			`),
            new MessagesPlaceholder("messages")
        ]);

        const routeMessage = (state: AIAssistantState) => {
            const { messages } = state;
            const lastMessage = messages[messages.length - 1] as AIMessage;
            if (!lastMessage.tool_calls?.length) {
                return END;
            }
            return "tools";
        };

        const callModel = async (state: AIAssistantState, config?: RunnableConfig) => {
            const { messages, participantInfo, projectInfo } = state;
            const chain = promptTemplate.pipe(boundModel);
            const response = await chain.invoke({ messages, participantInfo, projectInfo }, config);
            return { messages: [response] };
        };

        const setContextInfo = async () => {
            return {
                participantInfo: JSON.stringify(participantInfo),
                projectInfo: JSON.stringify(projectInfo)
            };
        };

        const workflow = new StateGraph<AIAssistantState>({
            channels: graphState
        })
            .addNode("setContextInfo", setContextInfo)
            .addNode("agent", callModel)
            .addNode("tools", toolNode)
            .addEdge(START, "setContextInfo")
            .addEdge("setContextInfo", "agent")
            .addConditionalEdges("agent", routeMessage)
            .addEdge("tools", "agent");

        const memory = new MemorySaver();

        this.graph = workflow.compile({ checkpointer: memory });

        this.initialized = true;
        this.participantId = participantInfo.participantID;
    }

    private initialized = false;
    private graph!: CompiledStateGraph<AIAssistantState, Partial<AIAssistantState>, "agent" | "tools" | "setContextInfo" | typeof START>;
    private baseUrl: string;
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
        new GetEhrNewsFeedPageTool(),
        new GetDeviceDataV2AllDataTypesTool()
    ];
}
