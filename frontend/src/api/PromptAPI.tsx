import type ChatMessage from '../features/chat/model/ChatMessage'
import api from './api'

export const PromptAPI = {
    generationRequest: async (chatMessages: ChatMessage[]) => {
        const url = "https://europe-west1-qwiklabs-gcp-01-ec162502d964.cloudfunctions.net/gemini-cloud-function"
        const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxYjkzYzY0MDE0NGI4NGJkMDViZjI5NmQ2NzI2MmI2YmM2MWE0ODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1Mjg2OTIwMTc2MjAwODA3Njk2IiwiaGQiOiJxd2lrbGFicy5uZXQiLCJlbWFpbCI6InN0dWRlbnQtMDItNTgxMjI3MDljZDNiQHF3aWtsYWJzLm5ldCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZjhOeHU4WFBrQ2J0blVvemNNeWtrZyIsIm5iZiI6MTcxNDA1MTk1NSwiaWF0IjoxNzE0MDUyMjU1LCJleHAiOjE3MTQwNTU4NTUsImp0aSI6IjcxNjk3OGI4ZDUzYWYzZjRkMjljMTIwMDI1MzQ5MDQ1Yjg4ZWFjYWIifQ.IHZdChgbvl76ayFzeClevSk2Z-jnC_t2R-drpwKfiXuHaacJtns85FS4kJ39d_lenKsVTKDXD54sOGNubjeukJMH9uQ4zKQ9vzI5NA_a9cEgr1Le7VFh4qsYV394mG0bn49IlXxsB6IJdenurgnAJRi5A3HQ9HBHdmxcMQ9rlEaoj0TRp3A_BN6YW-V8bWJ5haeh-ClPFpj1G7pFB1QzmiKc1SiVvBzkvFwW8gHWR7Et4Gw-jjk74gnvgGYaTdjANDfhw8YA81-DLRZSkCv5--zwTDIPEoWuaHVNXvFwLHETNHO1GLrGSikfjkBXy_14PsAe0pndXIePdo1BrOi2AA"
        return await api.post(
            `http://localhost:8081`,
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
