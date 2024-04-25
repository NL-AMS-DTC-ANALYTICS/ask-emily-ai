import { Container, Stack } from '@mantine/core'
import ChatBubble from './ChatBubble'
import { useContext } from 'react'
import { ChatPageContext } from '../../pages/ChatPage/context/ChatPageContext'

const ChatWindow = (): React.ReactElement => {
    const { chatMessages } = useContext(ChatPageContext)
    return (
        <Container
            m={0}
            p={'xs'}
            style={{
                border: '1px solid grey',
                borderRadius: '10px',
                flexGrow: 1,
                overflowY: 'scroll'
            }}
        >
            <Stack gap={'xs'}>
                {chatMessages.map((m, index) => {
                    if (m == null) return null
                    return <ChatBubble key={index} chatMessage={m} />
                })}
            </Stack>
        </Container>
    )
}

export default ChatWindow
