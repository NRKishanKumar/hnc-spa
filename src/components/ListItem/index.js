import React, {useState, useEffect} from "react";
import timeago from "epoch-timeago";
import algoliaApi from "../../services/algoliaApi";

const ListItem = (props) => {

    const [state, setState] = useState(props.state);

    useEffect(() => {
        console.log(state)
        setState(props.state);
    }, [props.state])

    const upVote = (item, page, index) => {
        props.upVote(item, page, index)
    }

    const doneVote = (item, page, index, score) => {
        props.doneVote(item, page, index, score);
    }

    const TimeAgo = ({ time }) =>
        <time datetime={new Date(time).toISOString()}>{timeago(time)}</time>

    return (
        <>
            <tr style={{padding: "20px 0"}}>
                <td style={{}}>
                    <p>Upvote</p>
                </td>
                <td
                    style={{
                        color: "#828282"
                    }}
                >
                    <p>Votes</p>
                </td>
                <td style={{paddingRight: "80px", fontWeight: "500"}}>
                    <p>Story title</p>
                </td>
                <React.Fragment className="info">
                    <td style={{color: "#212529"}}>
                        <p>{" Posted by  "}</p>
                    </td>
                    <td style={{color: "#212529"}}>
                        <p>{" Source  "}</p>
                    </td>
                    <td style={{color: "#212529"}}>
                        <p>{" When "}</p>
                    </td>
                    <td style={{color: "#212529"}}>
                        <p>{" Comments "}</p>
                    </td>
                </React.Fragment>
                <td style={{
                    margin: "0px 15px 0 15px", width: "auto",
                    display: "inline-block"
                }}>
                    <p>Hide</p>
                </td>
            </tr>
            {state.map(
                (interest, index) => {
                    const {item, author, title, comments_count, time, url, score} = interest;
                    const epochTimeStamp = new Date(time);
                    return (
                        <tr key={item}>
                            <td style={{padding: "5px", textAlign: "center"}}>
                                <button type="button" style={{
                                    color: "black",
                                    display: "inline-block"
                                }} className="btn btn-sm btn-warning"
                                        onMouseDownCapture={() => upVote(item, props.page, index)}
                                        onMouseUpCapture={() => doneVote(item, props.page, index, score)}

                                >
                                    <i
                                        className="fas fa-sort-up"
                                        style={{
                                            display: "inline",
                                            float: "left",
                                            fontSize: "20px",
                                            padding: "0px",
                                            marginRight: "5px",
                                            color: "black"
                                        }}
                                    />
                                    <div className="tooltipm" style={{
                                        color: "black",
                                        display: "inline"
                                    }}>Vote
                                        <span className="tooltiptext">Press & hold for unlimited votes</span>
                                    </div>
                                </button>
                            </td>
                            <td
                                style={{
                                    color: "#828282"
                                }}
                            >
                                <p style={{padding: "8px 0 0 0 !important"}}>{interest.score}</p>
                            </td>
                            <td style={{paddingRight: "50px", fontWeight: "600", width: "30%"}}>
                                <a className="truncate" href={url} target="_blank" rel="noopener noreferrer">
                                    {title}
                                </a>
                            </td>
                            <React.Fragment className="info">
                                <td style={{color: "#828282"}}>
                                    <i className="fas fa-user-secret"/>{" "}
                                    <a
                                        href={`https://news.ycombinator.com/user?id=${author}`}
                                        target="_blank"
                                        style={{color: "#828282"}}
                                        rel="noopener noreferrer"
                                    >
                                        {author}
                                    </a>
                                </td>
                                <td style={{color: "#828282"}}>
                                    <i className="fa"/>{" "}
                                    <a className="truncate"
                                       href={`https://${
                                           url
                                               .replace("http://", "")
                                               .replace("https://", "")
                                               .split(/[/?#]/)[0]
                                       }`}
                                       target="_blank"
                                       style={{color: "#828282"}}
                                       rel="noopener noreferrer"
                                    >
                                        {url
                                            .replace("http://", "")
                                            .replace("https://", "")
                                            .split(/[/?#]/)[0]
                                            .replace("www.", "")}
                                    </a>
                                </td>
                                <td style={{color: "#828282"}}>
                                    {/*<i className="fas fa-clock"></i>*/}
                                    <TimeAgo time={epochTimeStamp} />
                                </td>
                                <td style={{color: "#828282"}}>
                                    <i className="far fa-comment-alt"/>{" "}
                                    <a
                                        href={`https://news.ycombinator.com/item?id=${item}`}
                                        target="_blank"
                                        style={{color: "#828282"}}
                                        rel="noopener noreferrer"
                                    >
                                        {comments_count}
                                    </a>
                                </td>
                            </React.Fragment>
                            <td style={{padding: "0px"}} onClick={() => props.hide(index, props.page)}>
                                <button type="button" style={{
                                    color: "black"
                                }} className="btn btn-sm btn-info">
                                    <i
                                        className="fas fa-eye-slash"
                                        style={{
                                            color: "black",
                                            display: "inline",
                                            float: "left",
                                            fontSize: "20px",
                                            padding: "0px",
                                            marginRight: "5px"
                                        }}
                                    />
                                    <div style={{
                                        color: "black",
                                        display: "inline"
                                    }}>Hide
                                    </div>
                                </button>
                            </td>
                        </tr>
                    )
                }
            )}
        </>
    );
};
export default ListItem;
