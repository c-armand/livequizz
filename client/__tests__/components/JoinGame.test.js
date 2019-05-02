import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import JoinGame from '../../src/components/JoinGame'

describe('<JoinGame />', () => {
  it('renders the component', () => {
    const component = shallow(<JoinGame />)
    // const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot()
  })
})