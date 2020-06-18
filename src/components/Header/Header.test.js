import {describe} from "riteway";
import render from "riteway/render-component";
import React from "react";

import Header from "./index";

function showLoader() {
    console.log("Blah!!!");
}

test('renders learn react link', () => {
    const {getByText} = render(<Header/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).not.toBeInTheDocument();
});


// describe("Header component", async assert => {
//     const showLoader = false;
//     const $ = render(<Header showLoader={showLoader} />);
//
//     assert({
//         given: 'a username',
//         should: 'Render a header component without complaints/..',
//         actual: $('')
//             .html()
//             .trim(),
//         expected: ""
//     });
// })