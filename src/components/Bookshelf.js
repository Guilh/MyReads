import React from 'react';
import Book from './Book'

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book, index) => (
          <Book
            title={book.title}
            authors={book.authors}
            image={book.imageLinks.thumbnail}
            key={index}
          />
        ))}
      </ol>
    </div>
  </div>
);

export default Bookshelf
