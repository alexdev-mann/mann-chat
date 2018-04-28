import * as constants from '../constants/'

export interface IAppConfig { type: 'DEVTOOLS_CONFIG', property?: string, value?: any, config?: any }
export type appConfig = IAppConfig;
export function app_config(params: any): appConfig {
	return {
		type: 'APP_CONFIG',
		...params
	}
}

export interface ISendMessage { type: constants.SEND_MESSAGE, id: string, text: string, username: string }
export type sendMessage = ISendMessage;
export function send_message({ id, text, username }: ISendMessage): sendMessage {
	return {
		type: constants.SEND_MESSAGE,
		id,
		text,
		username,
	}
}

export interface IReceiveMessage { type: constants.RECEIVE_MESSAGE, id: string, text: string, username: string }
export type receiveMessage = IReceiveMessage;
export function receive_message( { id, text, username }: IReceiveMessage ): receiveMessage {
	return {
		type: constants.RECEIVE_MESSAGE,
		id,
		text,
		username,
	}
}

export interface ISetUser { type: constants.SET_USER, username: string }
export type setUser = ISetUser;
export function set_user( { username }: { username: string } ): setUser {
	return {
		type: constants.SET_USER,
		username,
	}
}

export interface IClientConnected { type: constants.CLIENT_CONNECTED, username: string }
export type clientConnected = IClientConnected;
export function client_connected( { username }: { username: string } ): clientConnected {
	return {
		type: constants.CLIENT_CONNECTED,
		username,
	}
}

export interface IClientDisconnected { type: constants.CLIENT_DISCONNECTED, username: string }
export type clientDisonnected = IClientDisconnected;
export function client_disconnected( { username }: { username: string } ): clientDisonnected {
	return {
		type: constants.CLIENT_DISCONNECTED,
		username,
	}
}
