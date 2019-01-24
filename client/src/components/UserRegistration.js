import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 50px 20px 20px;
  margin: 0 auto;
`;

class UserRegistration extends Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = this.state;
    if (user.username && user.password) {
      axios
        .post("http://localhost:8081/api/register", user)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.props.history.push("/users");
          } else {
            return null;
          }
          // console.log(res);
        })
        .catch(err => console.log(err));
    } else {
      return null;
    }
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
  render() {
    return (
      <>
        <h1> __Register Now__</h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="username..."
            autoComplete="username"
            type="text"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            name="department"
            placeholder="department..."
            type="text"
            autoComplete="department"
            onChange={this.handleChange}
            value={this.state.department}
          />
          <input
            name="password"
            placeholder="password..."
            type="password"
            onChange={this.handleChange}
            autoComplete="current-password"
            value={this.state.password}
          />
          <button>SUBMIT</button>
        </Form>
      </>
    );
  }
}

export default withRouter(UserRegistration);
