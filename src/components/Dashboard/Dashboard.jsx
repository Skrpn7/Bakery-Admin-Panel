import React, { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "../../Config/Backendurl";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${Backend_Url}/OrderDetail`);
      setOrders(response.data.Result);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtered orders based on selected filter
  const now = new Date();
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    if (filter === "Day") {
      return orderDate.toDateString() === now.toDateString();
    } else if (filter === "Month") {
      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    } else if (filter === "Year") {
      return orderDate.getFullYear() === now.getFullYear();
    }
    return true; // All
  });

  // 📊 Pie chart data - Order Status
  const pieData = [
    { name: "Pending", value: filteredOrders.filter(o => o.OrderStatus === "Pending").length },
    { name: "Confirmed", value: filteredOrders.filter(o => o.OrderStatus === "Confirmed").length },
    { name: "Shipped", value: filteredOrders.filter(o => o.OrderStatus === "Shipped").length },
    { name: "Delivered", value: filteredOrders.filter(o => o.OrderStatus === "Delivered").length },
    { name: "Cancelled", value: filteredOrders.filter(o => o.OrderStatus === "Cancelled").length },
  ];

  // 📈 Bar chart data - Sales Amount (by order)
  const barData = filteredOrders.map((order) => ({
    name: `#${order.id}`,
    TotalAmount: parseFloat(order.TotalAmount),
  }));

  // 💰 Calculate Grand Total
  const grandTotal = filteredOrders.reduce((sum, order) => sum + parseFloat(order.TotalAmount), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {/* Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Day">Today</option>
          <option value="Month">This Month</option>
          <option value="Year">This Year</option>
        </select>
      </div>

      {/* Charts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
        {/* Pie Chart */}
        <div style={{ flex: "1 1 400px", height: 400 }}>
          <h3>Order Status</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{ flex: "1 1 600px", height: 400 }}>
          <h3>Total Sales (₹)</h3>
          
          {/* Grand Total Display */}
          <div style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "18px" }}>
            Grand Total: ₹ {grandTotal.toFixed(2)}
          </div>

          <ResponsiveContainer>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="TotalAmount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
