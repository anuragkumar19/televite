import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core'
import { Chat, Person, People } from '@material-ui/icons'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { State } from '../types'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

interface Props {
    position?:
        | 'fixed'
        | 'absolute'
        | 'relative'
        | 'static'
        | 'sticky'
        | undefined
}

export const NavBar: FC<Props> = ({ position = 'fixed' }) => {
    const classes = useStyles()

    const user = useSelector((state: State) => state.user)

    return (
        <AppBar position={position}>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    <Link style={styles.link} to='/'>
                        Televite
                    </Link>
                </Typography>
                {user ? (
                    <>
                        <Button startIcon={<Chat />} color='inherit'>
                            <Link style={styles.link} to='/app'>
                                Chat
                            </Link>
                        </Button>
                        <Button startIcon={<People />} color='inherit'>
                            <Link style={styles.link} to='/app/friends'>
                                Friends
                            </Link>
                        </Button>
                        <Button startIcon={<Person />} color='inherit'>
                            <Link style={styles.link} to='/profile'>
                                {user.name.slice(0, 6)}
                            </Link>
                        </Button>
                    </>
                ) : (
                    <Button startIcon={<Person />} color='inherit'>
                        <Link style={styles.link} to='/login'>
                            login
                        </Link>
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

const styles = {
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
}
