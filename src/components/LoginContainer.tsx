import { connect, Dispatch } from 'react-redux'
import { Login } from './Login'

import * as actions from '../actions/'

export function mapStateToProps({ user }: any) {
    return { user }
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        set_user: (username: any) => { dispatch(actions.set_user( { username } )) },
    };
}

export function mergeProps(stateProps: object, dispatchProps: object, ownProps: object) {
	return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login)
