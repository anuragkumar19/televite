export interface OtherUser {
    _id: string
    name: string
    uid: number
    profilePicture: string
}

export interface FriendType {
    room: string
    user: OtherUser
}

export interface User {
    _id: string
    name: string
    email: string
    profilePicture: string
    uid: number
    sentRequests: OtherUser[]
    pendingRequests: OtherUser[]
    friends: FriendType[]
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
