import * as React from 'react'

import Login from './LoginContainer'
import Chat from './Chat'
import Route from '../_engine/components/Route'
import { Switch } from 'react-router-dom'
import Component from '../_engine/components/Component'
import Globals from '../_engine/components/Globals'

class App extends Component<any> {
    
    render(){
        return <>
            <Globals render={ (globals: any) =>
                <Switch>
                    <Route path="/" exact globals={globals} component={Login} />
                    <Route path="/chat" exact globals={globals} component={Chat} />
                </Switch>
            } />
        </>
    }
}

export default App
