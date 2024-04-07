import {useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom";

type Inputs = {
  title: string;
  description: string;
  customer_id: number;
  performer_id: number;
  completed: boolean;
}

const OrderCreate = () => {
  const {register, handleSubmit} = useForm();
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    try {
      await apiClient.post('/orders/', data);
      navigate("/orders/");
    } catch (error) {
      setMessage(error?.response?.data.detail);
    }
  }

  return (
    <div>
      <h1>Create a new order</h1>
      {message && (
        <div className="alert alert-danger" role="alert">{message}</div>
      )}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input {...register("title")} type="text" className="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input {...register("description")} type="text" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Customer ID</label>
          <input {...register("customer_id")} type="number" className="form-control" id="exampleInputPassword2"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword3" className="form-label">Performer ID</label>
          <input {...register("performer_id")} type="number" className="form-control" id="exampleInputPassword3"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default OrderCreate
