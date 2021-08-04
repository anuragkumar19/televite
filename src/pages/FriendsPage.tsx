import {
    AppBar,
    makeStyles,
    Tab,
    Box,
    Tabs,
    Theme,
    useTheme,
} from '@material-ui/core'
import React, { FC } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useProtect } from '../hooks/useProtect'
import { NavBar } from '../components/NavBar'
import { TabPanel } from '../components/TabPanel'
import { useSelector } from 'react-redux'
import { State } from '../types'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
}))

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}

export const FriendsPage: FC<any> = ({ history }) => {
    useProtect(history)

    const user = useSelector((state: State) => state.user)

    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const handleChangeIndex = (index: number) => {
        setValue(index)
    }

    return (
        <>
            <NavBar />
            <Box p={6} />
            <div className={classes.root}>
                <AppBar position='static' color='default'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='secondary'
                        textColor='secondary'
                        variant='fullWidth'
                        aria-label='friennds List'
                    >
                        <Tab label='Friend Requests' {...a11yProps(0)} />
                        <Tab label='Sent Requests' {...a11yProps(1)} />
                        <Tab label='Friends' {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        {user?.pendingRequests.map((req) => (
                            <p key={req._id}>{req.name}</p>
                        ))}
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        {user?.sentRequests.map((req) => (
                            <p key={req._id}>{req.name}</p>
                        ))}
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        {user?.friends.map((req) => (
                            <p key={req.user._id}>{req.user.name}</p>
                        ))}
                    </TabPanel>
                </SwipeableViews>
            </div>
        </>
    )
}
