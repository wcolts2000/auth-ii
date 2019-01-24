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

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      department: "",
      error: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      department: this.state.department
    };
    if (user.username && user.password && user.department) {
      axios
        .post("http://localhost:8081/api/register", user)
        .then(res => {
          if (res.status === 201) {
            localStorage.setItem("jwt", res.data.token);
            this.setState({
              username: "",
              password: "",
              department: "",
              error: ""
            });
            this.props.handleLogin();
            this.props.history.push("/users");
          } else {
            return null;
          }
        })
        .catch(err => {
          this.setState({ error: err.message });
          setTimeout(() => {
            this.setState({
              username: "",
              error: ""
            });
            this.username.focus();
          }, 2000);
          console.error(err);
        });
    } else {
      return null;
    }
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
  render() {
    let { error } = this.state;
    return (
      <>
        <h1> __Register Now__</h1>
        {error && <h3>that username is taken</h3>}
        <Form onSubmit={this.handleSubmit}>
          <input
            required
            ref={input => {
              this.username = input;
            }}
            name="username"
            placeholder="username..."
            autoComplete="username"
            type="text"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <input
            required
            name="department"
            placeholder="department..."
            type="text"
            autoComplete="department"
            onChange={this.handleChange}
            value={this.state.department}
          />
          <input
            required
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
