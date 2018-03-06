import React from "react";

class Event extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			fetching: true,
			event: {}
		}
		//window.alert(this.props.match.params.eventId);
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
			return (
				<div>
					<div className="container">
						<div className="row">
							<div className="col-md-4">
								<h2></h2>
								<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
									commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
									porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
								<p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
							</div>
							<div className="col-md-8">
								<h2>{this.state.event.title}</h2>
								<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
									commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
									porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
								<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
									Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus
									commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
								<p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
								<a className="twitter-timeline" href="https://twitter.com/hashtag/RIT" data-widget-id="968341462571274242">#RIT Tweets</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
	
}

export default Event;