import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    this.fetchBooks()
  }

  // componentWillReceiveProps() {
  //   this.fetchBooks()
  // }

  fetchBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  search = (query) => {
    BooksAPI.search(query).then(books => this.updateResults(books))
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.fetchBooks())
  }

  updateResults(searchResults) {
     const booksInLibrary = this.state.books.map(b => b.id)
     searchResults.forEach(book => {
       booksInLibrary.includes(book.id) && (
         book.shelf = this.state.books.filter(b => b.id === book.id)[0].shelf
       )
     })
     this.setState({searchedBooks: searchResults})
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.searchedBooks}
            search={this.search}
            updateShelf={this.updateShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
