import * as React from 'react'
import Component from '../_engine/components/Component'
import { connect, Dispatch } from 'react-redux'
import ChatBox from './ChatBox'
import chat from '../modules/chat'
import SVG from '../_engine/components/SVG'
import config from '../config/app'

export const Message = (props: any) => {
    const { message } = props
    return <li className={`message ${message.local && 'local' || (message.from_server && 'from-server' || 'remote')}`}>
        <div className="message-content">
            <div className="username">{message.username}</div>
            <div className="timestamp">{message.timestamp}</div>
            <div className="text">{message.text}</div>
        </div>
    </li>
}

const messages_container: any = document.querySelector("#root") || {}

const isMessageVisible = (elmt_coords: any) => {
    return (
        elmt_coords.top < messages_container.offsetHeight && 
        elmt_coords.bottom >= -(elmt_coords.height)
    )
}
const getVisibleMessages = () => Array.prototype.slice.call(document.querySelectorAll(".message-list .message")).filter((elmt: any) => isMessageVisible(elmt.getBoundingClientRect()))

const First = (offsetY: number) => { return {
    transformOrigin: 'top left',
    transform: `translateY(${offsetY}px)`,
} }
const Last = {
    transformOrigin: 'top left',
    transform: 'none',
}
const AnimationSettings = {
    duration: config.NEW_MESSAGE_TRANSITION_TIME,
    easing: 'ease-in-out',
    fill: 'both'
}

export class Chat extends Component<any>{
    state:any = {}

    checkScroll = () => {
        if((messages_container.offsetHeight + messages_container.scrollTop) >= messages_container.scrollHeight){
            this.setState({ unread_messages: false })
            messages_container.removeEventListener('scroll', this.checkScroll)
        }
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

    animate = () => {
        const last_message_ref: any = document.querySelector(".message-list .message:last-child")
        if(last_message_ref){
            const last_message_coords = last_message_ref.getBoundingClientRect()
            // We do animate only if last message is in the view
            if(isMessageVisible(last_message_coords)){
                const animate_list: boolean = !!(messages_container.offsetHeight < messages_container.scrollHeight)
                // If the message list fills the window (if there's a scroll), we animate the whole list, otherwise just the last message
                const target: any = animate_list ? getVisibleMessages() : [ last_message_ref ]
                const offsetY = Math.min(last_message_coords.height, (messages_container.scrollHeight - messages_container.offsetHeight)) || last_message_coords.height
                // The last message has a different animation: opacity
                const last = target.pop()
                last.animate && last.animate( [ { ...First(offsetY), opacity: 0 }, { ...Last, opacity: 1 } ], AnimationSettings )
                if(target){
                    target.forEach((item: any) => {
                        if(item && item.animate){
                            item.animate( [ First(offsetY), Last ], AnimationSettings )
                        }
                    })
                }
            }
        }
    }

    componentDidUpdate(prevProps: any, prevState: any, scrollToBottom: boolean){
        const thisLastMessage = !this.props.message_stack ? null : (this.props.message_stack && this.props.message_stack.length && this.props.message_stack[this.props.message_stack.length-1]|| null)
        // Has a new message just been added?
        const new_message = !!(prevProps.message_stack.length !== this.props.message_stack.length)
        if(new_message){
            const lastMessageIsMine = () => thisLastMessage.username === this.props.user.username
            this.animate()
            if(lastMessageIsMine() || scrollToBottom){
                messages_container.scrollTo(0, messages_container.scrollHeight)
            } else {
                this.setState({ unread_messages: true }, () => { messages_container.addEventListener('scroll', this.checkScroll) })
            }
        }
    }

    render(){
        return <>
            <div id="chat-view-container">
                <div className="container">
                    <div className="row">
                        <ul className="col-10 offset-1 message-list">
                            {this.props.message_stack && this.props.message_stack.map((message: any) => <Message message={message} key={message.id} />)}
                        </ul>
                    </div>
                </div>
            </div>
            {this.props.user_list && this.props.user_list.length && 
                <ul className="list-unstyled user-list">
                    {this.props.user_list.map((username: string, i: number) => <li key={`${username}_${i}`} className={"user user-"+(username===this.props.user.username ? 'local' : 'remote')+" d-block badge"}>{(username||'Anonymous')}</li>)}
                </ul>
            }
            {this.state.unread_messages && <div id="new-messages"><SVG className="new-messages-icon" src="images/message.svg" alt="Message" /> New messages!</div>}
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
