import { DispatchType } from '../../types'
import { REMOVE_LOADING, SET_LOADING } from '../constants/Loading'

export const setLoading = () => async (dispatch: DispatchType) => {
    dispatch({
        type: SET_LOADING,
    })
}

export const removeLoading = () => async (dispatch: DispatchType) => {
    dispatch({
        type: REMOVE_LOADING,
    })
}
