import React from "react";
import moon from '../../images/moon.jpg';
import SpringFest from '../../images/SpringFest.jpg';
import {Glyphicon} from "react-bootstrap";

class Messages extends React.Component {
    render(){
        return(
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">Steven Cioffi Sent You an Event</div>
                    <div className="panel-body">Steven Cioffi wants you to attend Spring Fest! </div>
                    <div className="panel-footer"><a className="btn-sm btn-default" href="#" role="button">View Message &raquo;</a></div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Kyle Scagnelli Sent You an Event</div>
                    <div className="panel-body">Kyle Scagnelli wants you to attend Spring Fest! </div>
                    <div className="panel-footer"><a className="btn-sm btn-default" href="#" role="button">View Message &raquo;</a></div>
                </div>
            </div>
        );
    }
}

export default Messages;