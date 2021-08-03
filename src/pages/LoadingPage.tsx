import { Box } from '@material-ui/core'
import React, { FC } from 'react'
import Logo from '../favicon.svg'

export const LoadingPage: FC = () => {
    return (
        <Box
            height='100vh'
            width='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
        >
            <img src={Logo} alt='' style={{ width: '100px' }} />
            <h1>Loading...</h1>
        </Box>
    )
}
