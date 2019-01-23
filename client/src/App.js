import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { Route } from "react-router-dom";
import UserRegistration from "./components/UserRegistration";
import HomePage from "./components/HomePage";
import UserList from "./components/UserList";
import Login from "./components/Login";
import axios from "axios";
import Navbar from "./components/Navbar";
axios.defaults.withCredentials = true;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
  }
 button {
    padding: 15px 25px;
    border: 3px solid tan;
    box-shadow: 0 6px tan;
    min-width: 300px;
    margin-bottom: 35px;
    background: papayawhip;
    border-radius: 100px;
    text-transform: uppercase;
    font-weight: bolder;
    letter-spacing: 1.2px;
    color: darkgreen;
    outline: none;
    position: relative;
    cursor: pointer;
    &:hover {
      top: 2px;
      opacity: .9;
      box-shadow: 0 4px tan;
    }
    &:active {
      top: 4px;
      opacity: .8;
      box-shadow: 0 2px tan;
    }
  }
  input {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 1000px;
    padding-left: 35px;
    font-size: 20px;
    border: none;
    background: tan;
    border-bottom: 2px dashed #0f0f0f;

    &:placeholder-shown, ::-webkit-input-placeholder {
      color: #0f0f0f;
    }
  }
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <Navbar />
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={UserRegistration} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={UserList} />
        </div>
      </>
    );
  }
}

export default App;
