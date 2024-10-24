import axios from "axios";
import React, {Component} from "react";
// import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";
import QuestionTableComponent from "./QuestionTableComponent";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

class ManageQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          topic_list: [],
          question_list: [],
          task:"",
          showForm: false,
          topic: "",
        };
      };
      render () {
        return(
            <div className="manage-questions-container">
            <h1>Manage Questions For {this.state.task}</h1>
                <div className="tags-container">
                    {this.state.topic_list.map((item) => (
                        <div key={item._id} className="tag" onClick={()=>this.btnGetTable(item._id)}>
                             {/* onClick={this.btnGetTable(item._id)} */}
                            <span>{item.name}</span>
                    </div>
                    ))}
                <div className="tag add-tag" onClick={() => this.setState({showForm:!this.state.showForm})}>
                    <span>+ Add New Topic</span>
                </div>
                {/* {this.state.showForm && (
                <form className="add-category-form" onSubmit={handleAddCategory}>
                    <input
                        type="text"
                        placeholder="Enter new topic"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => { this.setState({showForm: false}); setNewCategory(""); }}>Cancel</button>
                </form>
            )} */}
            </div>
            <div>
                {this.state.topic.length > 0 && this.state.showForm===true ? 
                    <QuestionTableComponent topic={this.state.topic} task={this.state.task}></QuestionTableComponent>
                :<></>}
            </div>
        </div>
        )
    };
    //event handlers
    componentDidMount(){
        const params = this.props.params;
        if (params.cid){
            this.getTopicByCategory2Id(params.cid);
        }
    };
    componentDidUpdate(preProps){
        const params = this.props.params;
        if (params.cid && params.cid!== preProps.params.cid){
            this.getTopicByCategory2Id(params.cid);
            this.getCategory2ById(params.cid);
            this.setState({showForm:false})
        }
    };
    btnGetTable(cid){
        this.setState({topic: cid})
        if (!this.state.showForm){
            this.setState({showForm:true})
        }
    };
    //apis
    getCategory2ById(cid){
        axios.get('/api/user/category2/' + cid).then((res)=>{
          const result = res.data;
          this.setState({task:result.name})
        })};
    getTopicByCategory2Id(cid){
        axios.get('/api/user/topic/' + cid).then((res)=>{
            const result = res.data;
            this.setState({topic_list:result})
        })};
};
    
    
export default withRouter(ManageQuestion);