import { Box, Card, CardContent } from '@material-ui/core'
import React, { FC } from 'react'
import Logo from '../favicon.svg'

interface Props {
    logo: boolean
}

export const CenteredCard: FC<Props> = ({ children, logo }) => {
    return (
        <Box
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card style={{ maxWidth: '500px', margin: 'auto', width: '100%' }}>
                <CardContent style={{ textAlign: 'center', padding: '2rem' }}>
                    {logo && (
                        <img src={Logo} alt='' style={{ width: '100px' }} />
                    )}
                    {children}
                </CardContent>
            </Card>
        </Box>
    )
}
