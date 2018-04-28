import * as React from 'react'

class Input extends React.Component<any, any>{
    chat_input_ref: any = React.createRef()

    componentDiMount(){
        this.props.autoFocus && this.chat_input_ref.current.focus()
    }

    onChange = (e: any) => {
        const value = e.target.value
        this.props.onChange && typeof this.props.onChange==='function' && this.props.onChange(value)
    }

    render(){
        let { append, prepend, onChange, className, error, ...props } = this.props
        let error_tag = null
        append = append ? <div className="input-group-append">{append}</div> : null
        prepend = prepend ? <div className="input-group-prepend">{prepend}</div> : null
        if(error){
            error_tag = <div className="invalid-feedback">{error}</div>
            className = className && 'is-invalid ' + className || 'is-invalid'
        }
        className = className && 'form-control ' + className || 'form-control'
        let input = <input {...props} className={className} value={this.props.value} ref={this.chat_input_ref} onChange={this.onChange} />

        input = prepend || append ? <div className="input-group">{prepend}{input}{append}{error_tag}</div> : <>{input}{error_tag}</>
        return <>{input}</>
    }
}

export default Input
