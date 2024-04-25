import type ChatMessage from '../features/chat/model/ChatMessage'
import api from './api'

export const PromptAPI = {
    generationRequest: async (chatMessages: ChatMessage[]) => {
        
        const url = "https://europe-west1-qwiklabs-gcp-01-ec162502d964.cloudfunctions.net/gemini-cloud-function"
        
          // Create a new GoogleAuth client
    
        const tokenInfo = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxYjkzYzY0MDE0NGI4NGJkMDViZjI5NmQ2NzI2MmI2YmM2MWE0ODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1Mjg2OTIwMTc2MjAwODA3Njk2IiwiaGQiOiJxd2lrbGFicy5uZXQiLCJlbWFpbCI6InN0dWRlbnQtMDItNTgxMjI3MDljZDNiQHF3aWtsYWJzLm5ldCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiOG16bzVDb3hVR1dOSTlRckdRc2IyZyIsIm5iZiI6MTcxNDA0OTYzMiwiaWF0IjoxNzE0MDQ5OTMyLCJleHAiOjE3MTQwNTM1MzIsImp0aSI6IjBmZWQxYThhMzY5MGJhZWE0MzlmZDczYTQwY2FjMzY2MGY3ODA4MzEifQ.gyeE04JoxeYGlY8zQi1XDCHwSNsEAmMYpFfoCbK4EpUDuT2xXXvpFbDyEYwMPfGmIHo_bLWuPge1vDEnIBskjG1SCVZw19YtTXhGomoUrR3pETPM9Ze6Jpnuw1amlksrcePt0vsM3zZUH4aUzJXkoSiS8-U6ytvWGCWbOw0GXBI-Wy3vIbhUuRLemPqEif0EXq4Ybk6o1brb3-QCNhwQ35W4NaF_Y_UyiuO-RkQLN5O_-jttjQ6R6ov0RQsbwsk6ElyF4R8nyW6AC4XaZSl25PYxgHhGnq2LB5rku4HrIjPMUaytR01VYqPsSOWP9Kxg49pTwTbDInYbAjIOda-Y2w";
        return await api.post(
            `${url}`,
            {
                chatMessages,
            },
            {
                headers: {
                    'Authorization': `Bearer ${tokenInfo}`,
                    'Content-Type': 'application/json'  // Add this line
                }
            }
        )
    },
}
