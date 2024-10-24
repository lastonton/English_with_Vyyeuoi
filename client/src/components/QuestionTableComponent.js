import axios from "axios";
import React, {Component} from "react";
// import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";
import AddNewQuestionComponent from "./AddNewQuestionComponent";

class QuestionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          question_list: [],
          showForm: false
        };
    };
    render () {
        return(
            <div>
                <table className="questions-table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Question</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.state.question_list.map((item,index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.question}</td>
                        <td>
                            <button className="remove-question-btn" onClick={() => this.btnDeleteQuestion(item._id,this.props.topic)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                <td>
                    <button className="add-question-btn" onClick={()=>this.btnShowFormAdd()}>
                           + Add
                    </button>
                </td>
            </tbody>
            </table>
            {this.state.showForm !== false ?
            <div>
                <AddNewQuestionComponent topic={this.props.topic}></AddNewQuestionComponent>
            </div>
            : <></>}
            </div>
            
        )
    };
    //event handlers
    componentDidMount(){
        const topic_id = this.props.topic;
        this.getQuestionsByTopic(topic_id)
    };
    async componentDidUpdate(prevProps){
        const topic_id = this.props.topic;
        if (topic_id && topic_id!== prevProps.topic){
            this.getQuestionsByTopic(topic_id);
        }
    };
    btnDeleteQuestion(qid,cid){
        if (window.confirm("Are you sure?")){
            this.deleteQuestion(qid,cid);
        };
    };
    btnShowFormAdd(){
        this.setState({showForm:!this.state.showForm})
    }
    //apis
    getQuestionsByTopic(cid){
        axios.get('/api/user/questions/topic/' + cid).then((res)=>{
            const result = res.data;
            this.setState({question_list:result});
    })};
    deleteQuestion(qid,cid){
        axios.delete('/api/user/questions/' + qid).then((res)=>{
            const result = res.data;
            if (result){
                alert('DELETE SUCCESSFULLY');
                this.getQuestionsByTopic(cid);
            }
        })
    };
}

export default withRouter(QuestionTable)