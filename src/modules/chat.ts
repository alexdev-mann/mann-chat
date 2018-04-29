const uuidv1 = require('uuid/v1')
import socket from '../_engine/modules/socket'
import * as constants from '../constants/'
import store from '../store/'
import * as actions from '../actions/'

const chat = {
    create_message( { text, username }: { text: string, username: string } ){
        const id = uuidv1()
        return { text, id, username }
    },
    send_message( { text, username }: { text: string, username: string }){
        return new Promise((resolve: any, reject: any) => {
            const message = chat.create_message({ text, username })
            socket.post({ cmd: constants.SEND_MESSAGE, params: message })
            .then((response: any) => resolve(message))
        })
    },

    register_user(username: string){
        socket.post({ cmd: 'REGISTER_USER', params: { username } })
    },
    
    get_users_list(){
        socket.get({ cmd: 'GET_USER_LIST' })
        .then((result: any) => store.dispatch(actions.set_user_list(result.data||[])))
    }
}

export default chat
