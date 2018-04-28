import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import Component from '../_engine/components/Component'
import Input from '../_engine/components/Input'
import * as actions from '../actions/'
import * as constants from '../constants/'
import socket from '../_engine/modules/socket'
const uuidv1 = require('uuid/v1')

class ChatBox extends Component<any>{
    filename: 'components/ChatBox.tsx'
    state: any = {}
    form_ref: any = React.createRef()

    static createMessage = (text: string, username: string) => {
        const id = uuidv1()
        return { text, id, username }
    }
    static sendMessage = (text: string, username: string) => {
        return new Promise((resolve: any, reject: any) => {
            console.log('emitting')
            const message = ChatBox.createMessage(text, username)
            socket.post({ cmd: constants.SEND_MESSAGE, params: message })
            .then((response: any) => resolve(message))
        })
    }
    
    onChange = (text: string) => {
        (typeof text !== 'string' && console.error(this.filename+'.onChange(): param must be a string, it is actually', typeof text, text)) 
        this.setState({ text })
    }

    onSubmit = (e: any) => {
        e.preventDefault()
        ChatBox.sendMessage(this.state.text, this.props.user.username)
        .then((message: any) => {
            this.props.dispatch_message(message)
            this.form_ref.current && this.form_ref.current.reset()
        })
    }

    render(){
        return <form ref={this.form_ref} onSubmit={this.onSubmit}>
            <div id="chat-input-group" className="input-group w-100">
                <Input id="chat-input" className="" autoFocus={true} onChange={this.onChange} value={this.state.value} />
                <div className="input-group-append"><button className="btn btn-outline-secondary" type="button">Send</button></div>
            </div>
        </form>
    }
}

export function mapStateToProps({ user }: any) {
    return { user }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        dispatch_message: (message: any) => { dispatch(actions.send_message( message )) },
    };
}

export function mergeProps(stateProps: object, dispatchProps: object, ownProps: object) {
	return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChatBox)
