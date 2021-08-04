import { Tooltip, IconButton } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import {
    PersonAdd,
    RemoveCircle,
    Done,
    Close,
    Cancel,
} from '@material-ui/icons'
import React, { FC } from 'react'

export const SendRequestButton: FC<any> = ({ ...prop }) => {
    return (
        <Tooltip title='Send request'>
            <IconButton color='secondary' aria-label='send request' {...prop}>
                <PersonAdd />
            </IconButton>
        </Tooltip>
    )
}

export const UnfriendButton: FC<any> = ({ ...prop }) => {
    return (
        <Tooltip title='Unfriend'>
            <IconButton
                aria-label='unfriend'
                style={{ color: red[500] }}
                {...prop}
            >
                <RemoveCircle />
            </IconButton>
        </Tooltip>
    )
}

export const AcceptRequestButton: FC<any> = ({ ...prop }) => {
    return (
        <Tooltip title='Accept request'>
            <IconButton aria-label='accept request' color='secondary' {...prop}>
                <Done />
            </IconButton>
        </Tooltip>
    )
}

export const RejectRequestButton: FC<any> = ({ ...prop }) => {
    return (
        <Tooltip title='Reject Request'>
            <IconButton
                aria-label='reject request'
                style={{ color: red[500] }}
                {...prop}
            >
                <Close />
            </IconButton>
        </Tooltip>
    )
}

export const CancleSendRequestButton: FC<any> = ({ ...prop }) => {
    return (
        <div>
            <Tooltip title='Cancel Sent Request'>
                <IconButton
                    style={{ color: red[500] }}
                    aria-label='cancel send request'
                    {...prop}
                >
                    <Cancel />
                </IconButton>
            </Tooltip>
        </div>
    )
}
