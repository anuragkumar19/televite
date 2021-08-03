import React, { FC, FormEvent, useEffect, useState } from 'react'
import { CenteredCard } from '../components/CenteredCard'
import { TextField } from '@material-ui/core'
import { ButtonWithLoader } from '../components/ButtonWithLoader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../types'
import { setUser, setAccessToken } from '../redux/actions/user'

interface Props {
    history: any
}

export const VerifyOtpPage: FC<Props> = ({ history }) => {
    const [error, setError] = useState('')
    const [otp, setOtp] = useState('')
    const [time, setTime] = useState(60)
    const [submitting, setSubmitting] = useState(false)

    const user = useSelector((state: State) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if (user && user.name === user.email.split('@')[0]) {
            history.push('/profile/update/name')
        } else if (user) {
            history.push('/app')
        }
    }, [user])

    useEffect(() => {
        const itervalIndex = setInterval(() => {
            setTime((state) => {
                if (state > 0) {
                    return state - 1
                } else {
                    return state
                }
            })
        }, 1000)

        return () => {
            clearInterval(itervalIndex)
        }
    }, [setTime])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const email = sessionStorage.getItem('user_email')

        try {
            setSubmitting(true)
            await axios.post(
                '/api/auth/verify-otp',
                { email, otp },
                {
                    withCredentials: true,
                }
            )
            sessionStorage.removeItem('user_email')
            setError('')

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
                alert('Invalid Login!')
            }
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setSubmitting(false)
        }
    }

    const handleResendOtp = async () => {
        try {
            setSubmitting(true)
            await axios.post('/api/auth/login', {
                email: sessionStorage.getItem('user_email'),
            })

            alert('OTP send')
        } catch (err) {
            const redirect = confirm(
                'Failed try to login again, Press "OK" to go to login page'
            )

            if (redirect) {
                history.push('/login')
            }
        } finally {
            setSubmitting(false)
            setTime(60)
        }
    }

    return (
        <CenteredCard logo>
            <h2>Verify OTP to Login</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    type='number'
                    variant='outlined'
                    style={{ width: '100px' }}
                    autoFocus
                    placeholder='OTP'
                    error={!!error}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    helperText={error}
                    disabled={submitting}
                />

                <ButtonWithLoader
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ display: 'block', margin: '2rem auto 0 auto' }}
                    loading={submitting}
                >
                    Verfiy OTP
                </ButtonWithLoader>

                <ButtonWithLoader
                    disabled={time > 0}
                    loading={submitting}
                    onClick={handleResendOtp}
                    style={{ marginTop: '1rem' }}
                >
                    Resend OTP ({`${time}s`})
                </ButtonWithLoader>
            </form>
        </CenteredCard>
    )
}
