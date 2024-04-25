import { createContext } from 'react'
import type ChatMessage from '../../../features/chat/model/ChatMessage'

interface ChatPageContextType {
    chatMessages: ChatMessage[]
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}

export const ChatPageContext = createContext<ChatPageContextType>({
    chatMessages: [],
    setChatMessages: () => {},
} satisfies ChatPageContextType)

interface ChatPageProviderProps {
    children: React.ReactNode
    rfpId: string | null
    setRfpId: (rfpId: string | null) => void
    chatMessages: ChatMessage[]
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}

export const ChatPageProvider = ({
    children,
    chatMessages,
    setChatMessages,
}: ChatPageProviderProps): React.ReactElement => {
    return (
        <ChatPageContext.Provider
            value={{
                chatMessages,
                setChatMessages,
            }}
        >
            {children}
        </ChatPageContext.Provider>
    )
}
