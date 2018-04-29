import * as React from 'react'
import socket from '../../_engine/modules/socket'

export function getSocketData(cmd_param: string | object){
    let cmd: any = typeof cmd_param === 'string' ? { cmd: cmd_param } : cmd_param
    return function<P>(Comp: React.ComponentClass<P> | React.StatelessComponent<P>){
        return class DataFromServer extends React.Component<any>{
            state: any = {}

            componentDidMount(){
                socket.get(cmd)
                .then((response: any) => this.setState({ socket_data: {  ...this.state.socket_data, [cmd.cmd]: response.data } }))
            }
            
            render(){
                let props = { ...this.props, socket_data: this.state.socket_data }
                return <Comp {...props} />
            }
        }
    }
}