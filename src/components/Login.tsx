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
    state: any = {}

    static getDerivedStateFromProps(nextProps: any, prevState: any){
        if(nextProps.user && nextProps.user.username && !prevState.input_value_username){
            return { input_value_username: nextProps.user.username }
        }
        return null
    }

    onChange = ({ name, value }: { name: string, value: string }) => {
        this.setState({ [`input_value_${name}`]: value }, () => this.checkFormValidity())
    }
    onUsernameChange = (params: any) => this.onChange(params)

    // TODO: create a real <Form /> component and move that into it, validate using lc-form-validation for example
    checkFormValidity(field_name: string|null = null){
        // a real form validation could be asyncronous, hence the Promise
        return new Promise( (resolve) => {
            const state_clone = { ...this.state }
            let errors = false
            let map_array = form_definition
            if(field_name){
                let field_match = form_definition.find((item: any) => item.name===field_name)
                if(field_match){
                    map_array = [ field_match ]
                }
            }
            map_array.map( (item: any) => {
                if(!item.name){ console.error('checkFormValidity error', (field_name && `Cannot find ${field_name} in`), form_definition) }
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
        const { user } = this.props
        return <div id="login-container" className="container">
            <div className="row align-items-center">
                <div className="col-md-6 offset-md-3">
                    <SVG src="images/logo.svg" alt="Mann chat" id="logo" />
                    <form onSubmit={this.onSubmit} className="pb-10">
                        <Input id="username-input-text" name="username" className="form-control" autoFocus={true} onChange={this.onUsernameChange} containerClassName="chat-input-group" defaultValue={user.username} placeholder="Enter your username" error={this.state.input_error_username} append={<button className="btn btn-primary" type="button" onClick={this.onSubmit}>Chat now!</button>} />
                    </form>
                </div>
            </div>
        </div>
    }
}
