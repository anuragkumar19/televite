import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core'
import { Chat, Person } from '@material-ui/icons'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'src/types'

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
    user?: User
}

export const NavBar: FC<Props> = ({ user }) => {
    const classes = useStyles()

    return (
        <AppBar position='fixed'>
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
