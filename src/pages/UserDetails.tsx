import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";
import { useNavigate, useParams } from "react-router-dom";

type UserType = {
  username: string;
  password: string;
  is_superuser: boolean;
}

const UserDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState<UserType | null>(null)
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, [])

  async function fetchUserInfo() {
    try {
      const response = await apiClient.get(`/users/${id}`)
      if (response.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  const onUpdate = async () => {
    try {
      await apiClient.patch(`/users/${id}`, user);
      fetchUserInfo();
    } catch (error) {
      setMessage(error?.response?.data.detail);
    }
  }

  const onDelete = () => {
    apiClient.delete(`/users/${id}`);
    navigate("/users/");
  }

  return (
    <div>
      <h1>User Information</h1>
      {message && (
        <div className="alert alert-danger" role="alert">{message}</div>
      )}
      <form onSubmit={(() => onUpdate())}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1"
                 aria-describedby="emailHelp" value={user?.username || ''}
                 onChange={(e) => setUser({...user, username: e.target.value})}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"
                 onChange={(e) => setUser({...user, password: e.target.value})}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={user?.is_superuser || false}
                 onChange={(e) => setUser({...user, is_superuser: e.target.checked})}/>
          <label className="form-check-label" htmlFor="exampleCheck1">Is superuser</label>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-danger" onClick={() => onDelete()}>Delete User</button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails
