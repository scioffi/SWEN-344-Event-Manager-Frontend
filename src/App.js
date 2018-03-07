import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Homepage, Event, ListOfEvents, CreateEvent, EditEvent} from "./components/Pages";
import {Header} from "./components/Header";
import Footer from "./components/Footer/Footer";
import ritLogo from "./images/rit-logo.png";

class App extends Component {

  constructor() {
    super();
    this.state = {login: false};

    // custom function, must bind to this
    this.clickedLogin = this.clickedLogin.bind(this);
  }

  clickedLogin() {
    this.setState({login: true})
  }

  render() {
    if(!this.state.login) {
      return (
        <div className="App-login col-xs-12">
          <img src={ritLogo} alt="RIT" className="App-login-icon col-xs-offset-3 col-xs-6"/>
          <span className="App-title col-xs-12">Events</span>
          <button onClick={() => this.clickedLogin()} className="App-login-button col-xs-offset-3 col-xs-6">Login with Google</button>
        </div>
      );
    }
    else {
      return (
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/Event/:eventId" component={Event} />
                <Route path="/EventList" component={ListOfEvents} />
                <Route path="/CreateEvent" component={CreateEvent} />
                <Route path="/EditEvent" component={EditEvent} />
              </Switch>
              <Footer />
            </div>
          </BrowserRouter>
      );
    }
  }
}

export default App;
