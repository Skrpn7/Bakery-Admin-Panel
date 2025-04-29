import React, { useEffect, useState } from "react";
import axios from "axios";
import Backend_Url from "../../Config/Backendurl";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${Backend_Url}/products/`);
      setProducts(response.data.Result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  
  const handleDelete = async (id) => {
    try {
      const token = getCookie("token"); // replace 'token' with your actual cookie name
  
      await axios.delete(`${Backend_Url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
    }
  };



  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-table-container">
      <h2>All Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Type</th>
            <th>Image ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.Price}</td>
              <td>{product.Desc}</td>
              <td>{product.IsBread}</td>
              <td>{product.images[0]?.id || 'N/A'}</td>
              <td>
                <button onClick={() => handleDelete(product.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
