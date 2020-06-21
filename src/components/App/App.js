import React, {useState} from "react";
import Header from "../Header";
import Footer from "../Footer";
import Dashboard from "../Dashboard";

/**
 * @desc bootstrap app for routing and initializing application
 * @returns {*}
 * @constructor
 */
const App = () => {
    const [isLoading, setLoadingState] = useState(true);

    const showLoader = () => {
        setLoadingState(true);
    };
    const hideLoader = () => {
        setLoadingState(false);
    };

    return (
        <div>
            <Header showLoader={showLoader}/>
            <>
                <Dashboard
                    isLoading={isLoading}
                    hideLoader={hideLoader}
                    showLoader={showLoader}
                />
            </>
            <Footer/>
        </div>
    );
};

export default App;
