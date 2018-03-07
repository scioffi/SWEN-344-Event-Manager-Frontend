import React from "react";
import DateTime from "../utilities/DateTime";
import {Glyphicon} from "react-bootstrap";

class Event extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			fetching: true,
			event: {}
		}
	}
	componentDidMount() {
		const url = "http://localhost:8080/api/getEvent?eventId=" + this.props.match.params.eventId;
		fetch(url, {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			console.log(response);
			this.setState({
				fetching: false,
				event: response
			});
		})
		.catch((error) => {
			console.error(error);
			// Should probably do some real error handling LOL
		});
	}

	componentWillMount(){
		try {
			window.twttr.widgets.load();
		} catch(e) {
			console.warn(e);
		}
	}

	render() {
		if (this.state.fetching === true){
			return (
				<div>
					<h1>Loading Event...</h1>
				</div>
			);
		} else {
			const newurl = "https://twitter.com/hashtag/" + this.state.event.hashtag;
			console.log(newurl);
			return (
				<div>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2>{this.state.event.title}</h2>
								<h4> <Glyphicon glyph="user"/> <b>Author:</b> {this.state.event.author}</h4>
								<h4> <Glyphicon glyph="book"/> <b>Description:</b> {this.state.event.description}</h4>
								<h4> <Glyphicon glyph="map-marker"/> <b>Location:</b> {this.state.event.location}</h4>
								<h4> <Glyphicon glyph="time"/> <b>Start Time:</b> <DateTime timestamp={this.state.event.startTime}/> </h4>
								<h4> <Glyphicon glyph="time"/> <b>End Time:</b> <DateTime timestamp={this.state.event.endTime}/> </h4>
								
								<a className="btn btn-default" href="#" role="button">Share Event &raquo;</a>
								<br />
								<a className="twitter-timeline" href="https://twitter.com/hashtag/KrutzIsKool" data-widget-id="968341462571274242">#{this.state.event.hashtag} Tweets</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
	
}

export default Event;