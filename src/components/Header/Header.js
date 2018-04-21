import React from "react";
import ritLogo from "../../images/rit-logo.png";
import {Link} from "react-router-dom";
import {Glyphicon} from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Header extends React.Component {
	constructor(props){
		super(props);
	}

	repsonseGoogle(response){
		console.log(response);
	}

    render() {
        return (
            <header>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <Link to="/"><img src={ritLogo} className="navbar-brand" alt="RIT" /></Link>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/EventList">Upcoming Events</Link></li>
                                <li><Link to="/CreateEvent">Create an Event</Link></li>
                                <li><Link to="/Messages"><Glyphicon glyph="envelope"/></Link></li>
                            </ul>

                            ReactDOM.render(
                                <GoogleLogin
                                    clientId={'402862016858-cpmh4k9ajrf6le3v5h3726rs1sqllv97.apps.googleusercontent.com'}
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                >
                                    <span> Login with Google</span>
                                </GoogleLogin>,
                                document.getElementById('googleButton')
                            );
                            <GoogleLogout
                                onLogoutSuccess={this.responseGoogle}
                                >
                                <span> Logout </span>
                            </GoogleLogout>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
