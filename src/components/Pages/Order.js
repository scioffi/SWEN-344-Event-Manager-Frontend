import React from "react";
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
		const url = "http://localhost:8080/api/getOrder?eventId=" + this.props.match.params.eventId + "&userId=" + this.props.match.params.userId;
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

	render() {
		if (this.state.fetching === true){
			return (
				<div>
					<h1>Loading Event...</h1>
				</div>
			);
		} else {
			return (
				<div>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h2>{this.state.event.title}</h2>
								<h4> <Glyphicon glyph="user"/> <b>Author:</b> {this.state.event.user}</h4>
								<h4> <Glyphicon glyph="event"/> <b>Description:</b> {this.state.event.event}</h4>
								<h4> <Glyphicon glyph="price"/> <b>Location:</b> {this.state.event.price}</h4>
								<h4> <Glyphicon glyph="currency"/> <b>Location:</b> {this.state.event.currency}</h4>
                            </div>
						</div>
					</div>
				</div>
			);
		}
	}
	
}

export default Event;