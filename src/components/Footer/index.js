import React from "react";

const Footer = () => {
    return (
        <div className="footer">

            <ul style={{listStyleType: "none", margin: "0"}}>
                <li>
                <span>
         {"    "}
                    <span role="img" aria-label="emoji">

                        {/*<i className="fa-spin">{`   ⚛   `} </i>️*/}
        </span>{" "}
      </span>
                </li>

                <li>
                    <div className="social-btns">
                        <a className="btn dribbble" href="https://github.com/NRKishanKumar/hnc-spa.git"
                           target="_blank"
                           rel="noopener noreferrer">
                            <i className="fa fa-github-alt"></i></a>
                        <a className="btn facebook" href="https://www.facebook.com/profile.php?id=100006633586459"
                           target="_blank"
                           rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                        <a className="btn twitter" href="#"
                           target="_blank"
                           rel="noopener noreferrer"><i className="fa">⚛️</i></a>
                        <a
                            className="btn google"
                            href="https://www.linkedin.com/in/kishannr/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <i className="fa fa-google"></i></a>

                        <a className="btn skype" href="https://join.skype.com/invite/aILPw6d9ohkd"
                           target="_blank"
                           rel="noopener noreferrer">
                            <i className="fa fa-skype"></i></a>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Footer;