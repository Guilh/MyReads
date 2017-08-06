import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import Book from './Book'

export default class SearchBooks extends Component {

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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
            {showingBooks.map((book, index) => (
              <Book
                title={book.title}
                id={book.id}
                shelf={book.shelf}
                updateShelf={this.props.updateShelf}
                authors={book.authors}
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
