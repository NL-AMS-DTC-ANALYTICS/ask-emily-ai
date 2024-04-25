import { Container, Group, Stack, Text, TextInput } from '@mantine/core'
import { useState } from 'react'
import ChatInput from '../../features/chat/ChatInput'
import { ChatPageProvider } from './context/ChatPageContext'
import ChatWindow from '../../features/chat/ChatWindow'
import type ChatMessage from '../../features/chat/model/ChatMessage'

const ChatPage = (): React.ReactElement => {
    const [medicalKnowledge, setMedicalKnowledge] = useState<string>('')
    const [language, setLanguage] = useState<string>('')
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            message:
                'Hello, I am Emily, a chatbot that can answer your questions about your recent doctor visit. How can I help you today?',
            user: 'ai',
        },
    ])

    return (
        <ChatPageProvider
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            medicalKnowledge={medicalKnowledge}
            language={language}
        >
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '100vh',
                }}
                p={'xs'}
            >
                <Stack
                    style={{
                        height: '100%',
                    }}
                    gap={'xs'}
                >
                    <Group grow>
                    <TextInput label="Medical Knowledge" value={medicalKnowledge} onChange={(event) => {setMedicalKnowledge(event.currentTarget.value)}} />
                    <TextInput label="Language" value={language} onChange={(event) => {setLanguage(event.currentTarget.value)}} />
                    </Group>
                    <ChatWindow />
                    <Stack gap={0}>
                        <Text fz={'10'} c={'grey'}>
                            Please note that Emily is a chatbot that uses
                            machine learning to generate text. It can give
                            untrue or inaccurate responses. Please use your own
                            discretion when using Emily.
                        </Text>
                        <ChatInput />
                    </Stack>
                </Stack>
            </Container>
        </ChatPageProvider>
    )
}
export default ChatPage
