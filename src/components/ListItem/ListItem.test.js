import React from "react";
import ListItem from "./index";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {render, fireEvent, cleanup} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup)

const withTimeout = (done, fn) => {
    const timeoutId = setTimeout(() => {
        fn();
        clearTimeout(timeoutId);
        done();
    });
};

describe('ListItem elements --> ', () => {
    let component;
    const api = {};

    beforeEach(() => {
        // This will execute your useEffect() hook on your component
        // NOTE: You should use exactly React.useEffect() in your component,
        // but not useEffect() with React.useEffect import
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());
        component = shallow(<ListItem state={[]} doneVote={() => {}} upVote={() => {}}/>);
    });

    it('should match the snapshot', () => {
        expect(component.html()).toMatchSnapshot();
    });

    // Note that here we wrap test function with withTimeout()
    test('should show no button during initialization state', (done) => withTimeout(done, () => {
        expect(component.find('.button').length).toEqual(0);
    }));
});