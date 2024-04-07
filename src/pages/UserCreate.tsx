import {useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
  is_superuser: boolean;
}

const UserCreate = () => {
  const {register, handleSubmit} = useForm();
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate();

  const onSubmit = async (data: Inputs) => {
    try {
      await apiClient.post('/users/', data);
      navigate("/users/");
    } catch (error) {
      setMessage(error?.response?.data.detail);
    }
  }

  return (
    <div>
      <h1>Create new user</h1>
      {message && (
        <div className="alert alert-danger" role="alert">{message}</div>
      )}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input {...register("username")} type="text" className="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input {...register("password")} type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3 form-check">
          <input {...register("is_superuser")} type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Is superuser</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default UserCreate
