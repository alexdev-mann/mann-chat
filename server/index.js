"use strict";
const config             = require("config")
const tools              = require("./app/tools")
const use_ssl_protocol   = config.get("SSL.ENABLED")
const fs                 = require("fs")
const app                = require('./app/index')
const cp                 = require("child_process")
const SERVER_NAME        = config.has("ENV.SERVER_NAME") ? config.get("ENV.SERVER_NAME"): "not set"
let LISTEN_PORT          = config.get("PROXY.LISTEN_PORT")
const SSL_LISTEN_PORT    = config.get("SSL.LISTEN_PORT")
LISTEN_PORT              = use_ssl_protocol ? SSL_LISTEN_PORT: LISTEN_PORT
const WWW_PATH           = tools.get_conf("WWW_PATH", "./site")
const server             = require('./app/server')
const io                 = require('./app/io')

// Checks integrity of the app
// tools.check_folders([  ])

// Create express server (used to communicate with other instances)
server.listen(LISTEN_PORT)

// Socket.io events
/** @var {socket.io} io */
io.on('connection', function (socket) {

    // defining property ipv4 as a getter, socket.ipv4 can be used directly
    Object.defineProperty(socket, 'ipv4', {
        get: function () {
            if (this._ipv4) {
                return this._ipv4;
            } else {
                this._ipv4 = tools.get_client_ip(socket);
            }
            return this._ipv4;
        }
    });

    socket.on('register_user', (req, callback) => {
        req.params && req.params.username && (socket.username = req.params.username)
        console.log(`user registered: ${socket.username}`)
    })

    socket.on('post', (req, callback) => {
        switch(true){
            case (req.cmd === 'SEND_MESSAGE_TO_SERVER'):
                console.log('message received from', socket.ipv4, ':', req.params)
                // check message integrity
                // ((req.params && req.params.text && req.params.id) || console.error('malformed params object on SEND_MESSAGE_TO_SERVER', req))
                socket.broadcast.emit('message_from_server', req.params)
                callback({ success: true, data: req.params })

                break
        }
    })

    socket.on('proxy', (req, callback) => {
        console.log('proxy command triggered', req.params.cmd);
        if (socket.dev_mode) {
            switch (req.params.cmd) {
                case 'open':
                    let file = req.params.file || null;
                    if (file) {
                        cp.exec("open ../src/" + file, function (error, stdout, stderr) { console.error('error opening', file); })
                    }
                    callback({ success: true, id: req.id });
                    break;
            }
        }
    })

    socket.on('disconnect', function() {
        socket.broadcast.emit('disconnected_from_server', socket.username)
        console.log(`[=>] client disconnected (client ipv4: ${socket.ipv4})`)
     })

    socket.emit("welcome", { "host": SERVER_NAME, headers: socket.handshake.headers })
    console.log(`[<=] client connected (client ipv4: ${socket.ipv4})`)
});

console.log('Node.js server running on port', LISTEN_PORT)
