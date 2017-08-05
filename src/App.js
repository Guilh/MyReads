import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelf: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books,
      })
    })
  }

  performSearch = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({ books })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      this.setState({ books })
    })
  }

  componentWillUnmount() {
    this.setState({ books: [] })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            shelf={this.state.shelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            onSearch={this.performSearch}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
