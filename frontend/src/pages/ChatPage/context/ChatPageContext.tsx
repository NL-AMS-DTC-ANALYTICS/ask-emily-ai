import { createContext } from 'react'
import type ChatMessage from '../../../features/chat/model/ChatMessage'

interface ChatPageContextType {
    chatMessages: ChatMessage[]
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
    medicalKnowledge: string
    language: string
}

export const ChatPageContext = createContext<ChatPageContextType>({
    chatMessages: [],
    setChatMessages: () => {},
    medicalKnowledge: '',
    language: '',
} satisfies ChatPageContextType)

interface ChatPageProviderProps {
    children: React.ReactNode
    chatMessages: ChatMessage[]
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
    medicalKnowledge: string
    language: string
}

export const ChatPageProvider = ({
    children,
    chatMessages,
    setChatMessages,
    medicalKnowledge,
    language,
}: ChatPageProviderProps): React.ReactElement => {
    return (
        <ChatPageContext.Provider
            value={{
                chatMessages,
                setChatMessages,
                medicalKnowledge,
                language,
            }}
        >
            {children}
        </ChatPageContext.Provider>
    )
}
