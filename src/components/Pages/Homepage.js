import React from "react";
import moon from '../../images/moon.jpg';
import SpringFest from '../../images/SpringFest.jpg';
import {Glyphicon} from "react-bootstrap";

class Homepage extends React.Component {
    render(){
        return(
          <div>
              <div id="myCarousel" className="carousel slide" data-ride="carousel">
                  <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                  </ol>

                  <div className="carousel-inner">
                      <div className="item active">
                          <img src={SpringFest} alt="SpringFest" className="carousel"></img>
                          <div className="carousel-caption">
                              <h2>Spring Fest!</h2>
                              <p>RIT SpringFest, sponsored by the College Activities Board (CAB) is RIT's annual student celebration of the end of the academic year. Come out and enjoy free food, games, give-aways, a concert, and much more!</p>
                          </div>
                      </div>
                      <div className="item">
                          <img src={moon} alt="Chicago" className="carousel"></img>
                          <div className="carousel-caption">
                              <h2>Trip to the Planetarium</h2>
                              <p>See the Led Zeppelin laser show at the Planetarium the night of Saturday March 24th.</p>
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

export default Homepage;