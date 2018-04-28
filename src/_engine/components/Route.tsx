import * as React from 'react'
import Component from './Component'
import { Route as ReactRoute } from 'react-router-dom'

/**
 * Used to be able to add props to component matching routes (not possible with default Route component)
 */
class Route extends Component<any>{
    filename = '_engine/components/Route.tsx'

    render(){
        const { component: Comp, ...rest } = this.props
        return <ReactRoute {...rest} render={(props: any) => (
            <Comp {...props} />
        )} />
    }
}
export default Route
