import React, { FC } from 'react'
import routes from './routes'
import { Route } from 'react-router-dom'

export const RouterOutlet: FC = () => {
    return (
        <>
            {routes.map((route) => (
                <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.Component}
                    key={route.path}
                />
            ))}
        </>
    )
}
