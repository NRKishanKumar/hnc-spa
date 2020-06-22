import React from "react";
import Footer from "./index";
import toJson from "enzyme-to-json";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
describe("C: <Footer/> Snapshot ", () => {
    it('Match the snapshot', () => {
        const wrapper = shallow(<Footer />)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
});