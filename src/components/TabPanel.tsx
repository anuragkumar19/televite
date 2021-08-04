import { Box } from '@material-ui/core'
import React, { FC } from 'react'

interface TabPanelProps {
    children?: React.ReactNode
    dir?: string
    index: any
    value: any
}

export const TabPanel: FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    )
}
