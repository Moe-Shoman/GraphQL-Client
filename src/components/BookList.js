import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';

class BookList extends Component {

  displayBooks(){
    const { data } = this.props;
    if(data.loading){
      return(
        <div>
          Loading Books...
        </div>
      );
    }else {
      return data.books.map((book, i) => {
        return <li key={i}>{book.name}</li>
      });
    }
  }

  render() {
    return (
      <div className="BookList">
        <ul>
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
