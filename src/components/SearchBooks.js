import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import Book from './Book'

class SearchBooks extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  performSearch = (query) => {
    BooksAPI.search(query).then(searchedBooks => {
      this.setState({ searchedBooks })
    })
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.performSearch(this.state.query);
    e.currentTarget.reset();
  }

  render() {
    let showingBooks;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = this.state.searchedBooks.filter(book => match.test(book.title))
    } else {
      showingBooks = this.state.searchedBooks
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={e => this.updateQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* Some searches (like Android) do not return an 'authors' array for each book,
                which crashes the search behavior */}
            {showingBooks.map((book, index) => (
              <Book
                title={book.title}
                id={book.id}
                updateShelf={this.props.updateShelf}
                authors={book.authors ? book.authors : ['Author McAuthorFace']}
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
