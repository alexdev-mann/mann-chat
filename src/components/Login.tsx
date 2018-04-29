import * as React from 'react'

import Component from '../_engine/components/Component'
import Input from '../_engine/components/Input'
import SVG from '../_engine/components/SVG'

/**
 * Small form definition structure, should be abstracted in a <Form /> component
 */
const form_definition = [
    { name: 'username', error_message: 'You must enter a username!', condition: (value: string) => !!value.length }
]

 /**
  * No real login for the moment, just taking username
  */
export class Login extends Component<any>{
    filename: string = 'components/Login.tsx'

    constructor(props: any){
        super(props)
        let state: any = {}
        // manual init because no real <Form /> component yet, no need for constructor otherwise
        if(this.props.user && this.props.user.username){
            state.input_value_username = this.props.user.username
        }
        this.state = state
    }
    
    onUsernameChange = (input_value_username: string) => {
        this.setState({ input_value_username }, () => this.checkFormValidity())
    }

    // TODO: create a real <Form /> component and move that into it, validate using lc-form-validation for example
    checkFormValidity(){
        // a real form validation could be asyncronous, hence the Promise
        return new Promise( (resolve) => {
            const state_clone = { ...this.state }
            let errors = false
            form_definition.map( (item: any) => {
                const { name, error_message, condition } = item
                if(!condition(this.state[`input_value_${name}`]||'')){
                    state_clone[`input_error_${name}`] = error_message
                    errors = true
                } else {
                    state_clone[`input_error_${name}`] = null
                }
            })
            this.setState(state_clone, () => resolve(!errors))
        })
    }

    onSubmit = (e: any) => {
        e.preventDefault()

        const next = () => {
            this.props.set_user(this.state.input_value_username)
            this.props.history && this.props.history.push('/chat')
        }

        this.checkFormValidity()
        .then( passed => passed && next())
    }

    render(){
        return <div id="login-container" className="container">
            <div className="row align-items-center">
                <div className="col-md-6 offset-md-3">
                    <SVG src="images/logo.svg" alt="Mann chat" id="logo" />
                    <form onSubmit={this.onSubmit} className="pb-10">
                        <Input id="username-input-text" className="form-control" autoFocus={true} onChange={this.onUsernameChange} containerClassName="chat-input-group" defaultValue={this.props.user && this.props.user.username} placeholder="Enter your username" error={this.state.input_error_username} append={<button className="btn btn-primary" type="button" onClick={this.onSubmit}>Chat now!</button>} />
                    </form>
                </div>
            </div>
        </div>
    }
}
