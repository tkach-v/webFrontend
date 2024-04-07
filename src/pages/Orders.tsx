import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {Link, useNavigate} from 'react-router-dom';

type OrdersListResult = {
  id: number;
  title: string;
  description: string;
  customer_id: number;
  performer_id: number;
  completed: boolean;
}

const Orders = () => {
  const [ordersList, setOrdersList] = useState<OrdersListResult[]>([]);
  const navigate = useNavigate();

  async function fetchOrders() {
    try {
      const response = await apiClient.get('/orders/')
      if (response.data) {
        setOrdersList(response.data)
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
      <Link className="btn btn-primary my-3" to="/orders/create">Add new order</Link>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Completed</th>
        </tr>
        </thead>
        <tbody>
        {ordersList.map((order) => (
          <tr key={order.id} onClick={() => navigate(`/orders/${order.id}/`)} style={{cursor: "pointer"}}>
            <th scope="row">{order.id}</th>
            <td>{order.title}</td>
            <td>{order.completed.toString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders
