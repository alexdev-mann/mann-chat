import * as React from 'react'

import Login from './LoginContainer'
import Chat from './Chat'
import Route from '../_engine/components/Route'
import { Switch } from 'react-router-dom'
import Component from '../_engine/components/Component'
import Globals from '../_engine/components/Globals'


class App extends Component<any> {
    t:number = 0

    // set background, changes background each time it's called
    setBackground = () => {
        const target = document.querySelector("body")
        target && (target.style.backgroundImage = `url(https://source.unsplash.com/random/1280x1024?t=${this.t++})`)
    }

    componentDidMount(){
        this.setBackground()
    }

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
