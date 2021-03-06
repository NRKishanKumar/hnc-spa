import React from "react";
import Header from "./index";
import toJson from "enzyme-to-json";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe("C: <Header/> Snapshot ", () => {
    it('Match the snapshot', () => {
        const wrapper = shallow(<Header />)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});