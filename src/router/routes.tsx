import { ComponentType } from 'react'
import { VerifyOtpPage } from '../pages/VerifyOtpPage'
import { LoginPage } from '../pages/LoginPage'
import { ProfilePage } from '../pages/ProfilePage'
import { UpdateNamePage } from '../pages/UpdateNamePage'
import { HomePage } from '../pages/HomePage'
import { UserPublicPage } from '../pages/UserPublicPage'
import { FriendsPage } from '../pages/FriendsPage'
import { ProfilePictureUploadPage } from '../pages/ProfilePictureUploadPage'
import { Redirect } from 'react-router-dom'
import React from 'react'

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
    {
        path: '/user/:uid',
        Component: UserPublicPage,
    },
    {
        path: '/app/friends',
        Component: FriendsPage,
        exact: true,
    },
    {
        path: '/profile/update/profilePicture',
        Component: ProfilePictureUploadPage,
        exact:true
    },
    {
        path: '/app',
        Component: () => <Redirect to='/profile'></Redirect>,
        exact:true
    },
]

export default routes
