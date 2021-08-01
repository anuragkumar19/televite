import { DispatchType, User } from '../../types'
import { SET_ACCESS_TOKEN, SET_USER } from '../constants/User'

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
