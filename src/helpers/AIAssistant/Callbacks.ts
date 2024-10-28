import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import MyDataHelps from "@careevolution/mydatahelps-js";

const AIAssistantMessageEventType = "ai-assistant-message";

export class CustomEventTrackerCallbackHandler extends BaseCallbackHandler {
    name = "CustomEventTrackerCallbackHandler";

    handleLLMEnd(output: any, runId: string): void {

        const aiMessage = output.generations[0][0].text;

        if (aiMessage) {
            MyDataHelps.trackCustomEvent({
                eventType: AIAssistantMessageEventType,
                properties: {
                    type: "ai",
                    body: aiMessage,
                },
            });
        }

        const toolCall = output.generations[0][0].message.tool_call_chunks[0];
        const toolName = toolCall?.name;
        const toolInput = toolCall?.args;

        if (toolName && toolInput) {
            MyDataHelps.trackCustomEvent({
                eventType: AIAssistantMessageEventType,
                properties: {
                    type: "tool",
                    body: `${toolName}(${toolInput})`,
                },
            });
        }
    }

    handleChatModelStart(llm: any, messages: BaseMessage[][], runId: string): void {
        const lastMessage = messages[0][messages[0].length - 1];

        if (lastMessage instanceof HumanMessage) {
            MyDataHelps.trackCustomEvent({
                eventType: AIAssistantMessageEventType,
                properties: {
                    type: "user",
                    body: lastMessage.content,
                },
            });
        }
    }
}
