import React from "react";

class Messages extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			fetching: true,
			messages: {}
		}
	}
    componentDidMount() {
		const url = `${window.events.hostname}/api/getMessageByUser?userId=${sessionStorage.getItem("id")}`;

		fetch(url, {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			console.log(response);
			this.setState({
				fetching: false,
				messages: response
			});
		})
		.catch((error) => {
			console.error(error);
			// Should probably do some real error handling LOL
		});
	}
    render(){
        if (this.state.fetching === true){
			return (
				<div>
					<h1>Loading Events...</h1>
				</div>
			);
		} else {
			if (this.state.messages.length > 0) {
                return(
                    <div className="panel-group">
                    {this.state.messages.map((message, index) => { // eslint-disable-line
                        return (
                            <div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">{message.from_user} sent you a message!</div>
                                    <div className="panel-body">{message.message} </div>
                                    <div className="panel-footer"><a className="btn-sm btn-default" href={`./Event/1${message.event_id}`} role="button">Go to Event &raquo;</a></div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                );
            }else{
                return (
					<div>
						<h2 style={{textAlign: "center"}}>No Messages</h2>
					</div>
				);
            }
        }
    }
}

export default Messages;
