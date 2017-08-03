import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <Bookshelf title="Currently Reading" books={this.props.books} />
            <Bookshelf title="Want to Read" books={this.props.books} />
            <Bookshelf title="Read" books={this.props.books} />
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
