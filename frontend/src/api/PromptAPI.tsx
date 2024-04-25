import type ChatMessage from '../features/chat/model/ChatMessage'
import api from './api'

export const PromptAPI = {
    generationRequest: async (chatMessages: ChatMessage[]) => {
        const FUNCTION_KEY = process.env.REACT_APP_GENERATION_REQUEST_KEY
        return await api.post(
            `https://llmservice-grad.azurewebsites.net/api/generationRequest?code=${FUNCTION_KEY}`,
            {
                chatMessages,
            },
        )
    },
}
