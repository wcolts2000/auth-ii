import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

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
    error: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    if (user.username && user.password) {
      axios
        .post("http://localhost:8081/api/login", user)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("jwt", res.data.token);
            this.props.history.push("/users");
          } else {
            return null;
          }
        })
        .catch(err => {
          if (err) {
            this.setState({ error: true });
            setTimeout(() => {
              this.setState({ error: false });
            }, 2000);
            console.log(err);
          } else {
            console.error(err);
          }
        });
    } else {
      return null;
    }
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
  render() {
    const { error } = this.state;
    return (
      <>
        <h1> __Login__</h1>
        {error && <h3>Incorrect Username/Password</h3>}
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
