import { Button, CircularProgress, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'

const useStyle = makeStyles((theme: Theme) => ({
    buttonProgress: {
        color: 'primaty',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

export const ButtonWithLoader: FC<any> = ({
    loading,
    disabled,
    children,
    ...props
}) => {
    const classes = useStyle()

    return (
        <Button {...props} disabled={loading || disabled}>
            {loading && (
                <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                />
            )}
            {children}
        </Button>
    )
}
