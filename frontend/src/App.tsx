import './App.css'
import { Outlet } from 'react-router-dom'
import CustomAppShell from './components/CustomAppShell'

const App = (): React.ReactElement => {
    return (
        <CustomAppShell>
            <Outlet />
        </CustomAppShell>
    )
}

export default App
