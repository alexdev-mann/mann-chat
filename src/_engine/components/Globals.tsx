import * as React from 'react'
import { getSocketData } from './getSocketData'

export const GlobalsContext = React.createContext({})

export class GlobalsProvider extends React.Component<any>{
    
    render(): any{
        return <GlobalsContext.Provider value={(this.props.globals || {})}>{this.props.children}</GlobalsContext.Provider>
    }
}
export class Globals extends React.Component<any>{
    render(){
        const globals = (this.props.socket_data && this.props.socket_data.GLOBALS || {})
        const content = this.props.render && typeof this.props.render === 'function' && this.props.render(globals) || null
        return <GlobalsProvider globals={globals}>{content}</GlobalsProvider>
    }
}

export default getSocketData('GLOBALS')(Globals)
