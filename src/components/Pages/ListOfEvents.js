import React from "react";
import {Link} from "react-router-dom";

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
			return (
				<div>
					{this.state.events.map((event, index) => {
						return (
							<div className="row" key={index}>
								<div className="col-md-12">
									<div className="panel panel-default">
										<div className="panel-heading">
											<h1 className="panel-title">{event.title}</h1>
										</div>
										<div className="panel-body">
											<p>{event.description}</p>
											<Link to={"/Event/" + event.eventId} className="btn btn-default" role="button">View Details &raquo;</Link>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			);
		}
	}
}

export default ListOfEvents;