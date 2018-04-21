import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {
	Homepage,
	Event,
	ListOfEvents,
	CreateEvent,
	EditEvent,
	ListOfOrders,
	Messages,
	Expired,
	RegisterForEvents
} from "./components/Pages";
import {Header} from "./components/Header";
import Footer from "./components/Footer/Footer";
import ritLogo from "./images/rit-logo.png";

class App extends Component {

	constructor() {
		super();
	}
	render() {
			return (
				<BrowserRouter>
					<div>
						<Header/>
						<Switch>
							<Route exact path="/" component={Homepage}/>
							<Route path="/Event/:eventId" component={Event}/>
							<Route path="/EventList" component={ListOfEvents}/>
							<Route path="/CreateEvent" component={CreateEvent}/>
							<Route path="/EditEvent/:eventId" component={EditEvent}/>
							<Route path="/Messages" component={Messages}/>
							<Route path="/Expired" component={Expired}/>
							<Route path="/ListOfOrders" component={ListOfOrders} />
							<Route path="/EventRegistration/:eventId" component={RegisterForEvents}/>
						</Switch>
						<Footer/>
					</div>
				</BrowserRouter>
			);
		}
	}

export default App;
