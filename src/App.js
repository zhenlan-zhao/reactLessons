import React from 'react'
import logo from './logo.svg';
import Comment from './components/Comment';
import Constants from './components/Constants';
import Clock from './components/Clock';
import LoginControl,{Page} from './components/LoginControl'
import ListNumbers from './components/List';
import FormComponent from './components/Form';
import Calculator from './components/Temperature';
import {SignUpDialog} from './components/Combination';
import StockFilter from './components/StockFilter'
import {ErrorApp} from './components/further/ErrorBoudary'
import './App.css';

const myComment = Constants.comment;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
          <Comment date={myComment.date} text={myComment.text} author={myComment.author}/>
          <Clock/>
          <LoginControl/>
          <Page/>
          <ListNumbers numbers={Constants.listNums}/>
          <FormComponent/>
          <Calculator/>
          <SignUpDialog/>
          <StockFilter products={Constants.product}/>
          <div>
            <ErrorApp/>  
          </div>
      </main>

    </div>
  );
}

export default App;