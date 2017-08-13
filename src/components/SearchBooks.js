import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    searchedBooks: []
  }

  updateResults(searchResults) {
     const inMyReads = this.props.books.map(b => b.id)
     searchResults.forEach(book => {
       inMyReads.includes(book.id) && (
         book.shelf = this.props.books.filter(b => b.id === book.id)[0].shelf
       )
     })
     this.setState({ searchedBooks: searchResults })
  }

  search = (query) => {
    BooksAPI.search(query).then(books => this.updateResults(books))
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
            {this.state.searchedBooks.map(book => (
              <Book
                book={book}
                updateShelf={this.props.updateShelf}
                key={book.id}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
