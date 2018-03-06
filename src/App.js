import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Homepage, Event, ListOfEvents, CreateEvent, EditEvent} from "./components/Pages";
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

export default App;
