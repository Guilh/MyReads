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
      console.log(this.state.searchedBooks)
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
            {/* Some searches (like Android) do not return an 'authors' array for each book,
                which crashes the search behavior */}
            {this.state.searchedBooks.map((book, index) => (
              <Book
                title={book.title}
                id={book.id}
                updateShelf={this.props.updateShelf}
                authors={book.authors || ['Author McAuthorFace']}
                image={book.imageLinks.thumbnail}
                key={index}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks
