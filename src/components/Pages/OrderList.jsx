import React, { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "../../Config/Backendurl";
import Swal from "sweetalert2";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${Backend_Url}/OrderDetail`);
      setOrders(response.data.Result);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };



  const updateOrderStatus = async (orderId, updatedFields) => {
    try {
      debugger
      await axios.put(`${Backend_Url}/OrderDetail/${orderId}`, updatedFields);
      fetchOrders(); // Refresh orders after update

      // Show SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Order updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating order:", error);

      // Optional: Show SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the order.",
      });
    }
  };



  useEffect(() => {
    fetchOrders();
  }, []);

  const orderStatusOptions = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
  const paymentStatusOptions = ["Unpaid", "Paid", "Failed"];

  return (
    <div className="order-table-container">
      <h2>All Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Payment Mode</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Products</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.Username}</td>
              <td>{order.Contact}</td>
              <td>{order.Address}</td>
              <td>{order.Quantity}</td>
              <td>₹{order.TotalAmount}</td>
              <td>{order.ModeOfPayment}</td>
              {/* OrderStatus Dropdown */}
              <td>
                <select
                  value={order.OrderStatus}
                  onChange={(e) =>
                    updateOrderStatus(order.id, { OrderStatus: e.target.value })
                  }
                >
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>


              {/* PaymentStatus Dropdown */}
              <td>
                <select
                  value={order.PaymentStatus}
                  onChange={(e) =>
                    updateOrderStatus(order.id, { PaymentStatus: e.target.value })
                  }
                >
                  {paymentStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>

             
              <td>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {order.ProductDetails.map((p, i) => (
                    <li key={i}>
                      {p.name ? `${p.name}` : `Product #${p.productId}`} × {p.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
