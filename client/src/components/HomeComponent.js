import React, {Component} from "react";
// import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";

class Home extends Component {
    render(){
        return(
            <div className="homepage-body">
                <div className="homepage">
      {/* Tiêu đề chính */}
      <header className="header">
        <h1>Welcome to Your Cute Space!</h1>
        <p>A little place to learn and have fun</p>
      </header>

      {/* Hình minh họa */}
      <div className="image-section">
        <img src='/bear.gif' alt="Cute kitten" className="cute-img" />
      </div>

      {/* Nút điều hướng */}
      <div className="button-section">
        <button className="cute-button" onClick={() => alert('Explore clicked!')}>Explore More</button>
        <button className="cute-button" onClick={() => alert('Get Started clicked!')}>Get Started</button>
      </div>
    </div>
            </div>
            
        )
    }
}
export default withRouter(Home)