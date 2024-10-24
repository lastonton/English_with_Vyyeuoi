import axios from "axios";
import React, {Component} from "react";
// import {Link} from "react-router-dom";
import withRouter from "../utils/withRouter";

class FlashCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id:"66eb906da32703288c3b8908",
            currentIndex:0,
            isFlipped: false,
            vocabularyData:[],
        };
        
    };
    render() {
        const currentCard = this.state.vocabularyData[this.state.currentIndex]
        return(
            <div className="flashcard-page">
                
            <h1>Vocabulary Flashcards</h1>
            {this.state.vocabularyData.length > 0 ? <div className={`flashcard ${this.state.isFlipped ? 'flipped' : ''}`} onClick={(e)=>this.flipCard(e)}>
              {!this.state.isFlipped ? (
                <div className="front">
                  <h2>{currentCard.name}</h2>
                  <p>Click to flip</p>
                </div>
              ) : (
                <div className="back">
                  <p><strong>Meaning:</strong> {currentCard.meaning}</p>
                  <p><strong>Type:</strong> {currentCard.type}</p>
                </div>
              )}
            </div> : <></>}
            {/* Flashcard */}
            {/* Nút điều hướng */}
            <div className="navigation-buttons">
              <button className="button-voca" onClick={(e)=>this.prevCard(e)} disabled={this.state.currentIndex === 0}>
                Previous
              </button>
              <button className="button-voca" onClick={(e)=>this.nextCard(e)} disabled={this.state.currentIndex === this.state.vocabularyData.length - 1}>
                Next
              </button>
            </div>
          </div>
        )
    };
    //event handlers
    componentDidMount(){
        this.getVocabulary(this.state.user_id);
        console.log(this.state.vocabularyData)
    };
    
    flipCard(e){
        e.preventDefault();
        this.setState({isFlipped:!this.state.isFlipped})
    };
    nextCard(e){
        e.preventDefault();
        this.setState({isFlipped:false});
        if (this.state.currentIndex < this.state.vocabularyData.length - 1) {
            this.setState({currentIndex: this.state.currentIndex + 1});
        }
    };
    prevCard(e){
        e.preventDefault();
        this.setState({isFlipped:false});
        if (this.state.currentIndex  >0) {
            this.setState({currentIndex: this.state.currentIndex - 1});
        }
    };  
    //apis
    getVocabulary(user_id){
        axios.get('/api/user/vocabulary/' + user_id).then((res)=>{
            const result = res.data;
            this.setState({vocabularyData:result});
        })
    }

}
export default withRouter(FlashCard)