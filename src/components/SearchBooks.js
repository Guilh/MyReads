import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

const SearchBooks = (props) => {

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={e => props.search(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.books.map(book => (
            <Book
              book={book}
              updateShelf={props.updateShelf}
              key={book.id}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

SearchBooks.propTypes = {
  search: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default SearchBooks
