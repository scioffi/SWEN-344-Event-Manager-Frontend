import React from "react"
import { GoogleLogin } from 'react-google-login-component';

export const checkLogin = (response) => {
	if (response === undefined){ // Call from Code
		if(sessionStorage.getItem("email") !== null){
			return true;
		} else {
			return false;
		}
	} else { // Call from Google Auth
		console.log(response.w3);

		sessionStorage.setItem("email", response.w3.U3);
		sessionStorage.setItem("name", response.w3.ig);
	}
};

export class Login extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			loggedIn: false
		};

		this.check = this.check.bind(this);
	}

	check(response){
		if(response.w3 && response.w3.U3 !== undefined){
			this.setState({
				loggedIn: true
			});

			checkLogin(response);
		}
	}

	render() {
		if(!this.state.loggedIn) {
			return (
				<div>
					<div className="container">
					<div class="center">
						<h2>To sign into our app, please use Google.</h2>
						
						<GoogleLogin
							socialId="402862016858-cpmh4k9ajrf6le3v5h3726rs1sqllv97.apps.googleusercontent.com"
							className="google-login"
							fetchBasicProfile={true}
							responseHandler={this.check}
							buttonText=""
						/>
						</div>
					</div>
				</div>
			);
		} else {
			window.location = "/";
			return (
				<div></div>
			);
		}
	}
}
