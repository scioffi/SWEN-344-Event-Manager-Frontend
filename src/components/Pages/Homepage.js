import React from "react";
import Car2 from '../../images/car2.jpg';
import Car1 from '../../images/car1.jpg';
import {Glyphicon} from "react-bootstrap";

class Homepage extends React.Component {
    constructor(props){
		super(props);

		this.state = {
			fetching: true,
			events: {}
		}
	}

	componentDidMount() {
		const url = `${window.events.hostname}/api/getEvents`;

		fetch(url, {
			method: "get"
		})
		.then((res) => res.json())
		.then((response) => {
			console.log(response);
			this.setState({
				fetching: false,
				events: response
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
			if (this.state.events.length > 1) {
                return(
                <div>
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                        </ol>

                        <div className="carousel-inner">
                            <div className="item active">
                                <img src={Car1} alt={this.state.events[0].title} className="carousel"></img>
                                <div className="carousel-caption">
                                    <h2>{this.state.events[0].title}</h2>
                                    <p>{this.state.events[0].description}</p>
                                </div>
                            </div>
                            <div className="item">
                                <img src={Car2} alt={this.state.events[1].title} className="carousel"></img>
                                <div className="carousel-caption">
                                    <h2>{this.state.events[1].title}</h2>
                                    <p>{this.state.events[1].description}</p>
                                </div>
                            </div>
                        </div>
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <Glyphicon glyph="chevron-left" />
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <Glyphicon glyph="chevron-right" />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h2>Events are Easy to Sign Up For</h2>
                                <p>Events now have a streamlined and easy to sign up for. Just go to any event and click register to sign up for an event.</p>
                            </div>
                            <div className="col-md-4">
                                <h2>Now 6 Ways to Pay!</h2>
                                <p>Now you can pay for events in six currencies! US dollars, Euros, BitCoin, GBP, Indian Rupee, and Canadian dollar are now all acceptable forms of payment.</p>
                            </div>
                            <div className="col-md-4">
                                <h2>Share Events with Others</h2>
                                <p>Now you can share events with your friends while browsing events. This allows both parties to view events and let your friends know you want them to join you!</p>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }else{
                return(
                    <div>
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            </ol>
    
                            <div className="carousel-inner">
                                <div className="item active">
                                    <img src={Car1} alt="No events" className="carousel"></img>
                                    <div className="carousel-caption">
                                        <h2>There are currently no events!</h2>
                                        <p>Check back later</p>
                                    </div>
                                </div>
                            </div>
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <Glyphicon glyph="chevron-left" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <Glyphicon glyph="chevron-right" />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
    
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <h2>Events are Easy to Sign Up For</h2>
                                    <p>Events now have a streamlined and easy to sign up for. Just go to any event and click register to sign up for an event.</p>
                                </div>
                                <div className="col-md-4">
                                    <h2>Now 6 Ways to Pay!</h2>
                                    <p>Now you can pay for events in six currencies! US dollars, Euros, BitCoin, GBP, Indian Rupee, and Canadian dollar are now all acceptable forms of payment.</p>
                                </div>
                                <div className="col-md-4">
                                    <h2>Share Events with Others</h2>
                                    <p>Now you can share events with your friends while browsing events. This allows both parties to view events and let your friends know you want them to join you!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
            }
        }
    }
}

export default Homepage;