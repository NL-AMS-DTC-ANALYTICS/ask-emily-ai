import { Button } from '@mantine/core'
import { PaperPlaneRight } from '@phosphor-icons/react'

interface ChatButtonProps {
    text: string
    onClick: () => void
    loading: boolean
    error: boolean
}

const ChatButton = ({
    text,
    onClick,
    loading,
    error,
}: ChatButtonProps): React.ReactElement => {

    return (
        <Button
            style={{
                flexGrow: 1,
            }}
            disabled={loading || text.length === 0}
            loading={loading}
            color={error ? 'red.7' : 'eviden-dark.4'}
            onClick={onClick}
        >
            <PaperPlaneRight />
        </Button>
    )
}

export default ChatButton
