import * as React from 'react'
import Component from '../_engine/components/Component'
import { connect, Dispatch } from 'react-redux'
import ChatBox from './ChatBox'
import socket from '../_engine/modules/socket'

const display_message = (message: any) => {
    return <div className={`message ${message.local && 'local' || 'remote'}`} key={message.id}>
        <div className="message-content">
            <div className="timestamp">{message.id}</div>
            <div className="username">{message.username}</div>
            <div className="timestamp">{message.timestamp}</div>
            <div className="text">{message.text}</div>
        </div>
    </div>
}

// Passed this as param because of Typescript
export const checkScroll = function(this: any) {
    if((window.innerHeight + window.pageYOffset) === document.body.scrollHeight){
        this.setState({ new_messages: false })
        document.removeEventListener('scroll', this.checkScrollRef)
    }
}

class Chat extends Component<any>{
    state:any = {}
    checkScrollRef: any

    static registerUser = (username: string) => {
        socket.emit({ cmd: 'register_user', params: { username } })
    }

    constructor(props: any){
        super(props)
        this.checkScrollRef = checkScroll.bind(this)
    }

    checkScroll = function(this: any) {
        if((window.innerHeight + window.pageYOffset) === document.body.scrollHeight){
            console.log('bingo')
            this.setState({ new_messages: false })
            document.removeEventListener('scroll', checkScroll)
        }
    }

    componentDidMount(){
        Chat.registerUser(this.props.user.username)
    }

    getSnapshotBeforeUpdate(prevProps:any, prevState:any) {
        // Check if the scroll is at the bottom
        let scroll_to_bottom = false
        if((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight){
            scroll_to_bottom = true
        }
        return scroll_to_bottom
      }

    componentDidUpdate(prevProps: any, prevState: any, scrollToBottom: boolean){
        const prevLastMessage = !prevProps.message_stack ? null : (prevProps.message_stack && prevProps.message_stack.length && prevProps.message_stack[prevProps.message_stack.length-1] || null)
        const thisLastMessage = !this.props.message_stack ? null : (this.props.message_stack && this.props.message_stack.length && this.props.message_stack[this.props.message_stack.length-1]|| null)
        console.log(thisLastMessage.username, this.props.user.username)
        const lastMessageIsMine = () => thisLastMessage.username === this.props.user.username
        if(!prevLastMessage && thisLastMessage || prevLastMessage.id !== thisLastMessage.id){
            if(lastMessageIsMine() || scrollToBottom){
                window.scrollTo(0, document.body.scrollHeight)
            } else {
                this.setState({ new_messages: true }, () => document.addEventListener('scroll', this.checkScrollRef))
            }
        }
    }

    render(){
        return <>
            {this.state.new_messages && <div id="new-messages-icon">NEW MESSAGES!</div>}
            <div id="chat-view-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.props.message_stack && this.props.message_stack.map(display_message)}
                        </div>
                    </div>
                </div>
            </div>
            <div id="chat-input-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <ChatBox />
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export function mapStateToProps({ user, message_stack }: any) {
    return {
        user,
        message_stack
    }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        
    }
}

export function mergeProps(stateProps: object, dispatchProps: object, ownProps: object) {
	return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chat)
