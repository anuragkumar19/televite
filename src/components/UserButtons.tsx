import { Tooltip, Button } from '@material-ui/core'
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
            <Button
                color='secondary'
                aria-label='send request'
                {...prop}
                startIcon={<PersonAdd />}
            >
                Send Request
            </Button>
        </Tooltip>
    )
}

export const UnfriendButton: FC<any> = ({ ...prop }) => {
    return (
        <Tooltip title='Unfriend'>
            <Button
                aria-label='unfriend'
                style={{ color: red[500] }}
                {...prop}
                startIcon={<RemoveCircle />}
            >
                Unfriend
            </Button>
        </Tooltip>
    )
}

export const AcceptRequestButton: FC<any> = ({ ...prop }) => {
    return (
        <Tooltip title='Accept request'>
            <Button
                aria-label='accept request'
                color='secondary'
                {...prop}
                startIcon={<Done />}
            >
                Accept
            </Button>
        </Tooltip>
    )
}

export const RejectRequestButton: FC<any> = ({ ...prop }) => {
    return (
        <Tooltip title='Reject Request'>
            <Button
                aria-label='reject request'
                style={{ color: red[500] }}
                {...prop}
                startIcon={<Close />}
            >
                Reject
            </Button>
        </Tooltip>
    )
}

export const CancleSendRequestButton: FC<any> = ({ ...prop }) => {
    return (
        <div>
            <Tooltip title='Cancel Sent Request'>
                <Button
                    style={{ color: red[500] }}
                    aria-label='cancel send request'
                    {...prop}
                    startIcon={<Cancel />}
                >
                    Cancel
                </Button>
            </Tooltip>
        </div>
    )
}
