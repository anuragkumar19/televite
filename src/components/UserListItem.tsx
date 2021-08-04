import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { OtherUser } from 'src/types'
import { ConditionalButtons } from './ConditionalUserButtons'

interface Props {
    user: OtherUser
}

export const UserListItem: FC<Props> = ({ user }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={user.profilePicture}></Avatar>
            </ListItemAvatar>
            <Link to={`/user/${user.uid}`} style={{ color: '#fff' }}>
                <ListItemText primary={user.name} />
            </Link>
            <ListItemSecondaryAction>
                <ConditionalButtons user={user} />
            </ListItemSecondaryAction>
        </ListItem>
    )
}
