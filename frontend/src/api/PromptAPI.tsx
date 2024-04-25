import type ChatMessage from '../features/chat/model/ChatMessage'
import api from './api'

export const PromptAPI = {
    generationRequest: async (chatMessages: ChatMessage[]) => {
        const url = "https://europe-west1-qwiklabs-gcp-01-ec162502d964.cloudfunctions.net/gemini-cloud-function"
        const token = "YOUR-TOKEN"
        return await api.post(
            url,
            {
                chatMessages,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'  // Add this line
                }
            }
        )
    },
}
