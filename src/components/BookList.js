import React, { Component } from "react";
import { Card, Table, ButtonGroup, Button, Form, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faList,
  faTimes,
  faExpand,
  faSave,
  faBan
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import { Link } from "react-router-dom";
import Modal from "react-modal"; 

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      selectedGenre: 'All',
      genres: ['All', 'Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Horror'],
      showDeleteToast: false,
      showModal: false,
      selectedBook: null,
      searchQuery: '',
      editMode: null, // State to track editable mode for each book
      editedValues: {}, // State to store edited values for each book
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    const { selectedGenre, searchQuery } = this.state;
    const url = selectedGenre === 'All'
      ? `http://localhost:8080/books/search?query=${searchQuery}`
      : `http://localhost:8080/books?genre=${selectedGenre}&query=${searchQuery}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ books: data }));
  };

  deleteBook = (bookId) => {
    axios.delete("http://localhost:8080/book/" + bookId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ showDeleteToast: true });
          setTimeout(() => this.setState({ showDeleteToast: false }), 3000);
          this.setState({
            books: this.state.books.filter((book) => book.id !== bookId),
          });
        } else {
          this.setState({ showDeleteToast: false });
        }
      });
  };

  openModal = (book) => {
    this.setState({
      showModal: true,
      selectedBook: book,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedBook: null,
    });
  };

  handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    this.setState({ searchQuery }, () => {
      this.fetchBooks();
    });
  };

  toggleEditMode = (bookId) => {
    this.setState((prevState) => ({
      editMode: prevState.editMode === bookId ? null : bookId,
      editedValues: prevState.editMode === bookId ? {} : { [bookId]: { ...prevState.books.find(book => book.id === bookId) } }
    }));
  };

  handleFieldChange = (e, bookId, fieldName) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      editedValues: {
        ...prevState.editedValues,
        [bookId]: {
          ...prevState.editedValues[bookId],
          [fieldName]: value
        }
      }
    }));
  };

  saveEditedBook = (bookId) => {
    const editedBook = this.state.editedValues[bookId];
    axios.put(`http://localhost:8080/book/${bookId}`, editedBook)
      .then((response) => {
        if (response.data != null) {
          const updatedBooks = this.state.books.map(book =>
            book.id === bookId ? response.data : book
          );
          this.setState({
            books: updatedBooks,
            editMode: null,
            editedValues: {}
          });
        }
      });
  };

  cancelEdit = (bookId) => {
    this.setState((prevState) => ({
      editMode: null,
      editedValues: {},
    }));
  };
  render() {
    const { books, selectedBook, showModal, showDeleteToast, searchQuery, editMode, editedValues } = this.state;
    const { isAdmin } = this.props;
  
    return (
      <div>
        <div style={{ display: showDeleteToast ? "block" : "none" }}>
          <MyToast
            show={showDeleteToast}
            message={"Book was deleted successfully."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <Form inline className="float-right">
              <Form.Group controlId="genreDropdown">
                <Form.Label className="mr-2">Genre:</Form.Label>
                <Dropdown onSelect={(selectedGenre) => this.setState({ selectedGenre }, this.fetchBooks)}>
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    {this.state.selectedGenre}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {this.state.genres.map((genre) => (
                      <Dropdown.Item key={genre} eventKey={genre}>
                        {genre}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Form>
            <Form inline className="text-center">
              <Form.Group controlId="searchInput">
                <Form.Label className="mr-2">Search:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by title, author, ISBN, etc."
                  value={searchQuery}
                  onChange={this.handleSearchChange}
                />
              </Form.Group>
            </Form>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN Number</th>
                  <th>Rating</th>
                  <th>Genre</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">{books.length}</td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <Link to="#" onClick={() => this.openModal(book)}>{book.title}</Link>
                      </td>
                      <td>
                        {editMode === book.id ? (
                          <input
                            type="text"
                            value={editedValues[book.id]?.author ?? book.author}
                            onChange={(e) => this.handleFieldChange(e, book.id, 'author')}
                          />
                        ) : (
                          <span>{book.author}</span>
                        )}
                      </td>
                      <td>
                        {editMode === book.id ? (
                          <input
                            type="text"
                            value={editedValues[book.id]?.isbn ?? book.isbn}
                            onChange={(e) => this.handleFieldChange(e, book.id, 'isbn')}
                          />
                        ) : (
                          <span>{book.isbn}</span>
                        )}
                      </td>
                      <td>
                        {editMode === book.id ? (
                          <input
                            type="text"
                            value={editedValues[book.id]?.rating ?? book.rating}
                            onChange={(e) => this.handleFieldChange(e, book.id, 'rating')}
                          />
                        ) : (
                          <span>{book.rating}</span>
                        )}
                      </td>
                      <td>
                        {editMode === book.id ? (
                          <input
                            type="text"
                            value={editedValues[book.id]?.genre ?? book.genre}
                            onChange={(e) => this.handleFieldChange(e, book.id, 'genre')}
                          />
                        ) : (
                          <span>{book.genre}</span>
                        )}
                      </td>
                      {isAdmin && (
                        <td>
                          <ButtonGroup>
                            {editMode === book.id ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  onClick={() => this.saveEditedBook(book.id)}
                                >
                                  <FontAwesomeIcon icon={faSave} />
                                </Button>{" "}
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  onClick={() => this.cancelEdit(book.id)}
                                >
                                  <FontAwesomeIcon icon={faBan} />
                                </Button>{" "}
                              </>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => this.toggleEditMode(book.id)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                            )}
                            {" "}
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => this.deleteBook(book.id)}
                            >
                              Delete <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </ButtonGroup>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
  
        {/* Modal for displaying PDF content */}
        <Modal
          isOpen={showModal}
          onRequestClose={this.closeModal}
          contentLabel="Book PDF Modal"
          style={{
            overlay: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
            content: {
              position: 'absolute',
              top: '10px',
              right: '10px',
              bottom: '10px',
              left: '10px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
            },
          }}
        >
          {selectedBook && (
            <div>
              <div style={{ float: 'right', cursor: 'pointer' }}>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => {
                    this.closeModal();
                    this.setState({ showModal: false });
                  }}
                  style={{ marginRight: '20px' }}
                />
              </div>
              <h2>{selectedBook.title}</h2>
              <iframe
                title="Book PDF Viewer"
                src={selectedBook.pdfUrl}
                width="100%"
                height="500px"
              ></iframe>
            </div>
          )}
        </Modal>
      </div>
    );
  
     }
}
