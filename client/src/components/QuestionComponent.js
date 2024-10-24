import axios from "axios";
import React, {Component} from "react";
// import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";

class Question extends Component{
    constructor(props) {
        super(props);
        this.state = {
          questions: [],
          task:""
        };
      };
      render() {
        return(
            <div className="container">
                <h1>IELTS Speaking {this.state.task} Random Question Generator</h1>
                <input className="random-button" value="Generate Random Question" type="submit" onClick={(e)=>this.btnGenerateQuestion()}/>
                    <div className="random-question">
                        {this.state.questions.question}
                    </div>
            </div>
        )
      };
    //event handlers
    componentDidMount(){
      const params = this.props.params;
      if (params.cid){
        this.getCategory2ById(params.cid);
      }
    };
    componentDidUpdate(prevProps){
      const params = this.props.params;
      if (params.cid && params.cid!== prevProps.params.cid){
        this.getCategory2ById(params.cid);
        this.setState({questions:[]})
      }
      else if(!params.cid && params.cid !== prevProps.params.cid){
        this.setState({task: ""});
        this.setState({questions:[]})
      }
    };
    btnGenerateQuestion(){
      const params = this.props.params;
      if (!params.cid){
        this.getGenerateQuestionAllQuestion();
      }
      else{
        this.getGenerateQuestionByTask(params.cid);
      }
    };
    //apis
    getGenerateQuestionAllQuestion() {
      axios.get('/api/user/questions/random').then((res)=>{
        const result = res.data;
        this.setState({questions: result});
      })
    };
    getGenerateQuestionByTask(cid){
      axios.get('/api/user/questions/task/' + cid).then((res)=>{
        const result = res.data;
        this.setState({questions: result});
      })
    };
    getCategory2ById(cid){
      axios.get('/api/user/category2/' + cid).then((res)=>{
        const result = res.data;
        this.setState({task:result.name});
      })
    };
}

export default withRouter(Question);