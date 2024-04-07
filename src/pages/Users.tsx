import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {Link, useNavigate} from 'react-router-dom';

type UsersListResult = {
  username: string;
  is_superuser: boolean;
  id: number;
}

const Users = () => {
  const [usersList, setUsersList] = useState<UsersListResult[]>([]);
  const navigate = useNavigate();

  async function fetchUsers() {
    try {
      const response = await apiClient.get('/users/')
      if (response.data) {
        setUsersList(response.data)
      }
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div>
      <h1>Users List</h1>
      <Link className="btn btn-primary my-3" to="/users/create">Add new user</Link>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Username</th>
          <th scope="col">Is Superuser</th>
        </tr>
        </thead>
        <tbody>
        {usersList.map((user) => (
          <tr key={user.id} onClick={() => navigate(`/users/${user.id}/`)} style={{cursor: "pointer"}}>
            <th scope="row">{user.id}</th>
            <td>{user.username}</td>
            <td>{user.is_superuser.toString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users
