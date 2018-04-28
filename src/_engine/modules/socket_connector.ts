import * as io from 'socket.io-client'
// import { SOCKET_RESPONSE } from '../../constants/'
import store from '../../store/'
import * as actions from '../../actions/'
import config from "../../config/"

const __socket = io.connect(config.SOCKET.PROTOCOL + '://' + config.SOCKET.HOST + ':' + config.SOCKET.PORT, { transports: ['websocket'], upgrade: false, secure: true })

__socket.on('message_from_server', (response: any) => {
    // dispatch action
    const action = actions.receive_message(response)
    store.dispatch(action)
})

export default __socket
