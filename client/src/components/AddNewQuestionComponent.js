import axios from "axios";
import React, {Component} from "react";
// import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";

class AddNewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          question: "",
        };
      };
      render(){
        return(
            <form className="add-question-form" onSubmit={(e)=>this.btnAddQuestion(e)}>
            <input
                type="text"
                placeholder="Enter new question"
                value={this.state.question}
                onChange={(e) =>{this.setState({question:e.target.value})}}
                required
            />
            <button type="submit">Add Question</button>
        </form>
        )
      };
      //event handlers
      btnAddQuestion(e){
        e.preventDefault();
        const question1 = this.state.question;
        const questionTrim = question1.trim();
        if (!questionTrim){
            alert("Please input the question");
            return;
        }
        const question = {question: questionTrim, topic:this.props.topic};
        this.addNewQuestion(question);
        this.setState({question:""})
      }
      //apis
      addNewQuestion(question){
        axios.post('/api/user/questions', question).then((res)=>{
            const result = res.data;
            if (result){
                alert('Add new Question successfully');
            }
            else{
                alert('Add new Question fail');
            }
        });
    }
}

export default withRouter(AddNewQuestion)