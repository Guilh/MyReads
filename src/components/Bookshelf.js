import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types';

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(book => (
          <Book
            book={book}
            shelf={book.shelf}
            updateShelf={props.updateShelf}
            key={book.id}
          />
        ))}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default Bookshelf
