import React from "react";
import {Link} from "react-router-dom";
import {Glyphicon} from "react-bootstrap";

class ListOfEvents extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			fetching: true,
			orders: {}
		}
	}

	componentDidMount() {
		fetch("http://localhost:8080/api/getOrders", {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			this.setState({
				fetching: false,
				orders: response
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
					<h1>Loading Orders...</h1>
				</div>
			);
		} else {
			if (this.state.orders.length > 0) {
				return (
					<div>
						{this.state.orders.map((order, index) => { // eslint-disable-line
						return (
							<div className="row" key={index}>
								<div className="col-md-12">
									<div className="panel panel-default">
										<div className="panel-heading">
											<h3>Order Id: {index}</h3>
										</div>
										<div className="panel-body">
											<div className="row">
												<div className="col-md-5">
													<dl className="dl-horizontal">
														<dt>User Id:</dt>
														<dd>{order.userId}</dd>

														<dt>Event Id:</dt>
														<dd>{order.eventId}</dd>

														<dt>Price:</dt>
														<dd>${order.price} USD</dd>

														<dt>Currency:</dt>
														<dd>{order.currency}</dd>
													</dl>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							);
						})}
					</div>
				);
			} else {
				return (
					<div>
						<h2 style={{textAlign: "center"}}>No Order History</h2>
					</div>
				);
			}
		}
	}
}

export default ListOfEvents;