import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 20px;
  display: flex;
  background: #0f0f0f;

  & > div {
    display: flex;
    align-items: center;
  }

  & > a,
  & > div > a {
    color: papayawhip;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 20px;

    &.active {
      color: aqua;
    }
  }
`;

const NavLeft = styled.div`
  margin-left: auto;
`;

function Navbar(props) {
  return (
    <Nav>
      <NavLink exact to="/">
        <p>DepartmentMonitor.com</p>
      </NavLink>
      <NavLeft>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/users">Users</NavLink>
        <p
          style={{
            color: "red",
            cursor: "pointer"
          }}
          onClick={() => props.logout()}
        >
          LOGOUT
        </p>
      </NavLeft>
    </Nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Navbar;
