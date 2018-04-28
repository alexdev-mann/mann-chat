"use strict"
const config = require("config")
const fs     = require("fs")
const uuidv1 = require('uuid/v1')

/*
 * Helpers
 */

class tools {

	static uniqid(){ return uuidv1() }

	static get_client_ip(socket) {
		let address = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address
		address = socket.handshake.headers['cf-connecting-ip'] || address
		return (socket.handshake && socket.handshake.address) ? this.get_ipv4_part_from_ipv6(address) : null
	}
	// accepts ipv4 or ipv6 as parameter
	static get_ipv4_part_from_ipv6(address) {
		let idx = address.lastIndexOf(':')
		if (~idx && ~address.indexOf('.')) {
			address = address.slice(idx + 1)
		}
		return address
	}

	static get_last_commit_hash(cwd) {
		let commit_hash = require('child_process')
			.execSync('git rev-parse HEAD', {
				"cwd": cwd
			})
			.toString().trim()
		return commit_hash
	}

	static get_conf(var_name, default_value) {
		var value;
		if (config.has(var_name)) {
			value = config.get(var_name)
		} else {
			console.log('/!\\ ' + var_name + ' is not defined in config/config.json')
			if (default_value) {
				console.log('using default value:', default_value)
				value = default_value
			} else {
				console.log('/!\\ no default set!')
			}
		}
		return value
	}

	static check_folders(folder_array){
		folder_array.map((folder) => {
			if (!fs.existsSync(folder)){
				fs.mkdirSync(folder)
			}
		})
	}

	static get_error_obj(message) {
		let error_obj;
		if (typeof message === 'string') {
			error_obj = { timestamp: +new Date(), message }
		} else {
			message.timestamp = +new Date()
			error_obj = message
		}
		return error_obj
	}

}

module.exports = tools
