import React from "react";

class Event extends React.Component {
	constructor(props){
		super(props);

		window.alert(this.props.match.params.eventId);
	}
	componentDidMount() {
		window.twttr.widgets.load();
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<h2>Event Name</h2>
							<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
								commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
								porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
							<p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
						</div>
						<div className="col-md-8">
							<h2>Heading</h2>
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

export default Event;