import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Stories from "../ListItem";
import Loader from "../Loader";
import "./styles.css"
import GraphReport from "../GraphReport";
import algoliaApi from "../../services/algoliaApi";

const Dashboard = props => {
    const [state, setState] = useState([]);
    const [page, setPage] = useState(0);
    const [plotData, setPlotData] = useState([
        {
            "data": []
        }]);
    const [count, setCount] = useState(20);
    const [isLoading, setLoading] = useState(false);

    //a global index to keep track of the all showed items

    //setting different api params for different routes
    const checkRoute = () => {
        let route;
        switch (props.location.pathname) {
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
        console.log(item);
        var retro = item.slice(0).map(elem => {
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
        getData(checkRoute(), 0, 20).then(arr => {
            getDetails(arr).then(item =>
                formatComponent(item, () => {
                    props.hideLoader();
                })
            );
        });
    }, []);

    //getting all the data ids and storing them in an array
    const getData = async function(category) {
        const arr = [];
        try {
            let response = await algoliaApi.getStoryByType(category)
            setPage(response.page + 1);
            response && response.hits.map(item => arr.push(item.objectID));
            console.log("length of algoliza data", response.hits.length)
        } catch (error) {
            return error;
        }
        return arr;
    };

    //fetching data from those ids and storing only the necessary datas in an array
    const getDetails = async function(arr) {
        const promises = arr.map(async item => {
            const data  = await algoliaApi.getStoryObj(item);
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

    const showNextContent = (next) => {
        setLoading(true);
        let nextPage = next === "next" ? page + 1 : page - 1;
        algoliaApi.getByPageNo(checkRoute(), nextPage).then(arr => {
            getDetails(arr).then(item => {
                formatComponent(item, () => {
                    setCount(page*20);
                    setLoading(false);
                    window.scrollTo(0, 0);
                })
            })
        })
    }

    //return statement
    return (
        <>
            {props.isLoading ? (
                <Loader />
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
                            <Stories state={state} />
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center m-1">
            <span onClick={() => showNextContent("prev")}>
              <a href="#" className="previous">&laquo; Previous</a>
            </span>
                        <span onClick={() => showNextContent("next")}>
              <a href="#" className="next">Next &raquo;</a>
            </span>
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

export default withRouter(Dashboard);
