import React from "react";
import $ from "jquery";
import {Redirect} from "react-router-dom";
import moment from "moment";
import { isAdmin } from "../utilities/CheckAdmin";
require("bootstrap-datetime-picker");

class EditEvent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
            createSuccessful: false,
            fetching: true,
			event: {},
			error: []
		};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
		this.validate = this.validate.bind(this);
		this.showErrors = this.showErrors.bind(this);
	}

    handleDelete = (event) => {
		event.preventDefault();
        const data = new URLSearchParams();
        data.append("eventId", this.props.match.params.eventId);
		const self = this;

		fetch("http://localhost:8080/api/deleteEvent", {
			method: "POST",
			body: data
		})
		.then(function(response){
			console.log(response);
			if(response.status !== 200){
				throw response;
			}

			self.setState({
				createSuccessful: true
			});
		})
		.catch(function(error) {
			console.error(error);
			window.alert("A submit error occurred. Check to make sure all required fields have been filled."); // DEBUG ONLY
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({
			error: []
		});

        const data = new URLSearchParams();
        data.append("eventId", this.props.match.params.eventId);

		for (const pair of new FormData(event.target)) {
			if(pair[0] === "start_date" || pair[0] === "end_date"){
				pair[1] = moment(pair[1], "MMMM DD YYYY - hh:mm a").unix();
			}
			data.append(pair[0], pair[1]);
			console.log(pair[1]);
        }

		const self = this;

		if(this.validate(data) === true) {
			fetch("http://localhost:8080/api/editEvent", {
				method: "POST",
				body: data
			})
			.then(function (response) {
				console.log(response);
				if (response.status !== 200) {
					throw response;
				}

				self.setState({
					createSuccessful: true
				});
			})
			.catch(function (error) {
				console.error(error);
				window.alert("A submit error occurred. Check to make sure all required fields have been filled."); // DEBUG ONLY
			});
		}
	};

	validate = (data) => {
		if(isNaN(data.get("price"))){
			this.state.error.push("Please enter a valid price.");
			this.setState({
				error: this.state.error
			});
		}

		if(data.get("title") === null){
			this.state.error.push("Please enter a title.");
			this.setState({
				error: this.state.error
			})
		}

		if(data.get("description") === null){
			this.state.error.push("Please enter a description.");
			this.setState({
				error: this.state.error
			})
		}

		if(data.get("location") === null){
			this.state.error.push("Please enter a location.");
			this.setState({
				error: this.state.error
			})
		}

		if(data.get("hashtag") === null || data.get("hashtag").includes("#")){
			this.state.error.push("Please enter a tag (without the # symbol).");
			this.setState({
				error: this.state.error
			})
		}

		if(isNaN(data.get("start_date")) || isNaN(data.get("end_date"))){
			this.state.error.push("Please enter a valid start and end date.");
			this.setState({
				error: this.state.error
			})
		}

		const start_date = moment.unix(data.get("start_date"));
		const end_date = moment.unix(data.get("end_date"));

		if(start_date.isAfter(end_date)){
			this.state.error.push("End time is before Start time");
			this.setState({
				error: this.state.error
			})
		}

		return this.state.error.length === 0;
	};

	showErrors = () => {
		if(this.state.error.length > 0){
			this.state.error.map((error, index) => {
				return (
					<div key={index} className="alert alert-danger">
						<button type="button" className="close" data-dismiss="alert">&times;</button>
						<strong>ERROR!</strong> {error}
					</div>
				)
			});
		} else {
			return null;
		}
	};

	componentDidMount() {
        const url = `${window.events.hostname}/api/getEvent?eventId=${this.props.match.params.eventId}`;

		fetch(url, {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			this.setState({
				fetching: false,
				event: response
			});

			$(document).ready(function(){
				$('.form_datetime').datetimepicker({
					weekStart: 1,
					todayBtn:  1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					forceParse: 0,
					showMeridian: 1,
					startDate: new Date()
				});

			});
		})
		.catch((error) => {
			console.error(error);
			// Should probably do some real error handling LOL
        });
	}

    render() {
        const start = moment.unix(this.state.event.start_date).format("MMMM D YYYY - h:mm a");
        const end = moment.unix(this.state.event.end_date).format("MMMM D YYYY - h:mm a");

        if (this.state.fetching === true && this.state.createSuccessful === false){
			return (
				<div>
					<h1>Loading Event...</h1>
				</div>
			);
        }
		else if((this.state.fetching === false && this.state.createSuccessful === true) || (!isAdmin())){
			return <Redirect to='/EventList' />;
        }
        else{
            return (
                <div id="page-event-form">
					{this.state.error.length > 0 && this.state.error.map((error, index) => {
						return (
							<div key={index} className="alert alert-danger">
								<button type="button" className="close" data-dismiss="alert">&times;</button>
								<strong>ERROR!</strong> {error}
							</div>
						);
					})}
                    <h1>Edit an Event</h1>
                    <form method="post" onSubmit={this.handleSubmit} id="event-form">
						<input type="hidden" name="author" value={this.state.event.author} />
						<input type="hidden" name="status" value={this.state.event.status} />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="event_title" className="control-label">Event Title</label>
                                    <input type="text" className="form-control input-lg" name="title" id="event_title" defaultValue={this.state.event.title} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="event_desc" className="control-label">Event Description</label>
                                    <textarea className="form-control" name="description" id="description" defaultValue={this.state.event.description} rows="3" cols="100%" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6" id="form-left">
                                <div className="form-group">
                                    <label htmlFor="event_location">Location</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-map-marker" /></span>
                                        <input type="text" className="form-control" name="location" id="location" defaultValue={this.state.event.location} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="event_tag" className="control-label">Give your event a tag</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-tag" /></span>
                                        <input type="text" className="form-control" name="hashtag" id="tag" defaultValue={this.state.event.hashtag} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="event_image" className="control-label">Event Image (URL) [Optional]</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-picture" /></span>
                                        <input type="text" className="form-control" name="image" id="image" value={this.state.event.url} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" id="form-right">
                                <div className="form-group">
                                    <label htmlFor="event_start_time" className="control-label">Start Time</label>
                                    <div className="input-group date form_datetime" data-date-format="MM dd yyyy - HH:ii p" data-link-field="event_start_time">
                                        <input className="form-control" name="start_date" id="start_date" size="16" type="text" readOnly required value={start} />
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-th" /></span>
                                    </div>
                                    <input type="hidden" id="event_start_time" value="" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="event_end_time" className="control-label">End Time</label>
                                    <div className="input-group date form_datetime" data-date-format="MM dd yyyy - HH:ii p" data-link-field="event_end_time">
                                        <input className="form-control" name="end_date" id="end_date" size="16" type="text" readOnly required value={end} />
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-th" /></span>
                                    </div>
                                    <input type="hidden" id="event_end_time" value="" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="event_price" className="control-label">Event Price</label>
                                    <div className="input-group">
                                        <span className="input-group-addon">$</span>
                                        <input type="text" className="form-control" name="price" id="event_price" defaultValue={this.state.event.price} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="submit" value="Edit Event" className="btn btn-primary btn-lg btn-block" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <input type="button" onClick={this.handleDelete} value="Delete Event" className="btn btn-danger btn-lg btn-block" />
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
        
    }
}

export default EditEvent;