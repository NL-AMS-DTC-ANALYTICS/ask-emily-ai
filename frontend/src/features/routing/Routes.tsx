import { Robot } from '@phosphor-icons/react'
import { type RouteInstance } from './RouteInstance'
import ChatPage from '../../pages/ChatPage/ChatPage'

export const routes: RouteInstance[] = [
    {
        icon: <Robot />,
        name: 'Chat Bot',
        route: '/chatbot',
        page: <ChatPage />,
    } satisfies RouteInstance
]
