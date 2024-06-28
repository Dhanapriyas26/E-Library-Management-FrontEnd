import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch reviews when the component mounts
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <div>
            <h1 style={{ color: 'white' }}>Reviews</h1>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id.timestamp} style={{ color: 'white' }}>
                        <strong style={{ color: 'white' }}>{review.username}</strong>: {review.comment}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewsList;
