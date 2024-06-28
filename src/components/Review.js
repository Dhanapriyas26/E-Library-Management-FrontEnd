import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewForm = () => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch the list of available books when the component mounts
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/review', { username, comment, selectedBook });
            // Handle success, e.g., show a success message or redirect
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div style={styles.reviewFormContainer}>
            <h2>Write a Review</h2>
            <form>
                <label style={styles.label}>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <label style={styles.label}>Select Book:</label>
                <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    style={styles.input}
                >
                    <option value="">Select a book</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
                <label style={styles.label}>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={styles.input}
                />
                <button type="button" onClick={handleSubmit} style={styles.button}>
                    Submit Review
                </button>
            </form>
        </div>
    );
};
const styles = {
    reviewFormContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        //backgroundColor: '#ffffff', // Set background color to white
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '2px 2px 5px #61dafb',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4caf50', // Set button color to green
        color: '#fff', // Set text color to white
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};    
export default ReviewForm;
