import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

const Homepage = (): React.ReactElement => {
    const navigate = useNavigate()
    // immediately navigate to the chat page
    useEffect(() => {
        navigate('/chatbot')
    }, [navigate])
    return React.createElement(React.Fragment, null)
}
export default Homepage
