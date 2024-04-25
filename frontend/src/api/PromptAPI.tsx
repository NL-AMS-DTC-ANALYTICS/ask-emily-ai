import type ChatMessage from '../features/chat/model/ChatMessage'
import api from './api'

export const PromptAPI = {
    generationRequest: async (chatMessages: ChatMessage[], medicalKnowledge: string, language: string) => {
        return await api.post(
            `http://localhost:8081`,
            {
                chatMessages: chatMessages,
                medicalKnowledge: medicalKnowledge,
                language: language,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            },
        )
    },
}
