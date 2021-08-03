import React, { FC, useState } from 'react'
import axios from 'axios'
import { ExitToApp, Edit } from '@material-ui/icons'
import { red } from '@material-ui/core/colors'
import { useSelector } from 'react-redux'
import { CenteredCard } from '../components/CenteredCard'
import { useProtect } from '../hooks/useProtect'
import { State } from '../types'
import { ButtonWithLoader } from '../components/ButtonWithLoader'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'

export const ProfilePage: FC<any> = ({ history }) => {
    const user = useSelector((state: State) => state.user)
    const [loading, setLoading] = useState(false)

    useProtect(history)

    const handleLogout = async () => {
        setLoading(true)
        await axios.post(
            '/api/auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
                withCredentials: true,
            }
        )

        setLoading(false)
        location.reload()
    }

    return (
        <CenteredCard>
            <img
                src='https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg'
                alt=''
                style={{ width: '100px', borderRadius: '50px' }}
            />
            <h1>
                {user?.name}
                <IconButton
                    size='small'
                    component={Link}
                    to='/profile/update/name'
                    style={{ fontSize: '10px', color: '#ddd' }}
                >
                    <Edit />
                </IconButton>
            </h1>
            <h3>Email : {user?.email}</h3>
            <ButtonWithLoader
                variant='contained'
                style={{ background: red[500], color: '#fff' }}
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                loading={loading}
            >
                Logout
            </ButtonWithLoader>
        </CenteredCard>
    )
}
