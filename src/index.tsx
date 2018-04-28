import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'bootstrap'
import './scss/styles.scss'

import Root from './components/Root'
import store, { history } from './store'

ReactDOM.render( <Root store={store} history={history} />, document.getElementById('root') as HTMLElement)
