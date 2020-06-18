import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import algoliaApi from "../../services/algoliaApi";

const Header = ({showLoader}) => {
    return (
        <Navbar style={{backgroundColor: " #ff6600"}}>
            <Navbar.Brand href="#home" style={{color: "#fff"}}>
                <Link
                    to="/"
                    style={{color: "#fff", textDecoration: "none"}}
                    onClick={showLoader}
                >
          <span className="logo">
            <i
                className="fa fa-hacker-news"
                style={{
                    fontSize: "20px",
                    marginTop: "5px",
                    padding: "0px",
                    marginRight: "0px"
                }}
            />
          </span> Hacker News
                </Link>
            </Navbar.Brand>

            <Nav className="ml-auto">
                <a
                    href="#"
                    className="source"
                    // target="_blank"
                    rel="noopener noreferrer"
                    style={{textDecoration: "none"}}
                    onClick={() => algoliaApi.clearCache()}
                >
                    <i className="fa fa-refresh" style={{fontSize: "20px"}}/>
                </a>
            </Nav>
        </Navbar>
    );
};

export default Header;
