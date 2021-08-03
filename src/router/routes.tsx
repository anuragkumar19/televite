import { ComponentType } from 'react'
import { VerifyOtpPage } from '../pages/VerifyOtpPage'
import { LoginPage } from '../pages/LoginPage'
import { ProfilePage } from '../pages/ProfilePage'
import { UpdateNamePage } from '../pages/UpdateNamePage'
import { HomePage } from '../pages/HomePage'

interface Route {
    path: string
    Component: ComponentType
    exact?: boolean
}

const routes: Route[] = [
    {
        path: '/',
        Component: HomePage,
        exact: true,
    },
    {
        path: '/login',
        Component: LoginPage,
        exact: true,
    },
    {
        path: '/verify-otp',
        Component: VerifyOtpPage,
        exact: true,
    },
    {
        path: '/profile',
        Component: ProfilePage,
        exact: true,
    },
    {
        path: '/profile/update/name',
        Component: UpdateNamePage,
        exact: true,
    },
]

export default routes
