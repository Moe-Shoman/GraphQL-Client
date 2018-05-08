import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  displayAuthors(){
    const { getAuthorsQuery } = this.props;
    if(getAuthorsQuery.loading){
      return(
        <option disabled>
          Loading Authors...
        </option>
      );
    }else {
      return getAuthorsQuery.authors.map((author, i) => {
        return <option key={i} value={author.id}>{author.name}</option>
      });
    }
  }

  onChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    this.setState({
      [name] : value
    })
  }

  submitBook = (e) => {
    console.log('submitting book');
    e.preventDefault();
    const { name, authorId, genre }  = this.state;
    this.props.addBookMutation({
      variables: {
        name,
        authorId,
        genre
      },
      refetchQueries:[{ query: getBooksQuery }]
    })
  }

  render() {
    return (
        <form className="add-book">
          <div>
            <label>Book name:</label>
            <input type="text" onChange={this.onChange} name="name"/>
          </div>
          <div>
            <label>Genre:</label>
            <input type="text" onChange={this.onChange} name="genre"/>
          </div>
          <div>
            <label>Author:</label>
            <select onChange={this.onChange} name="authorId">
              <option>Select author</option>
              {this.displayAuthors()}
            </select>
          </div>

          <button onClick={this.submitBook}>ADD</button>
        </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, {name: "addBookMutation" })
)(AddBook);
