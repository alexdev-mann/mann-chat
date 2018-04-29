
import * as React from 'react'
import Input from './Input'
import * as Adapter from 'enzyme-adapter-react-16'
import * as enzyme from 'enzyme'
enzyme.configure({ adapter: new Adapter() })

describe('Input Component', () => {
    it('Displays an append prop', () => {
        const wrapper = enzyme.shallow(<Input append={<button />} />)
        expect(wrapper.find("button").length).toEqual(1)
    })
    it('Displays a prepend prop', () => {
        const wrapper = enzyme.shallow(<Input append={<button />} />)
        expect(wrapper.find("button").length).toEqual(1)
    })
    it('Displays a prepend prop', () => {
        const wrapper = enzyme.shallow(<Input append={<button />} containerClassName={'container-class'} />)
        expect(wrapper.find(".input-group").hasClass('container-class')).toEqual(true)
    })
})