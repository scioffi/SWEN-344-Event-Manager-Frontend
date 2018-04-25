import React from "react";
import DateTime from "../utilities/DateTime";
import {Glyphicon} from "react-bootstrap";

class Expired extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			fetching: true,
			event: {}
		}
    }
    componentDidMount() {
		const url = `${window.events.hostname}/api/getEvent?eventId=1`;

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
	render(){
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>{this.state.event.title}</h2>
                            <h4> <Glyphicon glyph="user"/> <b>Author:</b> {this.state.event.author}</h4>
                            <h4> <Glyphicon glyph="book"/> <b>Description:</b> {this.state.event.description}</h4>
                            <h4> <Glyphicon glyph="map-marker"/> <b>Location:</b> {this.state.event.location}</h4>
                            <h4> <Glyphicon glyph="time"/> <b>Start Time:</b> <DateTime timestamp={this.state.event.start_time}/> </h4>
                            <h4> <Glyphicon glyph="time"/> <b>End Time:</b> <DateTime timestamp={this.state.event.end_time}/> </h4>
                            
                            <a className="btn btn-default event-button" href="" role="button" disabled>Share Event &raquo;</a>
                            <a className="btn btn-default event-button" href="" role="button" disabled>Sign Up &raquo;</a>
                            <br /> <hr />
                            <a className="twitter-timeline" href="https://twitter.com/hashtag/KrutzIsKool" data-widget-id="968341462571274242">#{this.state.event.hashtag} Tweets</a>
                        </div>
                    </div>
                </div>
			</div>
        );
    }
}

export default Expired;