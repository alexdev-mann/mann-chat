import * as React from 'react'

export default class SVG extends React.Component<any, any>{

    constructor(props: any){
        super(props)
        let src = this.props.src ? this.props.src : (this.props.children ? this.props.children.toString() : null)
        if(!src){
            console.error('SVG component: src not set', this.props)
            throw('SVG component: src not set')
        } else {
            const file = require('../../' + src)
            const { children, ...rest } = this.props
            let local_props = { src, ...rest }
            const html = () => {
                return { __html: file };
            }
            this.render = () => <div {...local_props} dangerouslySetInnerHTML={html()} />
        }
    }
    
    render(): null|JSX.Element{
        return null
    }
}
