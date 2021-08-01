import { combineReducers } from 'redux'
import { loadingReducer } from './loading'
import { userReducer } from './user'

export const reducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
})
