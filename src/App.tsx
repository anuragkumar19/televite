import React, { FC, useEffect } from 'react'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouterOutlet } from './router/RouterOutlet'
import { useDispatch, useSelector } from 'react-redux'
import { State } from './types'
import { removeLoading } from './redux/actions/loading'
import axios from 'axios'
import { setAccessToken, setUser } from './redux/actions/user'
import { LoadingPage } from './pages/LoadingPage'

export const App: FC = () => {
    const loading = useSelector((state: State) => state.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        const getInitialState = async () => {
            // Config base url @axios
            axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI

            // Try fetching accessToken
            try {
                const getAccessToken = async () => {
                    const { data } = await axios.put(
                        '/api/auth/refresh-token',
                        {},
                        {
                            withCredentials: true,
                        }
                    )

                    return data.data.accessToken as string
                }

                const accessToken = await getAccessToken()

                const { data: userData } = await axios.get('/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })

                const user = { ...userData, accessToken }

                dispatch(setUser(user))

                setInterval(async () => {
                    const refreshedAccessToken = await getAccessToken()

                    dispatch(setAccessToken(refreshedAccessToken))
                }, 1000 * 60 * 4)
            } catch (err) {
                //...
            }
            dispatch(removeLoading())
        }

        getInitialState()
    }, [])

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {loading ? (
                    <LoadingPage />
                ) : (
                    <Container>
                        <RouterOutlet />
                    </Container>
                )}
            </ThemeProvider>
        </Router>
    )
}
