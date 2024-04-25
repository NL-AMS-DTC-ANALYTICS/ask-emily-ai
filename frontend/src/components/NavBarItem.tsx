import { Container, Group, Text, useMantineTheme } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'

interface NavBarItemProps {
    icon: React.ReactElement
    name: string
    route: string
}

const NavBarItem = ({
    icon,
    name,
    route,
}: NavBarItemProps): React.ReactElement => {
    const navigate = useNavigate()

    const { hovered, ref } = useHover()
    const theme = useMantineTheme()
    const baseStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        backgroundColor: theme.colors.gray[1],
    }
    const hoverStyle: React.CSSProperties = {
        ...baseStyle,
        backgroundColor: theme.colors['eviden-dark'][4],
        color: 'white',
    }
    const activeStyle: React.CSSProperties = {
        ...hoverStyle,
        backgroundColor: theme.colors['eviden-dark'][3],
    }

    const isActive = window.location.pathname === route

    return (
        <Container
            m={'xs'}
            p={'xs'}
            style={isActive ? activeStyle : hovered ? hoverStyle : baseStyle}
            ref={ref}
            onClick={() => {
                navigate(route)
            }}
        >
            <Group gap={'xs'}>
                {icon}
                <Text>{name}</Text>
            </Group>
        </Container>
    )
}

export default NavBarItem
