import { DispatchType, User } from '../../types'
import { SET_ACCESS_TOKEN, SET_USER, UPDATE_USER_NAME } from '../constants/User'

export const setAccessToken =
    (accessToken: string) => (dispatch: DispatchType) => {
        dispatch({
            type: SET_ACCESS_TOKEN,
            payload: accessToken,
        })
    }

export const setUser = (user: User) => (dispatch: DispatchType) => {
    dispatch({
        type: SET_USER,
        payload: user,
    })
}

export const updateName = (name: string) => (dispatch: DispatchType) => {
    dispatch({
        type: UPDATE_USER_NAME,
        payload: name,
    })
}
