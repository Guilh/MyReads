import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf'

const ListBooks = (props) => {
  const currentlyReading = props.books.filter(book => book.shelf === 'currentlyReading')
  const wantToRead = props.books.filter(book => book.shelf === 'wantToRead')
  const read = props.books.filter(book => book.shelf === 'read')

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        <div>
          <Bookshelf
            title="Currently Reading"
            updateShelf={props.updateShelf}
            books={currentlyReading} />
          <Bookshelf
            title="Want to Read"
            updateShelf={props.updateShelf}
            books={wantToRead} />
          <Bookshelf
            title="Read"
            updateShelf={props.updateShelf}
            books={read} />
        </div>
      </div>

      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default ListBooks
