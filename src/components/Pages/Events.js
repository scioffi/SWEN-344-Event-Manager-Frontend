import React from "react";

class Events extends React.Component {
    render() {
        return (
            <div>
                <div className = "well well-lg">
                    <h3>Spring Fest!</h3>
                    <p>RIT SpringFest, sponsored by the College Activities Board (CAB) is RIT's annual student celebration of...</p>
                    <br />
                    <p><a className="btn btn-default" href="/Event" role="button">View details &raquo;</a></p>
                </div>
                <div className = "well well-lg">
                    <h3>Trip to the Planetarium</h3>
                    <p>See the Led Zeppelin laser show at the Planetarium the night of Saturday March 24th.</p>
                    <br />
                    <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                </div>
            </div>
        );
    }
}

export default Events;