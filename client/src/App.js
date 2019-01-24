import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { Route, Switch, withRouter } from "react-router-dom";
import UserRegistration from "./components/UserRegistration";
import HomePage from "./components/HomePage";
import UserList from "./components/UserList";
import Login from "./components/Login";
import axios from "axios";
import Navbar from "./components/Navbar";
import PropTypes from 'prop-types';
import { ProtectedRoute } from './hoc/WithAuth';

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
    background: papayawhip;
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
    background: papayawhip;
    border-bottom: 2px dashed #0f0f0f;

    &:placeholder-shown, ::-webkit-input-placeholder {
      color: #0f0f0f;
    }

    &:active, &:focus {
      outline: none;
    }
  }
`;

class App extends Component {
  static propTypes={

  }
  state={
    loggedIn: false
  };

  componentDidMount = () => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      this.setState({loggedIn: true})
    } else {return null}
  }
  

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.error !== this.state.error) {
              setTimeout(() => {
                
                this.setState({error: null})
              }, 2000);

    }
  }
  
  logout = () => {
    this.setState({
      loggedIn: false
    })
    localStorage.removeItem('jwt');
    this.props.history.push('/')
  }


  handleLogin = () => {
    const { state = {} } = this.props.location;
    const { prevLocation } = state;

    this.setState(
      {
        loggedIn: true,
      },
      () => {
        this.props.history.push(prevLocation || "/users");
      },
    );
  };

  render() {
    const { state = {} } = this.props.location || this.state;
    const { error } = state;
    
    return (
      <>
        <GlobalStyles />
        <Navbar logout={this.logout}/>
        {error && <div style={{ padding: "80px", fontSize: "22px"}}>ERROR: {error}</div>}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" render={props => <UserRegistration {...props} handleLogin={this.handleLogin} />} />
          <Route path="/login" render={props => <Login {...props} handleLogin={this.handleLogin} />} />
          <ProtectedRoute path="/users" loggedIn={this.state.loggedIn} component={UserList} />
        </Switch>
      </>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(App);
