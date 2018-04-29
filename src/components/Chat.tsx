import * as React from 'react'
import Component from '../_engine/components/Component'
import { connect, Dispatch } from 'react-redux'
import ChatBox from './ChatBox'
import chat from '../modules/chat'

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

const messages_container: any = document.querySelector("#root") || {}

// Passed this as param because of Typescript
export const checkScroll = function(this: any) {
    if((messages_container.offsetHeight + messages_container.scrollTop) >= messages_container.scrollHeight){
        this.setState({ new_messages: false })
        messages_container.removeEventListener('scroll', this.checkScrollRef)
    }
}

export class Chat extends Component<any>{
    state:any = {}
    checkScrollRef: any

    constructor(props: any){
        super(props)
        this.checkScrollRef = checkScroll.bind(this)
    }

    componentDidMount(){
        chat.register_user(this.props.user.username)
        chat.get_users_list()
    }

    getSnapshotBeforeUpdate(prevProps:any, prevState:any) {
        // Check if the scroll is at the bottom
        let scroll_to_bottom = false
        if((messages_container.offsetHeight + messages_container.scrollTop) >= messages_container.scrollHeight){
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
                messages_container.scrollTo(0, messages_container.scrollHeight)
            } else {
                this.setState({ new_messages: true }, () => messages_container.addEventListener('scroll', this.checkScrollRef))
            }
        }
    }

    render(){
        return <>
            <div id="chat-view-container">
                <div className="container">
                    <div className="row">
                        <div className="col-10 offset-1">
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
                        <div className="col-10 offset-1">
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
