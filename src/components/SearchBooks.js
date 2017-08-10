import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  state = {
    searchedBooks: []
  }

  search = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({ searchedBooks: books })
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.search(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {console.log(this.state.searchedBooks)}
            {this.state.searchedBooks.map(book => (
              <Book
                book={book}
                shelf={book.shelf}
                updateShelf={this.props.updateShelf}
                key={book.id}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks
