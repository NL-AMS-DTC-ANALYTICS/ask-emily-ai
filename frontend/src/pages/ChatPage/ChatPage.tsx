import { Container, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import ChatInput from '../../features/chat/ChatInput'
import { ChatPageProvider } from './context/ChatPageContext'
import ChatWindow from '../../features/chat/ChatWindow'
import type ChatMessage from '../../features/chat/model/ChatMessage'

const ChatPage = (): React.ReactElement => {
    const [rfpId, setRfpId] = useState<string | null>(null)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            message:
                'Hello, I am BidBot, a chatbot that helps you write your proposals. Please submit your RFP above and request a piece of generated proposal text below.',
            user: 'system',
        },
    ])

    return (
        <ChatPageProvider
            rfpId={rfpId}
            setRfpId={setRfpId}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
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
                    <ChatWindow />
                    <Stack gap={0}>
                        <Text fz={'10'} c={'grey'}>
                            Please note that BidBot is a chatbot that uses
                            machine learning to generate text. It can give
                            untrue or inaccurate responses. Please use your own
                            discretion when using BidBot.
                        </Text>
                        <ChatInput />
                    </Stack>
                </Stack>
            </Container>
        </ChatPageProvider>
    )
}
export default ChatPage
