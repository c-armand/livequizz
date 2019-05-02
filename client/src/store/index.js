import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers'
import setupSocket from '../sockets'
import rootSaga from '../sagas'

const initialState = {}
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, thunk]

/* const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer) */

const composeEhnancers = [applyMiddleware(...middleware)]
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
if (reduxDevTools) {
  composeEhnancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
}

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    ...composeEhnancers
  )
)

// export const persistor = persistStore(store)

const socket = setupSocket(store.dispatch)
sagaMiddleware.run(rootSaga, { socket })