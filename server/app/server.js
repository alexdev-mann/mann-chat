const config           = require("config")
const compression      = require('compression')
const fs               = require("fs")
const express          = require("express")
const http_app         = express()
const use_ssl_protocol = config.get("SSL.ENABLED")

http_app.use(compression())

let server

// use SSL
if (use_ssl_protocol) {
    // TODO: create certificates and include them here (read from conf)
    let options = {
        cert: '',
        key: '',
        ca: ['']
    };
    server = require('https').createServer(options, http_app)
    console.log('https server created')
    console.log('using ', options.cert, options.key, 'and', options.ca)
} else {
    //use http protocol
    server = require('http').Server(http_app)
    console.log('http server created')
}

module.exports = server
