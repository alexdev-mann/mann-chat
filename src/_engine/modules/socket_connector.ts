import * as io from 'socket.io-client'
import * as constants from '../../constants/'
import store from '../../store/'
import * as actions from '../../actions/'
import config from "../../config/"
const uuidv1 = require('uuid/v1')
import { Chat } from '../../components/Chat'

const __socket = io.connect(config.SOCKET.PROTOCOL + '://' + config.SOCKET.HOST + ':' + config.SOCKET.PORT, { transports: ['websocket'], upgrade: false, secure: true })

__socket.on('message_from_server', (response: any) => {
    // dispatch action
    const action = actions.receive_message(response)
    store.dispatch(action)
})

__socket.on('client_connected', (response: string) => {
    // dispatch action
    const action = actions.receive_message({ type: constants.RECEIVE_MESSAGE, text: (response||'Anonymous') + ' joined', username: response, id: uuidv1(), from_server: true })
    store.dispatch(action)
    Chat.getUsersList()
    // console.log('client connected', response)

})

__socket.on('client_disconnected', (response: any) => {
    // dispatch action
    const action = actions.receive_message({ type: constants.RECEIVE_MESSAGE, text: (response||'Anonymous') + ' left', username: response, id: uuidv1() , from_server: true})
    store.dispatch(action)
    Chat.getUsersList()
    // console.log('client disconnected', response)
})

export default __socket
