import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Categories } from "./Categories";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isHovered: ""
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen(event) {
    event.preventDefault();
    this.setState({ isOpen: true, isHovered: "dropdown__content" });
  }
  handleClose() {
    this.setState({ isOpen: false, isHovered: "" });
  }
  render() {
    return (
      <div className="header__wrapper">
        <nav className="header" role="banner">
          <Link to="/" className="header__logo">
            <img
              src={process.env.PUBLIC_URL + "/img/logo.jpg"}
              alt="header logo"
            />
          </Link>
          <ul className="menu">
            <li
              className="menu__item"
              onMouseEnter={this.handleOpen}
              onMouseLeave={this.handleClose}
              open={this.state.isOpen}
            >
              <Link to="/categories">EXPLORE</Link>
              {this.state.isOpen ? (
                <Categories className={this.state.isHovered} />
              ) : null}
            </li>

            <li className="menu__item">
              <Link to="/loginform">SUPPORT</Link>
            </li>

            <li className="menu__item">
              <Link to="company">COMPANY</Link>
            </li>
          </ul>

          <ul className="nav">
            <li>
              <Link to="/">
                <i className="fa fa-search" />
              </Link>
            </li>
            <li>
              <Link to="/login">
                <i className="fa fa-user" />
              </Link>
            </li>
            <li>
              <Link to="/search">
                <i className="fa fa-shopping-cart" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
