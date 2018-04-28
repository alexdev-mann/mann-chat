const server = require('./server')

io = require('socket.io')(server)

module.exports = io
