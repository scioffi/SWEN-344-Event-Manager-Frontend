import React from "react";
import moment from "moment";
import {Redirect} from "react-router-dom";

class ShareEvent extends React.Component {
	constructor(props){
        super(props);
        
		this.state = {
            createSuccessful: false,
            getEmail: false,
			to_user_id: 0,
			readyToSend: false,
			data: {},
			error: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.addMessage = this.addMessage.bind(this);
		this.invalidEmail = this.invalidEmail.bind(this);
    }

    addMessage(data){
		data.set("to_user", this.state.to_user_id);

		const self = this;

		fetch(`${window.events.hostname}/api/addMessage`, {
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
	}
    
    handleSubmit = (event) => {
		event.preventDefault();
        const data = new URLSearchParams();
        data.append("eventId", this.props.match.params.eventId);

        data.append("from_user", sessionStorage.getItem("id"));
        data.append("shared_time", moment("1524680000", "MMMM DD YYYY - hh:mm a").unix());
		for (const pair of new FormData(event.target)) {
			data.append(pair[0], pair[1]);
        }

        const self = this;

		fetch(`${window.events.hostname}/api/getUserByEmail?email=${data.get("to_user")}`, {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			alert("Invite Sent!");
			self.setState({
				getEmail: true,
				to_user_id: response.user_id,
				readyToSend: true,
				data: data
			});
		})
		.catch((error) => {
			console.error(error);
			self.setState({
				error: true
			});
		});
	};

	invalidEmail(){
		return (
			<div className="alert alert-danger">
				<button type="button" className="close" data-dismiss="alert">&times;</button>
				<strong>ERROR!</strong> That email is not associated with any user in our database.
			</div>
		);
	}
   
    render(){
    	if(this.state.getEmail === true && this.state.readyToSend === true){
			this.addMessage(this.state.data);
		}

        if (this.state.createSuccessful === true){
			return (
				<Redirect to='/EventList' />
			);
		} else {
            return (
                <div id="page-event-form">
					{this.state.error === true &&
						this.invalidEmail()
					}
                    <h1>Share an Event</h1>
                    <form method="post" onSubmit={this.handleSubmit} id="event-form">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="event_title" className="control-label">Email of Person</label>
                                    <input type="text" className="form-control input-lg" name="to_user" id="to_user" placeholder="email" required />
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
