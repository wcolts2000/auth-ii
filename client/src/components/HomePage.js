import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  background: #0f0f0f;
  background-image: url("https://images.pexels.com/photos/1007431/pexels-photo-1007431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function HomePage() {
  return (
    <Div>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/users">
        <button>Users</button>
      </Link>
    </Div>
  );
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
