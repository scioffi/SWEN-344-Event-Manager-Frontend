import React from "react";
import {Link} from "react-router-dom";
import {Glyphicon} from "react-bootstrap";

class Admin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: "orders",
			fetching_orders: true,
			fetching_users: true,
			orders: {},
			users: {}
		};

		this.viewOrders = this.viewOrders.bind(this);
		this.content = this.content.bind(this);
		this.changeView = this.changeView.bind(this);
		this.viewUsers = this.viewUsers.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.changePerm = this.changePerm.bind(this);
	}

	componentDidMount() {
		fetch(`${window.events.hostname}/api/getOrders`, {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			this.setState({
				fetching_orders: false,
				orders: response
			});
		})
		.catch((error) => {
			console.error(error);
			// Should probably do some real error handling LOL
		});

		fetch(`${window.events.hostname}/api/getUsers`, {
			method: "get"
		})
			.then((res) => res.json())
			.then((response) => {
				this.setState({
					fetching_users: false,
					users: response
				});
			})
			.catch((error) => {
				console.error(error);
				// Should probably do some real error handling LOL
			});
	}

	changeView(view) {
		this.setState({
			view: view
		})
	}

	viewOrders() {
		return (
			<div>
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th>Event</th>
							<th>Attendee</th>
							<th>Price Paid (USD)</th>
						</tr>
					</thead>
					<tbody>
						{this.state.orders.map((order, index) => {
							return (
								<tr key={index}>
									<td>{order.event_id}</td>
									<td>{order.user_id}</td>
									<td>${order.price}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}

	viewUsers() {
		return (
			<div>
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.users.map((user, index) => {
							return (
								<tr key={index}>
									<td>{user.first_name} {user.last_name}</td>
									<td>{user.email}</td>
									<td>{user.permission}</td>
									<td>
										<div className="row">
											<div className="col-md-6">
												{user.permission === "admin"
													? <a className="btn btn-primary btn-sm btn-block" onClick={() => this.changePerm(user.user_id, user.first_name, user.last_name, "user")}><Glyphicon glyph="thumbs-down" /> Demote to User</a>
													: <a className="btn btn-primary btn-sm btn-block" onClick={() => this.changePerm(user.user_id, user.first_name, user.last_name, "admin")}><Glyphicon glyph="thumbs-up" /> Promote to Admin</a>
												}
											</div>
											<div className="col-md-6">
												<a className="btn btn-default btn-sm btn-block" onClick={() => this.deleteUser(user.user_id, user.first_name, user.last_name)}><Glyphicon glyph="trash" /> Delete User</a>
											</div>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}

	deleteUser(user_id, first_name, last_name) {
		if (user_id > 0){
			let confirmation = window.confirm(`Are you sure you want to delete ${first_name} ${last_name}'s account?`);

			if(confirmation === true){
				const data = {
					userId: user_id
				};

				fetch(`${window.events.hostname}/api/deleteUser`, {
					method: "POST",
					body: data
				})
				.then((response) => {
					window.location = "";
				})
				.catch((error) => {
					console.error(error);
					alert("Unable to delete user. Try again later.");
				});
			} else {
				return false;
			}
		}
	}

	changePerm(user_id, first_name, last_name, perm) {
		if (user_id > 0){
			let confirmation = window.confirm(`Are you sure you want to change ${first_name} ${last_name} to an ${perm}?`);

			if(confirmation === true){
				const data = {
					userId: user_id,
					permission: perm
				};

				fetch(`${window.events.hostname}/api/changeUserPermission`, {
					method: "POST",
					body: data
				})
				.then((response) => {
					window.location = "";
				})
				.catch((error) => {
					console.error(error);
					alert("Unable to change user. Try again later.");
				});
			} else {
				return false;
			}
		}
	}

	content() {
		if (this.state.view === "orders") {
			if (this.state.fetching_orders === true) {
				return (
					<div>
						<h2>Loading Orders...</h2>
					</div>
				);
			} else {
				return (
					<div>
						<h1>Order History</h1>
						{this.viewOrders()}
					</div>
				);
			}
		} else if (this.state.view === "users") {
			if (this.state.fetching_users === true){
				return (
					<div>
						<h2>Loading Users...</h2>
					</div>
				)
			} else {
				return (
					<div>
						<h1>Manage Users</h1>
						{this.viewUsers()}
					</div>
				)
			}
		} else {
			return(
				<div>Nothing to see here...</div>
			);
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-3">
					<h1 className="text-center">Admin Panel</h1>
					<Link className="btn btn-info btn-block btn-lg" to="/CreateEvent">Create an Event</Link>
					<a className="btn btn-primary btn-block btn-lg" onClick={() => this.changeView("orders")}>Order History</a>
					<a className="btn btn-primary btn-block btn-lg" onClick={() => this.changeView("users")}>Manage Users</a>
				</div>
				<div className="col-md-9">
					{this.content()}
				</div>
			</div>
		);
	}
}

export default Admin;