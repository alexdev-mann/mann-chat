import * as React from 'react'
import Component from '../_engine/components/Component'
import { connect, Dispatch } from 'react-redux'
import ChatBox from './ChatBox'
import socket from '../_engine/modules/socket'
import store from '../store/'
import * as actions from '../actions/'

export const Message = (props: any) => {
    const { message } = props
    return <div className={`message ${message.local && 'local' || (message.from_server && 'from-server' || 'remote')}`}>
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

export class Chat extends Component<any>{
    state:any = {}
    checkScrollRef: any

    static registerUser = (username: string) => {
        socket.post({ cmd: 'REGISTER_USER', params: { username } })
    }
    
    static getUsersList = () => {
        socket.get({ cmd: 'GET_USER_LIST' })
        .then((result: any) => store.dispatch(actions.set_user_list(result.data||[])))
    }

    constructor(props: any){
        super(props)
        this.checkScrollRef = checkScroll.bind(this)
    }

    checkScroll = function(this: any) {
        if((window.innerHeight + window.pageYOffset) === document.body.scrollHeight){
            this.setState({ new_messages: false })
            document.removeEventListener('scroll', checkScroll)
        }
    }

    componentDidMount(){
        Chat.registerUser(this.props.user.username)
        Chat.getUsersList()
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
        
        if((!prevLastMessage && thisLastMessage) || prevLastMessage && prevLastMessage.id !== thisLastMessage.id){
            const lastMessageIsMine = () => thisLastMessage.username === this.props.user.username
            if(lastMessageIsMine() || scrollToBottom){
                window.scrollTo(0, document.body.scrollHeight)
            } else {
                this.setState({ new_messages: true }, () => document.addEventListener('scroll', this.checkScrollRef))
            }
        }
    }

    render(){
        return <>
            <div id="chat-view-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {this.props.message_stack && this.props.message_stack.map((message: any) => <Message message={message} key={message.id} />)}
                        </div>
                    </div>
                </div>
            </div>
            {this.props.user_list && this.props.user_list.length && 
                <ul className="list-unstyled user-list">
                    {this.props.user_list.map((username: string, i: number) => <li key={`${username}_${i}`} className="user d-block badge badge-primary">{username}</li>)}
                </ul>
            }
            {this.state.new_messages && <div id="new-messages-icon"><div className="alert alert-primary" role="alert">NEW MESSAGES!</div></div>}
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

export function mapStateToProps({ user, user_list, message_stack }: any) {
    return {
        user,
        user_list,
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
