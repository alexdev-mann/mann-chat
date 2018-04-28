const tools  = require('./tools')

const app = {
    socket: {

        send_error(socket, error){
            if (typeof error === 'string') {
                error = getErrorObj(error)
            }
            socket.emit("error-event", { id: tools.uniqid(), success: true, data: error })
        },

        leave_room({ room_name }){
            return new Promise((roomLeft) => {
                socket.leave(room_name, () => { roomLeft() })
            })
        },

        join_room({ room_name }){
            return new Promise((resolve, reject) => {
                socket.join(room_name, () => {
                    resolve(room_name)
                })
            })
        },

        join_rooms(rooms=[]){
            return new Promise( roomJoined => {
                let promise_array = []
                rooms.map( room => {
                    promise_array.push(app.socket.join_room(room))
                    Promise.all(promise_array).then(() => { roomJoined() })
                })
            })
        },

        get_user_name_array(sockets){
            if(!sockets) return []
            let value = []
            Object.keys(sockets).map((key) => { value.push(sockets[key].username) })
            return value
        }
    }
}

module.exports = app
