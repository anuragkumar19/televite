import { Reducer } from 'redux'
import { Action } from '../../types'
import { REMOVE_LOADING, SET_LOADING } from '../constants/Loading'

export const loadingReducer: Reducer<boolean, Action> = (
    state = true,
    action
) => {
    switch (action.type) {
        case SET_LOADING:
            return true
        case REMOVE_LOADING:
            return false
        default:
            return state
    }
}
