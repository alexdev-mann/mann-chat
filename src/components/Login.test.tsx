
import * as React from 'react'
import { Login } from './Login'
import * as Adapter from 'enzyme-adapter-react-16'
import * as enzyme from 'enzyme'
enzyme.configure({ adapter: new Adapter() })

describe('Login Component', () => {
    it('Should have a form tag', () => {
        const wrapper = enzyme.shallow(<Login user={{ username: 'Alex' }} />)
        expect(wrapper.find("form").length).toEqual(1)
    })
})