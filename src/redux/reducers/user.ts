import { Reducer } from 'redux'
import { Action, User } from '../../types'
import { SET_ACCESS_TOKEN, SET_USER, UPDATE_USER_NAME } from '../constants/User'

export const userReducer: Reducer<User | null, Action> = (
    state = null,
    action
) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload } as User
        case SET_USER:
            return action.payload
        case UPDATE_USER_NAME:
            return { ...state, name: action.payload }
        default:
            return state
    }
}
