import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const User = styled.div`
  display: flex;
  margin: 30px auto;
  margin-bottom: 25px;
  width: 90%;
  padding: 0 15px;
  cursor: pointer;
  border: 1px dashed #0f0f0f;
  align-items: center;
  background: white;

  &:hover {
    opacity: 0.8;
    color: darkgreen;
  }

  & > p,
  & > h2,
  & > h3 {
    font-size: 18px;
    text-transform: uppercase;
    font-weight: normal;
    margin-right: 25px;
    border-right: 1px solid #0f0f0f;
    padding-right: 25px;
  }
`;

export default class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    let token = localStorage.getItem("jwt");
    axios({
      method: "get",
      url: "http://localhost:8081/api/users",
      headers: {
        Authorization: token
      }
    })
      // .get("http://localhost:8081/api/users", )
      .then(({ data }) => this.setState({ users: data }))
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.users.length) {
      return (
        <div>
          <h1>__Users__</h1>
          <Link to="/users/departments">
            <button>Your Department</button>
          </Link>
          {this.state.users.map((user, i) => (
            <User key={i}>
              <p>Member #: {user.id}</p>
              <h2>Username: {user.username}</h2>
              <h3>Department: {user.department}</h3>
            </User>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading...</h3>
          <p>Taking too long? Has it been a while since you logged in?</p>
          <p>Try logging in again</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      );
    }
  }
}

UserList.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
