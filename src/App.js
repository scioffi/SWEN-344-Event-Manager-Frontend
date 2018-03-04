import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Homepage, Event, Events, CreateEvent} from "./components/Pages";
import {Header} from "./components/Header";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/Event" component={Event} />
            <Route path="/EventList" component={Events} />
            <Route path="/CreateEvent" component={CreateEvent} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
