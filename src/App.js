import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './css/styles.css'; // Import global styles if any
import LoginForm from './components/Auth/LoginForm';
import Navbar from './components/Navbar/Navbar'; // Assuming you have a Navbar component
import Dashboard from './components/Dashboard/Dashboard';
import CreateProductForm from './components/Pages/Products';
import OrderList from './components/Pages/OrderList';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    const tokenExists = cookies.split(';').some(cookie => cookie.trim().startsWith('token='));

    if (tokenExists) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          {/* Check if the user is authenticated */}
          {isAuthenticated ? (
            // Protected Routes (Available only to authenticated users)
            <>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}

              <Route path="/login" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<CreateProductForm />} />
              <Route path="/sale-orders" element={<OrderList />} />
              {/* <Route path="*" element={<Dashboard />} /> */}
            </>
          ) : (
            // Public Routes (Available to all users)
            <>
              <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
              {/* <Route path="/" element={<Home />} /> */}

              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
