import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { State } from 'src/types'
import { reducer } from './reducers'

const initialState: State = {
    loading: true,
}

const middleware = [thunk]

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
