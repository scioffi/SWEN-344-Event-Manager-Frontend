import React from "react";

class EditEvent extends React.Component {
    render() {
        return (
            <div id="page-event-form">
                <h1>Edit an new Event</h1>
                <form method="post" action="/api/createEvent/" id="event-form">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label for="event_title" className="control-label">Event Title</label>
                                <input type="text" className="form-control input-lg" name="event_title" id="event_title" placeholder="Event Title" required></input>
                            </div>
                            <div className="form-group">
                                <label for="event_desc" className="control-label">Event Description</label>
                                <textarea className="form-control" name="event_desc" id="event_desc" placeholder="Event Description" rows="3" cols="100%" required></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6" id="form-left">
                            <div className="form-group">
                                <label for="event_location">Location</label>
                                <div className="input-group">
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-map-marker"></span></span>
                                    <input type="text" className="form-control" name="event_location" id="event_location" placeholder="Event Location" required></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="event_tag" className="control-label">Give your event a tag</label>
                                <div className="input-group">
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-tag"></span></span>
                                    <input type="text" className="form-control" name="event_tag" id="event_tag" placeholder="Event Tag" required></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="event_image" className="control-label">Event Image (URL) [Optional]</label>
                                <div className="input-group">
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-picture"></span></span>
                                    <input type="text" className="form-control" name="event_image" id="event_image" placeholder="Event Image (URL)"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" id="form-right">
                            <div className="form-group">
                                <label for="event_start_time" className="control-label">Start Time</label>
                                <div className="input-group date form_datetime" data-date-format="MM dd yyyy - HH:ii p" data-link-field="event_start_time">
                                    <input className="form-control" name="event_start_time" size="16" type="text" value="" readonly required></input>
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-th"></span></span>
                                </div>
                                <input type="hidden" id="event_start_time" value="" />
                            </div>
                            <div className="form-group">
                                <label for="event_end_time" className="control-label">End Time</label>
                                <div className="input-group date form_datetime" data-date-format="MM dd yyyy - HH:ii p" data-link-field="event_start_time">
                                    <input className="form-control" name="event_end_time" size="16" type="text" value="" readonly required></input>
                                    <span className="input-group-addon"><span className="glyphicon glyphicon-th"></span></span>
                                </div>
                                <input type="hidden" id="event_end_time" value="" />
                            </div>
                            <div className="form-group">
                                <label for="event_price" className="control-label">Event Price</label>
                                <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="text" className="form-control" name="event_price" id="event_price" placeholder="Event Price" required></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="submit" value="Create Event" className="btn btn-primary btn-lg btn-block"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <input type="button" onClick="window.history.back()" value="Cancel" className="btn btn-info btn-lg btn-block"></input>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditEvent;