import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';


Enzyme.configure({ adapter: new Adapter() });
describe('App snapshots', () => {

    it('Runnung App tests',()=>{
       expect(Enzyme).toBeInstanceOf(Object);
    })

    test('Testing snapshots: Should match App container', () => {
        let wrapper = shallow(<App/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })

});