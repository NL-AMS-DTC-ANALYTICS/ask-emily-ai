import type ChatMessage from '../features/chat/model/ChatMessage'
import api from './api'

export const PromptAPI = {
    generationRequest: async (chatMessages: ChatMessage[]) => {
        return await api.post(
            `http://localhost:8081`,
            {
                chatMessages,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },
        )
    },
}
