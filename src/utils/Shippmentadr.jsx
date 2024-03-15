import React, { useState } from 'react';
import axios from 'axios';
import Navsidebar from './Navbar/Navsidebar';
import { Typography, Button, TextField, Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { countries } from 'countries-list'; // Import the countries object
import '../utils/Shipmentadr.scss'; // Import SCSS file

const Shippmentadr = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const countryList = Object.values(countries);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  };

  const handleBackToCart = () => navigate("/Addp");

  const handleConfirmOrder = () => {
    axios.post("http://localhost:3005/address", shippingAddress)
      .then(() => { alert("Shipping address saved successfully."); 
      navigate("/orderc"); 
    })
      .catch(err => console.error('Error saving shipping address:', err));
  };
  
  return (
    <div className="shipping-address-container">
      <Navsidebar />
      <Typography variant='h4' gutterBottom>Shipping Address</Typography>
      <Grid container spacing={3}>
        {Object.entries(shippingAddress).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            {key === 'country' ? (
              <TextField
                fullWidth
                select
                label={formatLabel(key)}
                name={key}
                value={value}
                onChange={handleChange}
                className="text-field"
              >
                {countryList.map((country, index) => (
                  <MenuItem key={index} value={country.name}>{country.name}</MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                label={formatLabel(key)}
                name={key}
                value={value}
                onChange={handleChange}
                className="text-field"
              />
            )}
          </Grid>
        ))}
      </Grid>
      <div className="button-container">
        <Button variant="contained" color="primary" onClick={handleConfirmOrder}>Confirm Order</Button>
        <Button variant="outlined" color="primary" onClick={handleBackToCart} className="back-button">Back to Cart</Button>
      </div>
    </div>
  );
};

const formatLabel = (key) => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
};

export default Shippmentadr;
