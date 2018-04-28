import * as React from 'react'

import Login from './Login'
import Chat from './Chat'
import Route from '../_engine/components/Route'
import { Switch } from 'react-router-dom'
import Component from '../_engine/components/Component'

class App extends Component<any> {
    
    render(){
        return <>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/chat" exact component={Chat} />
            </Switch>
        </>
    }
}

export default App
