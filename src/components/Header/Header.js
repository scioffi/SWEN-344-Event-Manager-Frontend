import React from "react";
import ritLogo from "../../images/rit-logo.png";
import {Link} from "react-router-dom";
import {Glyphicon} from "react-bootstrap";
import {isAdmin} from "../utilities/CheckAdmin";
import { logout } from "../../components/utilities/Login.js";

class Header extends React.Component {
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
                                {isAdmin() &&
                                    <li><Link to="/CreateEvent">Create an Event</Link></li>
                                }
                                {isAdmin() &&
                                    <li><Link to="/Admin">Admin Panel</Link></li>
                                }
                                <li><Link to="/Messages"><Glyphicon glyph="envelope"/></Link></li>
                                <li><Link onClick={logout} to="">Logout</Link></li>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;