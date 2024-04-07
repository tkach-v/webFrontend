import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {useParams} from "react-router-dom";

type Review = {
  id: number;
  text: string;
  rating: number;
  user_id: number;
  reviewer_id: number;
}

const ReviewDetails = () => {
  const { id } = useParams();

  const [review, setReview] = useState<Review | null>(null)

  useEffect(() => {
    fetchReviewInfo();
  }, [])

  async function fetchReviewInfo() {
    try {
      const response = await apiClient.get(`/reviews/${id}`)
      if (response.data) {
        setReview(response.data)
      }
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  return (
    <div>
      <h1>Review Information</h1>
      <div>Text: {review?.text}</div>
      <div>Rating: {review?.rating}</div>
      <div>User ID: {review?.user_id}</div>
      <div>Reviewer ID: {review?.reviewer_id}</div>
    </div>
  );
}

export default ReviewDetails
