import React, { FC, FormEvent, useEffect, useState } from 'react'
import { CenteredCard } from '../components/CenteredCard'
import { TextField } from '@material-ui/core'
import { ButtonWithLoader } from '../components/ButtonWithLoader'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { State } from 'src/types'

interface Props {
    history: any
}

export const VerifyOtpPage: FC<Props> = ({ history }) => {
    const [error, setError] = useState('')
    const [otp, setOtp] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const loading = useSelector((state: State) => state.loading)
    const user = useSelector((state: State) => state.user)

    useEffect(() => {
        if (!sessionStorage.getItem('user_email') || (!loading && user)) {
            history.push('/login')
        }
    }, [loading, user])

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
            history.push('/app')
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setSubmitting(false)
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
            </form>
        </CenteredCard>
    )
}
