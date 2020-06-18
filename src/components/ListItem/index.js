import React, {useState, useEffect} from "react";
import timeago from "epoch-timeago";
import algoliaApi from "../../services/algoliaApi";

const ListItem = (props) => {

    const [state, setState] = useState(props.state);

    useEffect(() => {
        setState(props.state);
    }, [props])


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
                <td style={{margin: "0px 15px 0 15px", width: "auto",
                display: "inline-block"}}>
                    <p>Hide</p>
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
                        <p>{" Dated on "}</p>
                    </td>
                    <td style={{color: "#212529"}}>
                        <p>{" Comments "}</p>
                    </td>
                </React.Fragment>
            </tr>
            {state.map(
                (interest, index) => {
                    const {item, author, title, comments_count, time, url} = interest;
                    return (
                        <tr key={item}>
                            <td style={{padding: "0px"}} onClick={() => props.upVote(item,
                                props.page)}>
                                <i
                                    className="fas fa-sort-up"
                                    style={{
                                        fontSize: "30px",
                                        marginTop: "16px",
                                        padding: "0px",
                                        marginRight: "10px"
                                    }}
                                />
                            </td>
                            <td
                                style={{
                                    color: "#828282"
                                }}
                            >
                                <p style={{padding: "8px 0 0 0 !important"}}>{interest.score}</p>
                            </td>
                            <td style={{padding: "0px"}} onClick={() => props.hide(interest, index)}>
                                <i
                                    className="fas fa-eye-slash"
                                    style={{
                                        fontSize: "20px",
                                        marginTop: "16px",
                                        padding: "0px",
                                        marginRight: "15px",
                                        marginLeft: "15px"
                                    }}
                                />
                            </td>
                            <td style={{paddingRight: "50px", fontWeight: "600", width: "30%"}}>
                                <a className="truncate" href={url} target="_blank" rel="noopener noreferrer">
                                    {title}
                                </a>
                            </td>
                            <React.Fragment className="info">
                                <td style={{color: "#828282"}}>
                                    <i className="fas fa-user"/>{" "}
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
                                    <i className="fas fa-globe"/>{" "}
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
                                    <i className="fas fa-clock"> {time}</i>
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
                        </tr>
                    )
                }
            )}
        </>
    );
};
export default ListItem;
