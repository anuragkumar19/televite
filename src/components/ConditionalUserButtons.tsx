import axios from 'axios'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/actions/user'
import { OtherUser, State } from '../types'
import {
    AcceptRequestButton,
    CancleSendRequestButton,
    RejectRequestButton,
    SendRequestButton,
    UnfriendButton,
} from './UserButtons'

interface Props {
    user?: OtherUser
}

export const ConditionalButtons: FC<Props> = ({ user }) => {
    const currUser = useSelector((state: State) => state.user)

    const dispatch = useDispatch()

    const refreshUser = async () => {
        const { data: userData } = await axios.get('/api/user/me', {
            headers: {
                Authorization: `Bearer ${currUser?.accessToken}`,
            },
        })

        dispatch(setUser({ ...currUser, ...userData }))
    }

    const sendOrAcceptRequest = async () => {
        try {
            const { data } = await axios.post(
                '/api/user/request',
                { uid: user?.uid },
                {
                    headers: {
                        Authorization: `Bearer ${currUser?.accessToken}`,
                    },
                }
            )

            await refreshUser()

            alert(data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const cancelOrRejectRequestOrUnfriendUser = async () => {
        try {
            const { data } = await axios.delete('/api/user/request', {
                headers: {
                    Authorization: `Bearer ${currUser?.accessToken}`,
                },
                data: {
                    uid: user?.uid,
                },
            })

            await refreshUser()

            alert(data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    if (
        currUser?.friends.findIndex(
            (friend) => friend.user._id === user?._id
        ) !== -1
    ) {
        return <UnfriendButton onClick={cancelOrRejectRequestOrUnfriendUser} />
    }

    if (currUser?.sentRequests.findIndex((u) => u._id === user?._id) !== -1) {
        return (
            <CancleSendRequestButton
                onClick={cancelOrRejectRequestOrUnfriendUser}
            />
        )
    }

    if (
        currUser!.pendingRequests.findIndex((u) => u._id === user?._id) !== -1
    ) {
        return (
            <>
                <AcceptRequestButton onClick={sendOrAcceptRequest} />
                <RejectRequestButton
                    onClick={cancelOrRejectRequestOrUnfriendUser}
                />
            </>
        )
    }

    return <SendRequestButton onClick={sendOrAcceptRequest} />
}
