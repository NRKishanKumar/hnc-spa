import React, {useEffect, useState} from "react";
import Stories from "../ListItem";
import Loader from "../Loader";
import GraphReport from "../GraphReport";
import algoliaApi from "../../services/algoliaApi";

const Dashboard = props => {

    const [state, setState] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [page, setPage] = useState(0);
    const [plotData, setPlotData] = useState([{
        "data": []
    }]);
    const [count, setCount] = useState(20);
    const [isValidVote, setIsValidVote] = useState(true);
    const [next, setNext] = useState(false);
    const [vote, setVote] = useState({
        item: -1, page: -1, index: -1
    })
    const [statusInterval, setIntervalState] = useState(undefined);
    const [isLoading, setLoading] = useState(false);

    //a global index to keep track of the all showed items

    //setting different api params for different routes
    const checkRoute = () => {
        let route;
        switch (route) {
            case "/poll":
                route = "poll"
                break;
            case "/comment":
                route = "comment"
                break;
            case "/ask_hn":
                route = "ask_hn"
                break;
            default:
                route = "story";
                break;
        }
        return route;
    };

    const formatComponent = (item, callback) => {
        let retro = item.slice(0).map(elem => {
            return {
                x: elem.item,
                y: elem.score
            }
        });
        setPlotData([{
            "data": retro.splice(0)
        }])
        setState(item);
        callback();
    };
    useEffect(() => {
        // function executes here ,calling two async function
        getData(checkRoute()).then(arr => {
            getDetails(arr).then(item =>
                formatComponent(item, () => {
                    setLoading(false);
                    props.hideLoader();
                })
            );
        });
    }, [refresh]);

    //getting all the data ids and storing them in an array
    const getData = async function (category) {
        const arr = [];
        try {
            console.log("getDAta calling")
            let response = await algoliaApi.getStoryByType(category)
            setPage(response.page);
            response && response.hits.map(item => arr.push(item.objectID));
            console.log("length of algoliza data", response.hits.length)
        } catch (error) {
            return error;
        }
        return arr;
    };

    //fetching data from those ids and storing only the necessary datas in an array
    const getDetails = async function (arr) {
        const promises = arr && arr.map(async item => {
            const data = await algoliaApi.getStoryObj(item);
            return {
                item,
                author: data.author,
                title: data.title,
                score: data.points,
                comments_count: data.children.length ? data.children[0].id : 0,
                time: data.created_at,
                url:
                    data.url != null
                        ? data.url
                        : `https://news.ycombinator.com/item?id=${item}`
            };
        });
        const results = await Promise.all(promises);
        return results;
    };

    const getPaginatedData = (pageNumber) => {
        algoliaApi.getByPageNo(checkRoute(), pageNumber).then(arr => {
            let itemsIds = [];
            arr && arr.hits.map(item => {
                itemsIds.push(item.objectID);
                return item;
            });
            setPage(arr.page);
            getDetails(itemsIds).then(item => {
                formatComponent(item, () => {
                    setCount(page * 20);
                    setLoading(false);
                    // window.scrollTo(0, 0);
                })
            })
        })
    }

    const showNextContent = (next) => {
        setLoading(true);
        let nextPage = next === "next" ? page + 1 : page - 1;
        if (nextPage > 0) {
            getPaginatedData(nextPage);
        } else if (nextPage === 0) {
            let newReferer = refresh + 1;
            setRefresh(newReferer);
        } else {
            setLoading(false);
        }
    }


    /**
     * @desc business logic
     * @param e
     */
    const hide = function (index, page) {
        algoliaApi.hideElem(index, page)
            .then(success => {
                if (page === 0) {
                    let newReferer = refresh + 1;
                    setRefresh(newReferer);
                } else {
                    getPaginatedData(page);
                }
            });
    }

    /**
     * @desc persist the votes in interceptor cache
     * @param item
     * @param fromPage
     * @param index
     * @param counter
     */
    const doneVote = (item, fromPage, index, counter) => {
        setIsValidVote(true);
        algoliaApi.upVote(item, fromPage, counter)
            .then(success => {
                if (page === 0) {
                    let newReferer = refresh + 1;
                    setRefresh(newReferer);
                } else {
                    getPaginatedData(page);
                }
            });
    };

    useEffect(() => {
        let timer;
        if (!isValidVote) {
            timer = setTimeout(() => {
                setNext(next + 1);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [state])

    useEffect(() => {
        if (!isValidVote && vote.index > -1) {
            let newState = state.slice(0);
            if (newState && newState.length && (vote.index > -1)) {
                ++newState[vote.index].score;
                formatComponent(newState, () => {
                    //setState(newState);
                });
            }
        }
    }, [next])

    useEffect(() => {
        if (!isValidVote) {
            setNext(next + 1);
        }
    }, [isValidVote])

    useEffect(() => {
        if (vote.index > -1) {
            setIsValidVote(false);
        }
    }, [vote])


    /**
     * @desc business logic
     * @param e
     */
    const upVote = function (item, fromPage, index) {
        console.log(item, fromPage, index, "idy");
        setVote({
            item, page: fromPage, index
        })
    }

    //return statement
    return (
        <>
            {props.isLoading ? (
                <Loader/>
            ) : (
                <>
                    <div
                        className={
                            isLoading
                                ? "container-fluid main overlay"
                                : "container-fluid main"
                        }
                    >
                        <table className="table">
                            <tbody>
                            <Stories state={state} page={page} upVote={upVote} doneVote={doneVote} hide={hide}/>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center m-1">
                        <button className="btn btn-dark previousPageIn round"
                                onClick={() => showNextContent("prev")}>
                            &laquo; Previous
                        </button>
                        <span onClick={() => showNextContent("next")}>
                            <a href="#" className="">&nbsp;&nbsp;</a>
                        </span>
                        <button className="btn btn-dark nextPageOut round" onClick={() => showNextContent("next")}>
                            Next &raquo;
                        </button>
                    </div>
                    <div style={{
                        height: "50vh"
                    }}>
                        <GraphReport data={plotData}/>
                    </div>
                </>
            )}
        </>
    );
};

export default Dashboard;
