import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import date from '../modules/date'
import * as constants from '../constants/'

export const rootReducer = combineReducers({
	user,
    message_stack,
    app_config,
    router: routerReducer,
})

export function user(state: any, action: any){
	let new_state
	switch (action.type) {
		case constants.SET_USER:
			// scoping to allow var declarations
			{
				// shallow copy of the object
				let state_user = { ...state }
				state_user.username = action.username

				new_state = state_user
				localStorage.setItem('user', JSON.stringify(state_user))
			}
			break
		default:
			// defaults to empty array
			if(!state){
				const default_user = localStorage.getItem('user')
				new_state = default_user && JSON.parse(default_user) || {}
			} else {
				new_state = state
			}
			break
	}
	return new_state
}

export function message_stack(state: any, action: any){
	let new_state
	switch (action.type) {
		case constants.SEND_MESSAGE:
			// scoping to allow var declarations
			{
				// shallow copy of the array
				let stack = [ ...state ]
				console.log('action', action)
				// creating message, taking off type from the action object
				let { type, ...message } = action
				message.local = 1
				message.timestamp = message.timestamp || date.format('now', 'timestamp')

				stack.push(message)
				new_state = stack
			}
			break
		case constants.RECEIVE_MESSAGE:
			// scoping to allow var declarations
			{
				// shallow copy of the array
				let stack = [ ...state ]

				// creating message, taking off type from the action object
				let { type, ...message } = action
				message.local = 0
				message.timestamp = message.timestamp || date.format('now', 'timestamp')

				stack.push(message)
				new_state = stack
			}
			break
		default:
			// defaults to empty array
			new_state = state || []
			break
	}
	return new_state
}

export function app_config(state: any, action: any) {
	let new_state;
	let state_clone;
	switch (action.type) {
		case constants.APP_CONFIG:
			state_clone = Object.assign({}, state)
			state_clone = state_clone || {}
			if (action.property) {
				state_clone[action.property] = action.value
			}
			if (action.config && Object.keys(action.config).length) {
				state_clone = action.config
			}
			new_state = { ...state, ...state_clone }
			// localStorage.setItem('app_config', JSON.stringify(new_state.config))
			break;
		default:
			new_state = state || {}
			break;
	}
	return new_state
}
