import { AppShell, Burger, Group, rem, Text } from '@mantine/core'
import EvidenLogo from './EvidenLogo'
import { useDisclosure } from '@mantine/hooks'
import { routes } from '../features/routing/Routes'
import NavBarItem from './NavBarItem'

interface CustomAppShellProps {
    children: React.ReactNode
}

const CustomAppShell = ({
    children,
}: CustomAppShellProps): React.ReactElement => {
    const headerHeight = 60
    const navBarWidth = 300

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure()
    return (
        <AppShell
            header={{ height: headerHeight }}
            navbar={{
                width: navBarWidth,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Burger
                        opened={desktopOpened}
                        onClick={toggleDesktop}
                        visibleFrom="sm"
                        size="sm"
                    />
                    <EvidenLogo height={60} />
                    <Text fz="xl" visibleFrom="sm">
                        Emily
                    </Text>
                    {/* <Robot size={30} /> */}
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p={'md'}>
                {routes.map((route, index) => {
                    return (
                        <NavBarItem
                            key={index}
                            icon={route.icon}
                            name={route.name}
                            route={route.route}
                        />
                    )
                })}
            </AppShell.Navbar>

            <AppShell.Main
                pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}
                style={{
                    display: 'flex',
                    maxHeight: `calc(100vh - ${rem(60)} - var(--mantine-spacing-md))`,
                }}
            >
                {children}
            </AppShell.Main>
        </AppShell>
    )
}

export default CustomAppShell
