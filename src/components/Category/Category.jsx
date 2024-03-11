import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Home } from '@mui/icons-material';
import axios from 'axios';
import Topbar from '../Adminpanel/Topbar';
import Sidebar from '../Adminpanel/Sidebar';
import './Category.css';

const Category = () => {
  const [inputs, setInputs] = useState({
    name: '',
    offer_price: '',
    MRP: '',
    category: 'Fruits'
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const saveData = () => {
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('offer_price', inputs.offer_price);
    formData.append('MRP', inputs.MRP);
    formData.append('category', inputs.category);
    formData.append('image1', selectedImage);

    axios.post('http://localhost:3005/new', formData)
      .then((response) => {
        alert('Record saved');
        // Reset input fields after successful save
        setInputs({
          name: '',
          offer_price: '',
          MRP: '',
          category: 'Fruits'
        });
        setSelectedImage(null);
        setPreviewImage('');
      })
      .catch((error) => {
        console.error('Error saving record:', error);
      });
  };

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="add-product">
        <div className="form-container">
          <h2>Product Details</h2>
          <TextField
            label="Product Name"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
          /><br /><br />
          <TextField
            label="Offer Price"
            type="text"
            name="offer_price"
            value={inputs.offer_price}
            onChange={handleInputChange}
          /><br /><br />
          <TextField
            label="MRP"
            type="text"
            name="MRP"
            value={inputs.MRP}
            onChange={handleInputChange}
          /><br /><br />
          <FormControl>
            <InputLabel>Product Category</InputLabel>
            <Select
              name="category"
              value={inputs.category}
              onChange={handleInputChange}
            >
              <MenuItem value="Vegetables">Vegetables</MenuItem>
              <MenuItem value="Fruits">Fruits</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select><br /><br />
          </FormControl>
          <div>
            <label>Upload File</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <br /><br />
          <Button variant="contained" color="primary" onClick={saveData}>
            Add Product
          </Button>
        </div>
        {previewImage && (
          <div className="preview-container">
            <h3>Image Preview:</h3>
            <img src={previewImage} alt="Selected Image" className="preview-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
