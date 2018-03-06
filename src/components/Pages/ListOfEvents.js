import React from "react";
import {Link} from "react-router-dom";
import {Glyphicon} from "react-bootstrap";
import DateTime from "../utilities/DateTime";

class ListOfEvents extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			fetching: true,
			events: {}
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/getEvents", {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			console.log(response);
			this.setState({
				fetching: false,
				events: response
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
					<h1>Loading Events...</h1>
				</div>
			);
		} else {
			if (this.state.events.length > 0) {
				return (
					<div>
						{this.state.events.map((event, index) => {
							if (event.status === "open") {
								return (
									<div className="row" key={index}>
										<div className="col-md-12">
											<div className="panel panel-default">
												<div className="panel-heading">
													<h2>{event.title}</h2>
													<h5><Glyphicon glyph="map-marker"/> {event.location}</h5>
												</div>
												<div className="panel-body">
													<div className="row">
														<div className="col-md-7">
															<p>{event.description}</p>
														</div>
														<div className="col-md-5">
															<dl className="dl-horizontal">
																<dt>Price:</dt>
																<dd>${event.price} USD</dd>

																<dt>Start Time:</dt>
																<dd><DateTime timestamp={event.startTime}/></dd>

																<dt>End Time:</dt>
																<dd><DateTime timestamp={event.endTime}/></dd>
															</dl>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<Link to={"/Event/" + event.eventId}
																  className="btn btn-default" role="button">View
																Details &raquo;</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							}
						})}
					</div>
				);
			} else {
				return (
					<div>
						<h2 style={"text-align", "center"}>No Upcoming Events</h2>
					</div>
				);
			}
		}
	}
}

export default ListOfEvents;