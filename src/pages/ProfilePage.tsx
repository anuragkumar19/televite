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
import { NavBar } from '../components/NavBar'

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
        <>
            <NavBar />
            <CenteredCard>
                <img
                    src={user?.profilePicture}
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
                <h3>UID : {user?.uid}</h3>
                <h4>
                    Public Profile :{' '}
                    <Link
                        to={'/user/' + user?.uid}
                        style={{ color: '#ddd', display: 'block' }}
                    >
                        {location.origin + '/user/' + user?.uid}
                    </Link>
                </h4>
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
        </>
    )
}
