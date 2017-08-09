import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types';

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
      {/* Some searches (like Android) do not return an 'authors' array for each book,
          which crashes the search behavior */}      
        {props.books.map((book, index) => (
          <Book
            title={book.title}
            shelf={book.shelf}
            authors={book.authors || ['Author McAuthorFace']}
            id={book.id}
            image={book.imageLinks.thumbnail}
            updateShelf={props.updateShelf}
            key={index}
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
