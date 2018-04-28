import * as React from 'react'
import { Provider } from 'react-redux'
import {  Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import App from './App'

const Root = ({ store, history }: any) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/:filter?" component={App} />
        </ConnectedRouter>
    </Provider>
)

export default Root
