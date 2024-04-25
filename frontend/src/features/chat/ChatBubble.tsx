import { Text, Stack, Space, useMantineTheme } from '@mantine/core'
import type ChatMessage from './model/ChatMessage'

interface ChatBubbleProps {
    chatMessage: ChatMessage
}

const ChatBubble = ({ chatMessage }: ChatBubbleProps): React.ReactElement => {
    const { message, user } = chatMessage
    const messageLines = message.split('\n')
    const theme = useMantineTheme()
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor:
                    user !== 'user'
                        ? theme.colors[theme.primaryColor][1]
                        : theme.colors[theme.primaryColor][4],
                borderRadius: '10px',
                width: '70%',
                marginRight: user  !== 'user' ? 'auto' : 0,
                marginLeft: user  !== 'user' ? 0 : 'auto',
                textAlign: 'left',
                padding: '7px',
            }}
        >
            <Stack gap={0}>
                <Text fw={'bold'} fz={'xs'}>
                    {user !== 'user'  ? 'Emily' : 'User'}
                </Text>
                {messageLines.map((line, index) => {
                    if (line.length === 0) {
                        return <Space key={index} h={'md'} />
                    }
                    return (
                        <Text key={index} fz={'xs'}>
                            {line}
                        </Text>
                    )
                })}
            </Stack>
        </div>
    )
}

export default ChatBubble
