import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {Link, useNavigate} from 'react-router-dom';

type ReviewsListResult = {
  id: number;
  text: string;
  rating: number;
  user_id: number;
  reviewer_id: number;
}

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState<ReviewsListResult[]>([]);
  const navigate = useNavigate();

  async function fetchOrders() {
    try {
      const response = await apiClient.get('/reviews/')
      if (response.data) {
        setReviewsList(response.data)
      }
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div>
      <h1>Orders List</h1>
      <Link className="btn btn-primary my-3" to="/reviews/create">Add new review</Link>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">User ID</th>
          <th scope="col">Reviewer ID</th>
          <th scope="col">Rating</th>
        </tr>
        </thead>
        <tbody>
        {reviewsList.map((review) => (
          <tr key={review.id} onClick={() => navigate(`/reviews/${review.id}/`)} style={{cursor: "pointer"}}>
            <th scope="row">{review.id}</th>
            <td>{review.user_id}</td>
            <td>{review.reviewer_id}</td>
            <td>{review.rating}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reviews
