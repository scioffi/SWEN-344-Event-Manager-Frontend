import React from "react";

class ShareEvent extends React.Component {
	constructor(props){
        super(props);
        
		this.state = {
			createSuccessful: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		//this.validate = this.validate.bind(this);
    }
    /*
    var eventId = req.body.eventId;	
        var fromUser = req.body.from_user;
        var toUser = req.body.to_user;
        var sharedTime = req.body.shared_time;
        var message = req.body.message;
    */
    handleSubmit = (event) => {
		event.preventDefault();
        const data = new URLSearchParams();
        data.append("eventId", this.props.match.params.eventId);
		for (const pair of new FormData(event.target)) {
			data.append(pair[0], pair[1]);
        }
		const self = this;

		fetch("http://localhost:8080/api/addMessage", {
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
