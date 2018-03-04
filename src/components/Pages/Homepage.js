import React from "react";
import logo from '../../images/logo.svg';
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
                      <Glyphicon glyh="glyphicon glyphicon-chevron-left" />
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
                          <h2>Heading</h2>
                          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                          <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                      </div>
                      <div className="col-md-4">
                          <h2>Heading</h2>
                          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                          <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                      </div>
                      <div className="col-md-4">
                          <h2>Heading</h2>
                          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                          <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default Homepage;