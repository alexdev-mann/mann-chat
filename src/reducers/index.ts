import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const rootReducer = combineReducers({
    test_reducer,
    app_config,
    router: routerReducer,
});

export function test_reducer(state: any, action: any) {
	// let new_state
	// let modal_state
	// switch (action.type) {
	// 	case constants.CREATE_MODAL:
	// 		modal_state = cloneDeep(state || [])
	// 		modal_state.push(action.payload)
	// 		new_state = modal_state
	// 		break;
	// 	case constants.DELETE_MODAL:
	// 		modal_state = cloneDeep(state || [])
	// 		modal_state = modal_state.filter((modal: any) => modal.id !== action.id)
	// 		new_state = modal_state
	// 		break;
	// 	default:
	// 		new_state = state || []
	// 		break;
	// }
	return state || {}
}

export function app_config(state: any, action: any) {
	let new_state;
	let state_clone;
	switch (action.type) {
		case "APP_CONFIG":
			state_clone = Object.assign({}, state)
			state_clone = state_clone || {};
			if (action.property) {
				state_clone[action.property] = action.value;
			}
			if (action.config && Object.keys(action.config).length) {
				state_clone = action.config;
			}
			new_state = { ...state, ...state_clone };
			// localStorage.setItem('app_config', JSON.stringify(new_state.config));
			break;
		default:
			new_state = state || {};
			break;
	}
	return new_state;
}
