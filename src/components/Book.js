import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageLinks: PropTypes.object.isRequired,
      authors: PropTypes.array.isRequired,
      id: PropTypes.string.isRequired
   }),
   updateShelf: PropTypes.func.isRequired
  }

  state = {
    shelf: this.props.book.shelf
  }

  updateValue = (value) => {
    this.setState({ shelf: value })
    this.props.updateShelf({id: this.props.book.id}, value)
  }

  render() {
    const { book } = this.props
    console.log(this.state.shelf)
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf || 'none'} onChange={e => this.updateValue(e.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            { book.authors ? book.authors.join(", ") : ''}
          </div>
        </div>
      </li>
    )
  }
}

export default Book
