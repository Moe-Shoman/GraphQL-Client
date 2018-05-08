import React, { Component } from 'react';
import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

class App extends Component {
  render() {
    return (
      <div className="App">
        Muhammad's Reading list
        <BookList />
        <AddBook />
      </div>
    );
  }
}

export default App;
