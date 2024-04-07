import {useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom";

type Inputs = {
  text: string;
  rating: number;
  user_id: number;
  reviewer_id: number;
}

const ReviewCreate = () => {
  const {register, handleSubmit} = useForm();
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    try {
      await apiClient.post('/reviews/', data);
      navigate("/reviews/");
    } catch (error) {
      if (Array.isArray(error?.response?.data?.detail)) {
        setMessage(error?.response?.data?.detail[0].msg);
      } else {
        setMessage(error?.response?.data?.detail);
      }
    }
  }

  return (
    <div>
      <h1>Create a new review</h1>
      {message && (
        <div className="alert alert-danger" role="alert">{message}</div>
      )}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Text</label>
          <input {...register("text")} type="text" className="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Rating</label>
          <input {...register("rating")} type="number" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">User ID</label>
          <input {...register("user_id")} type="number" className="form-control" id="exampleInputPassword2"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword3" className="form-label">Reviewer ID</label>
          <input {...register("reviewer_id")} type="number" className="form-control" id="exampleInputPassword3"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ReviewCreate
