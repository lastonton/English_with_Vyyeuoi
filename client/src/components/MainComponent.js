import React, { Component } from 'react';
import Menu from './MenuComponent';
import Question from './QuestionComponent';
import ManageQuestion from './ManageQuestion';
import VocabularyComponent from './VocabularyComponent';
import FlashCardComponent from './FlashCardComponent';
import HomeComponent from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';

class Main extends Component {
    render() {
      return (
        <div className="body-customer">
          <Menu />
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<HomeComponent/>}/>
            <Route path='/question' element={<Question />} />
            <Route path='/question/task/:cid' element={<Question item="task"/>}/>
            <Route path='/manage/task/:cid' element={<ManageQuestion />}/>
            <Route path='/vocabulary' element={<VocabularyComponent />}/>
            <Route path='/flashcard' element={<FlashCardComponent />}/>
            {/* <Route path='/product/category/:cid' element={<Product />} />
            <Route path='/product/category2/:cid' element={<Product item="category2" />} />
            <Route path='/product/search/:keyword' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/active' element={<Active />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myprofile' element={<Myprofile />} />
            <Route path='/mycart' element={<Mycart />} />
            <Route path='/myorders' element={<Myorders />} /> */}
          </Routes>
        </div>
      );
    }
  }
  export default Main;