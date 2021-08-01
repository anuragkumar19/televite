export interface OtherUser {
    name: string
    uid: number
    profilePicture: string
}

export interface User {
    name: string
    email: string
    profilePicture: string
    uid: number
    sentRequests: OtherUser[]
    pendingRequests: OtherUser[]
    friends: OtherUser[]
    accessToken: string
}

export interface State {
    loading: boolean
    user?: User
}

export interface Action {
    type: string
    payload?: any
}

export type DispatchType = (action: Action) => any
