import React from "react";
import ritLogo from "../../images/rit-logo.png";
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/"><img src={ritLogo} className="navbar-brand" /></Link>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><Link to="/"><a href="/">Home</a></Link></li>
                                <li><Link to="/EventList">Upcoming Events</Link></li>
                                <li><Link to="/CreateEvent">Create an Event</Link></li>
                            </ul>
                            <form className="navbar-form navbar-right">
                                <div className="form-group">
                                    <input type="text" placeholder="Search for an Event" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-success">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;