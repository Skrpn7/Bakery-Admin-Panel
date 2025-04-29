import React, { useState } from "react";
import axios from "axios";
import Backend_Url from "../../Config/Backendurl";
import ProductList from "./ProductList";

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Desc, setDesc] = useState("");
  const [IsBread, setIsBread] = useState("");
  const [Image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger

    const formData = new FormData();
    formData.append("name", name);
    formData.append("Price", Price);
    formData.append("Desc", Desc);
    formData.append("IsBread", IsBread);
    formData.append("Image", Image);
    const getTokenFromCookie = () => {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match ? match[2] : null;
      };
      const token = getTokenFromCookie();
    try {
      const response = await axios.post(
        `${Backend_Url}/products/Create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product created successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Error creating product");
      console.error(error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="product-form">
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Price:</label>
        <input type="text" value={Price} onChange={(e) => setPrice(e.target.value)} required />
      </div>

      <div>
        <label>Description:</label>
        <input type="text" value={Desc} onChange={(e) => setDesc(e.target.value)} required />
      </div>

      <div>
        <label>Type:</label>
        <select value={IsBread} onChange={(e) => setIsBread(e.target.value)} required>
          <option value="">-- Select Type --</option>
          <option value="IsBread">IsBread</option>
          <option value="IsCookies">IsCookies</option>
        </select>
      </div>

      <div>
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      </div>

      <button type="submit">Create Product</button>
      <button type="button" onClick={() => setShowModal(true)} style={{ marginLeft: '10px' }}>
        Show All Products
      </button>
    </form>

    {showModal && (
      <div className="modal-backdrop" onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={() => setShowModal(false)}>X</button>
          <ProductList />
        </div>
      </div>
    )}
  </>
  );
};

export default CreateProductForm;
