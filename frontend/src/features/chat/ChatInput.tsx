import { Group, Textarea } from '@mantine/core'
import ChatButton from './ChatButton'
import { useContext, useState } from 'react'
import { ChatPageContext } from '../../pages/ChatPage/context/ChatPageContext'
import { PromptAPI } from '../../api/PromptAPI'
import type ChatMessage from './model/ChatMessage'

const ChatInput = (): React.ReactElement => {
    const [text, setText] = useState('')

    const { chatMessages, setChatMessages, medicalKnowledge, language } = useContext(ChatPageContext)
    const { generationRequest } = PromptAPI

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleSend = (): void => {
        setLoading(true)
        setText('')
        const userChatMessage: ChatMessage = {
            message: text,
            user: 'user',
        }
        const newChatMessages = [...chatMessages, userChatMessage]
        setChatMessages((prev: ChatMessage[]): ChatMessage[] => [
            ...prev,
            userChatMessage,
        ])
        generationRequest(newChatMessages, medicalKnowledge, language)
            .then(response => {
                setLoading(false)
                setError(false)
                console.log(response)
                const systemChatMessage: ChatMessage = {
                    message: response.data.responseText,
                    user: 'ai',
                }
                setChatMessages((prev: ChatMessage[]): ChatMessage[] => [
                    ...prev,
                    systemChatMessage,
                ])
            })
            .catch(() => {
                setError(true)
                setLoading(false)
                setChatMessages((prev: ChatMessage[]): ChatMessage[] => [
                    ...prev,
                    {
                        message: 'Something went wrong. Please try again.',
                        user: 'system',
                    },
                ])
            })
    }
    return (
        <Group
            style={{
                display: 'flex',
                alignItems: 'stretch',
            }}
            gap={'xs'}
        >
            <Textarea
                minRows={1}
                autosize
                placeholder="Request a generated text here"
                style={{
                    flexGrow: 1,
                }}
                styles={{
                    input: {
                        margin: 0,
                    },
                }}
                value={text}
                onChange={e => {
                    setText(e.currentTarget.value)
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSend()
                    }
                }}
            />
            <div
                style={{
                    flexGrow: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ChatButton
                    text={text}
                    onClick={handleSend}
                    loading={loading}
                    error={error}
                />
            </div>
        </Group>
    )
}

export default ChatInput
