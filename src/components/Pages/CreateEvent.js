import React from "react";
import $ from "jquery";
import {Redirect} from "react-router-dom";
require("bootstrap-datetime-picker");

class CreateEvent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			createSuccessful: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const data = new URLSearchParams();
		for (const pair of new FormData(event.target)) {
			data.append(pair[0], pair[1]);
		}

		const self = this;

		fetch(`${window.events.hostname}/api/createEvent`, {
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

	componentDidMount() {
		$(document).ready(function(){
			$('.form_datetime').datetimepicker({
				weekStart: 1,
				todayBtn:  1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				forceParse: 0,
				showMeridian: 1
			});
		});
	}

    render() {
		if(this.state.createSuccessful){
			return <Redirect to='/EventList' />;
		}
        return (
            <div id="page-event-form">
                <h1>Create a new Event</h1>
                <form method="post" onSubmit={this.handleSubmit} id="event-form">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="event_title" className="control-label">Event Title</label>
                                <input type="text" className="form-control input-lg" name="title" id="event_title" placeholder="Event Title" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_desc" className="control-label">Event Description</label>
                                <textarea className="form-control" name="description" id="description" placeholder="Event Description" rows="3" cols="100%" required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6" id="form-left">
                            <div className="form-group">
                                <label htmlFor="event_location">Location</label>
                                <div className="input-group">
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-map-marker" /></span>
                                    <input type="text" className="form-control" name="location" id="location" placeholder="Event Location" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_tag" className="control-label">Give your event a tag</label>
                                <div className="input-group">
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-tag" /></span>
                                    <input type="text" className="form-control" name="tag" id="tag" placeholder="Event Tag" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_image" className="control-label">Event Image (URL) [Optional]</label>
                                <div className="input-group">
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-picture" /></span>
                                    <input type="text" className="form-control" name="image" id="image" placeholder="Event Image (URL)" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" id="form-right">
                            <div className="form-group">
                                <label htmlFor="event_start_time" className="control-label">Start Time</label>
                                <div className="input-group date form_datetime" data-date-format="MM dd yyyy - HH:ii p" data-link-field="event_start_time">
                                    <input className="form-control" name="start_time" size="16" type="text" value="" readOnly required />
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-th" /></span>
                                </div>
                                <input type="hidden" id="event_start_time" value="" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_end_time" className="control-label">End Time</label>
                                <div className="input-group date form_datetime" data-date-format="MM dd yyyy - HH:ii p" data-link-field="event_end_time">
                                    <input className="form-control" name="end_time" size="16" type="text" value="" readOnly required />
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-th" /></span>
                                </div>
                                <input type="hidden" id="event_end_time" value="" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="event_price" className="control-label">Event Price</label>
                                <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="text" className="form-control" name="price" id="event_price" placeholder="Event Price" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="submit" value="Create Event" className="btn btn-primary btn-lg btn-block" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <input type="button" onClick={() => {this.props.history.goBack()}} value="Cancel" className="btn btn-info btn-lg btn-block" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateEvent;