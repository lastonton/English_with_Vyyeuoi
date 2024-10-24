import axios from "axios";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";

class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        categories2: [],
      };
    }
    render() {
        return (
          <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li className="dropdown">
                  <Link to="/question" className="dropbtn">IELTS Questions</Link>
                  <div className="dropdown-content">
                    {this.state.categories2.map((item)=>{
                      return(
                      <Link key={item._id}to={'/question/task/' + item._id}>{item.name}</Link>
                    )})}
                  </div>
                </li>
                <li><Link to="/vocabulary">Vocabulary</Link></li>
                <li className="dropdown">
                  <Link>Manage Questions</Link>
                  <div className="dropdown-content">
                    {this.state.categories2.map((item)=>{
                      return(
                      <Link key={item._id} to={'/manage/task/' + item._id}>{item.name}</Link>
                    )})}
                  </div>
                </li>
                <li><Link to="/flashcard">Flash Card</Link></li>
            </ul>
          </nav>
        );
    };
    //event handlers
    componentDidMount() {
      this.apiGetCategories2();
    }
    //apis
    apiGetCategories2(){
      axios.get('/api/user/category2').then((res)=>{
        const result = res.data;
        this.setState({categories2: result});
      })
    };
};
export default withRouter(Menu)