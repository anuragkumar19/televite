import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CenteredCard } from '../components/CenteredCard'
import { OtherUser, State } from 'src/types'
import { useProtect } from '../hooks/useProtect'
import { Divider, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { ConditionalButtons } from '../components/ConditionalUserButtons'

export const UserPublicPage: FC<any> = ({ match, history }) => {
    const user = useSelector((state: State) => state.user)

    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<OtherUser>()

    const isUsersProfile = user?.uid === profile?.uid

    useProtect(history)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(
                    `/api/user/profile/${match.params.uid}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.accessToken}`,
                        },
                    }
                )

                setProfile(data)
            } catch (err) {
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    return (
        <CenteredCard>
            {!loading && !profile ? (
                <h1>Not Found</h1>
            ) : (
                <>
                    <img
                        src={profile?.profilePicture}
                        alt=''
                        style={{ width: '100px', borderRadius: '50px' }}
                    />
                    <Divider />
                    <h1>{user?.name}</h1>
                    {!isUsersProfile && (
                        <div>
                            <ConditionalButtons user={profile!} />
                        </div>
                    )}

                    <h3>UID : {user?.uid}</h3>

                    <Typography style={{ fontSize: '12px' }} color='error'>
                        {isUsersProfile && (
                            <>
                                It's Your public profile
                                <Link
                                    to='/profile'
                                    style={{ color: '#ddd', marginLeft: '5px' }}
                                >
                                    Go to Profile
                                </Link>
                            </>
                        )}
                    </Typography>
                </>
            )}
        </CenteredCard>
    )
}
