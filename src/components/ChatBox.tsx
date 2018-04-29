import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import Component from '../_engine/components/Component'
import Input from '../_engine/components/Input'
import * as actions from '../actions/'
import chat from '../modules/chat'

class ChatBox extends Component<any>{
    filename: 'components/ChatBox.tsx'
    state: any = {}
    form_ref: any = React.createRef()
    
    onChange = (text: string) => {
        (typeof text !== 'string' && console.error(this.filename+'.onChange(): param must be a string, it is actually', typeof text, text))
        this.setState({ text })
    }

    onSubmit = (e: any) => {
        e.preventDefault()
        this.state.text && chat.send_message({ text: this.state.text, username: this.props.user.username })
        .then((message: any) => {
            this.props.dispatch_message(message)
            this.form_ref.current && this.form_ref.current.reset()
        })
    }
    
    onReset = (e: any) => {
        this.setState({ text: null })
    }

    render(){
        return <form ref={this.form_ref} onSubmit={this.onSubmit} onReset={this.onReset}>
            <div id="chat-input-group" className="input-group chat-input-group w-100">
                <Input id="chat-input" autoFocus={true} onChange={this.onChange} value={this.state.value} />
                <div className="input-group-append"><button className="btn btn-outline-secondary" type="button" onClick={this.onSubmit}>Send</button></div>
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
