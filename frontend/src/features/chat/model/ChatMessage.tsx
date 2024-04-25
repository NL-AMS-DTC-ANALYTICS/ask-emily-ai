interface ChatMessage {
    message: string
    user: 'system' | 'user' | 'ai'
}

export default ChatMessage
