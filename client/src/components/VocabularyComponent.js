import axios from "axios";
import React, {Component} from "react";
// import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";
import DatePicker from "react-date-picker";

class Vocabulary extends  Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate:"",
          newWord:"",
          meaning:"",
          type:"",
          user_id:"66eb906da32703288c3b8908",
          vocabulary:[],
          showFormAdd: false,
          prevDate:"",
          toDay:"",
          selectWord:[],
          showFormSelect: false
        };
    };
    render(){
        const formatDate = (date) => {
          const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
          return offsetDate.toISOString().split('T')[0]; // Trả về yyyy-mm-dd
          };
        const handleDateChange =(date) =>{     
          this.setState({prevDate: this.state.selectedDate})
          this.setState({selectedDate:formatDate(date)});
        };
        
        return(
            <div className="vocabulary-page" >
      <h1>Vocabulary</h1>

      {/* React-Date-Picker để chọn ngày */}
      <label htmlFor="date-picker">Select Date:</label>
        <DatePicker
        onChange={handleDateChange}
        value={this.state.selectedDate}
        format="yyyy-MM-dd"
        clearIcon={null}>
        </DatePicker>

      
      {/* Danh sách từ vựng */}
      <div id="vocabulary-list">
        {this.state.selectedDate ?  this.state.vocabulary.length > 0 ? 
        <div className="tags-container">
        {this.state.vocabulary.map((item) => (
          <span key={item._id} className="tag" onClick={(e)=>this.chooseWord(e,item)}>{item.name}</span>
        ))}
      </div>: <></>
          : <p>Please select a date to view vocabulary.</p>}
        <div className="tags-container">{this.state.toDay === this.state.selectedDate ? <div className="tag add-tag" onClick={() => this.setState({showFormAdd:!this.state.showFormAdd})}>
                    <span>+ Add New Vocabulary</span>
                </div> :<></>}</div>
      </div>

      {/* Form thêm từ mới */}

      {this.state.showFormAdd ? <form onSubmit={(e)=>{this.btnAddVocabulary(e)}} className="vocab-form">
        <h2>Add New Vocabulary</h2>

        <label htmlFor="new-word">New Word:</label>
        <input
          type="text"
          id="new-word"
          value={this.state.newWword}
          onChange={(e) => this.setState({newWord:e.target.value})}
          required
        />

        <label htmlFor="new-meaning">Meaning:</label>
        <input
          type="text"
          id="new-meaning"
          value={this.state.meaning}
          onChange={(e) => this.setState({meaning:e.target.value})}
          required
        />

        <label htmlFor="new-type">Type:</label>
        <select
          id="new-type"
          value={this.state.type}
          onChange={(e) => this.setState({type : e.target.value})}
          defaultValue="Choose Type"
          required
        >
          <option value="Noun">Noun</option>
          <option value="Verb">Verb</option>
          <option value="Adjective">Adjective</option>
          <option value="Adverb">Adverb</option>
        </select>
        <button type="submit" className="add-btn">Add Vocabulary</button>
      </form> :<></>}
      {this.state.showFormSelect && this.state.selectWord ? <div className="word-details">
        <h3>Word: {(this.state.selectWord).name}</h3>
        <p><strong>Meaning:</strong> {(this.state.selectWord).meaning}</p>
        <p><strong>Type:</strong> {(this.state.selectWord).type}</p>
        <button type="submit" className="delete-btn" onClick={(e)=>this.btnDeleteVocabulary(e,(this.state.selectWord)._id)}>Delete</button>
      </div>:<></>}
    </div>
        )
        
    };
    //event handlers
    componentDidMount(){
        const d = new Date();
        const d_pre = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        const date = d_pre.toISOString().split('T')[0]; // Trả về yyyy-mm-dd
        this.setState({selectedDate:date});
        this.setState({toDay:date})
        const information = {user_id: this.state.user_id,date:date}
        this.getVocabularyByDate(information);
        this.setState({prevDate:this.state.selectedDate})
    };
    componentDidUpdate(){
      if (this.state.prevDate && this.state.selectedDate !== this.state.prevDate){
        const information = {user_id: this.state.user_id,date:this.state.selectedDate}
        this.getVocabularyByDate(information);
        this.setState({prevDate:this.state.selectedDate});
        this.setState({selectWord:[]})
      }
      else if(this.state.selectedDate === this.state.prevDate && this.state.newWord !=="" && this.state.showFormAdd === false){
        const information = {user_id: this.state.user_id,date:this.state.selectedDate}
        this.getVocabularyByDate(information);
        this.setState({newWord:"",meaning:"",type: ""});
        this.setState({selectWord:[]})
      }
    };
    chooseWord(e,vocabulary){
      e.preventDefault()
      this.setState({selectWord:vocabulary});
      this.setState({showFormSelect:true});
      
    }
    btnAddVocabulary(e){
      e.preventDefault();
      const newWord = (this.state.newWord).trim();
      const meaning = (this.state.meaning).trim();
      const type = this.state.type;
      const vocabulary = {name: newWord,meaning:meaning,type: type, user_id:this.state.user_id}
      if(!newWord || !meaning || !type){
        alert("Please fill all required!!")
      }
      else{
        this.addNewVocabulary(vocabulary);
        this.setState({showFormAdd:false})
      }
    };
    btnDeleteVocabulary(e,vocabulary){
      e.preventDefault();
      if (window.confirm("Are you sure?")){
        const information = {user_id: this.state.user_id,date:this.state.selectedDate};
        this.deleteVocabulary(vocabulary,information);
        this.setState({selectWord:[]});
        this.setState({showFormSelect:false})
      }; 
    }
    //apis
    getVocabularyByDate(information){
        axios.get('/api/user/vocabulary/date/'+ information.user_id +"/" +information.date).then((res)=>{
            const result = res.data;
            this.setState({vocabulary:result});
        })
    };
    addNewVocabulary(vocabulary){
      axios.post('/api/user/vocabulary', vocabulary).then((res)=>{
        const result = res.data;
            if (result){
                alert('Add new Vocabulary successfully');
            }
            else{
                alert('Add new Vocabulary fail');
            }
      })
    };
    deleteVocabulary(vocabulary,information){
      console.log(vocabulary)
      axios.delete('/api/user/vocabulary/' + vocabulary).then((res)=>{
        const result = res.data;
            if (result){
                alert('DELETE SUCCESSFULLY');
                this.getVocabularyByDate(information);
            }
      })
    }
}
export default withRouter(Vocabulary)