import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from '../reducers/index'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

const middleware = applyMiddleware(routerMiddleware(history))

const store = createStore(
    rootReducer,
    compose(middleware, window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f)
)

export default store
