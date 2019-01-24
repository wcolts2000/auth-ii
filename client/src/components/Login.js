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

class Login extends Component {
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
        .post("http://localhost:8081/api/login", user)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.props.history.push("/users");
          } else {
            return null;
          }
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
        <h1> __Login__</h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="username..."
            type="text"
            onChange={this.handleChange}
            autoComplete="username"
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
            value={this.state.password}
            autoComplete="current-password"
          />
          <button>SUBMIT</button>
        </Form>
      </>
    );
  }
}

export default withRouter(Login);
