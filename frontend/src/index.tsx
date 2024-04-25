import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './styles/theme'
import { routes } from './features/routing/Routes'
import Homepage from './pages/HomePage'

const root = ReactDOM.createRoot(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('root')!,
)

const routing = routes.map((route, key) => {
    return <Route path={route.route} element={route.page} key={key} />
})

root.render(
    <MantineProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<Homepage />} />
                    {routing}
                </Route>
            </Routes>
        </BrowserRouter>
    </MantineProvider>,
)
