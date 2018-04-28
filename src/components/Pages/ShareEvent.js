import React from "react";

class ShareEvent extends React.Component {
	constructor(props){
        super(props);
        
		this.state = {
			createSuccessful: false
		};

		//this.handleSubmit = this.handleSubmit.bind(this);
		//this.validate = this.validate.bind(this);
	}
   
    render(){
        if (this.state.fetching === true){
			return (
				<div>
					<h1>Loading Events...</h1>
				</div>
			);
		} else {
            return (
                <div id="page-event-form">
                    <h1>Share an Event</h1>
                    <form method="post" onSubmit={this.handleSubmit} id="event-form">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="event_title" className="control-label">Email of Person</label>
                                    <input type="text" className="form-control input-lg" name="title" id="event_title" placeholder="Event Title" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="event_desc" className="control-label">Message</label>
                                    <textarea className="form-control" name="message" id="message" placeholder="Message" rows="3" cols="100%" required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="submit" value="Send Event" className="btn btn-primary btn-lg btn-block" />
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
}

export default ShareEvent;
