import React from "react";

const Footer = () => {
    return (
        <div className="footer">

            <ul style={{listStyleType: "none", margin: "0"}}>
                <li>
                <span>
        Made with react {"    "}
                    <span role="img" aria-label="emoji">
                    ⚛️
                        {/*<i className="fa-spin">{`   ⚛   `} </i>️*/}
        </span>{" "}
      </span>
                </li>
                <li>
                    <a
                        href="https://github.com/NRKishanKumar/hnc-spa.git"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-github-alt " style={{
                            fontSize: "15px",
                            marginTop: "0px",
                            padding: "0px",
                            marginRight: "0px"
                        }}/>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
