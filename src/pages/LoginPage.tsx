import axios from 'axios'
import * as Yup from 'yup'
import { sentenceCase } from 'sentence-case'
import { ChevronRight } from '@material-ui/icons'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { ButtonWithLoader } from '../components/ButtonWithLoader'
import { TextField } from '@material-ui/core'
import { CenteredCard } from '../components/CenteredCard'
import { useSelector } from 'react-redux'
import { State } from 'src/types'

interface Props {
    history: any
}

export const LoginPage: FC<Props> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const loading = useSelector((state: State) => state.loading)
    const user = useSelector((state: State) => state.user)

    useEffect(() => {
        const emailFromStorage = sessionStorage.getItem('user_email')

        if (!loading && user) {
            history.push('/app')
        } else if (emailFromStorage) {
            setEmail(emailFromStorage)
        }
    }, [loading, user])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const emailAlt = email.trim()
        if (!emailAlt) {
            return setEmailError('Email is required')
        }

        try {
            await Yup.string().email().validate(email)

            setEmailError('')

            try {
                setSubmitting(true)
                await axios.post('/api/auth/login', {
                    email: emailAlt,
                })

                sessionStorage.setItem('user_email', email)
                history.push('/verify-otp')
            } catch (err) {
                setEmailError(err.response.data.message)
                setSubmitting(false)
            }
        } catch (err) {
            setEmailError(sentenceCase(err.message))
        }
    }

    return (
        <CenteredCard logo>
            <h2>Welcome to Televite</h2>
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    error={!!emailError}
                    type='email'
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    color='secondary'
                    helperText={emailError}
                    disabled={submitting}
                />

                <ButtonWithLoader
                    type='submit'
                    variant='contained'
                    color='primary'
                    endIcon={<ChevronRight />}
                    style={{ marginTop: '2rem' }}
                    loading={submitting}
                >
                    Continue
                </ButtonWithLoader>
            </form>
        </CenteredCard>
    )
}
