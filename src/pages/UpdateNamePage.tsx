import axios from 'axios'
import React, { FC, FormEvent, useState } from 'react'
import { CenteredCard } from '../components/CenteredCard'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../types'
import { useProtect } from '../hooks/useProtect'
import { TextField } from '@material-ui/core'
import { ButtonWithLoader } from '../components/ButtonWithLoader'
import { updateName } from '../redux/actions/user'

export const UpdateNamePage: FC<any> = ({ history }) => {
    const user = useSelector((state: State) => state.user)
    const dispatch = useDispatch()

    const [name, setName] = useState(user!.name)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    useProtect(history)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (name === user?.name) {
            history.push('/profile')
        }

        try {
            setSubmitting(true)
            await axios.put(
                '/api/user/update/name',
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                    },
                }
            )

            dispatch(updateName(name))
            history.push('/profile')
        } catch (err) {
            setError(err.response.data.message)
            setSubmitting(false)
        }
    }

    return (
        <CenteredCard>
            <h2>Update Your Name</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label='Name'
                    color='secondary'
                    fullWidth
                    autoFocus
                    error={!!error}
                    helperText={error}
                />

                <ButtonWithLoader
                    variant='contained'
                    color='primary'
                    type='submit'
                    style={{ marginTop: '2rem' }}
                    loading={submitting}
                    disabled={name === user?.name || !name}
                >
                    Update
                </ButtonWithLoader>
            </form>
        </CenteredCard>
    )
}
