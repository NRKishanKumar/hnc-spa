import React from "react";
import Loader from "./index";
import toJson from "enzyme-to-json";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe("C: <Loader/> Snapshot ", () => {
    it('Match the snapshot', () => {
        const wrapper = shallow(<Loader />)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});