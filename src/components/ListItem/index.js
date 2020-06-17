import React, {useState, useEffect} from "react";
import timeago from "epoch-timeago";

const ListItem = (props) => {

    const [state, setState] = useState(props.state);

    const upVote = function (e) {
        var statOps = state.slice(0);
        ++statOps[this.index].score;
        setState(statOps)
    }

    const hide = function (e) {
        //state.slice(0).splice(this.index, 1)
        var statOps = state.slice(0);
        statOps.splice(this.index, 1);
        setState(statOps)
    }

    useEffect(() => {
        setState(props.state);
    }, [props])


    return (
        <>
            {state.map(
                (interest, index) => {
                    const {item, author, title, comments_count, time, url} = interest;
                    return (
                        <tr key={item}>
                            <td style={{ padding: "0px" }} onClick={upVote.bind({
                                interest,
                                index
                            })}>
                                <i
                                    className="fas fa-sort-up"
                                    style={{
                                        fontSize: "30px",
                                        marginTop: "16px",
                                        padding: "0px",
                                        marginRight: "0px"
                                    }}
                                />
                            </td>
                            <td
                                style={{
                                    padding: "0px",
                                    paddingTop: "13px",
                                    paddingRight: "15px",
                                    color: "#828282"
                                }}
                            >
                                &nbsp;
                                {interest.score}
                            </td>
                            <td style={{ padding: "0px" }} onClick={hide.bind({
                                interest,
                                index
                            })}>
                                <i
                                    className="fas fa-eye-slash"
                                    style={{
                                        fontSize: "20px",
                                        marginTop: "16px",
                                        padding: "0px",
                                        marginRight: "0px"
                                    }}
                                />
                            </td>
                            <td style={{ paddingRight: "80px", fontWeight: "600" }}>
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {title}
                                </a>
                            </td>
                            <React.Fragment className="info">
                                <td style={{ color: "#828282" }}>
                                    <i className="fas fa-user" />{" "}
                                    <a
                                        href={`https://news.ycombinator.com/user?id=${author}`}
                                        target="_blank"
                                        style={{ color: "#828282" }}
                                        rel="noopener noreferrer"
                                    >
                                        {author}
                                    </a>
                                </td>
                                <td style={{ color: "#828282" }}>
                                    <i className="fas fa-globe" />{" "}
                                    <a
                                        href={`https://${
                                            url
                                                .replace("http://", "")
                                                .replace("https://", "")
                                                .split(/[/?#]/)[0]
                                        }`}
                                        target="_blank"
                                        style={{ color: "#828282" }}
                                        rel="noopener noreferrer"
                                    >
                                        {url
                                            .replace("http://", "")
                                            .replace("https://", "")
                                            .split(/[/?#]/)[0]
                                            .replace("www.", "")}
                                    </a>
                                </td>
                                <td style={{ color: "#828282" }}>
                                    <i className="fas fa-clock"> {time}</i>
                                </td>
                                <td style={{ color: "#828282" }}>
                                    <i className="far fa-comment-alt" />{" "}
                                    <a
                                        href={`https://news.ycombinator.com/item?id=${item}`}
                                        target="_blank"
                                        style={{ color: "#828282" }}
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
