import React, { useState } from 'react';
import axios from 'axios';
import Navsidebar from './Navbar/Navsidebar';
import { Typography, Button, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Shippmentadr = () => {
  const navigate = useNavigate();
  var[shippingAddress, setShippingAddress]=useState({
    "fullName": '',
    "addressLine1": '',
    "addressLine2": '',
    "city": '',
    "postalCode": '',
    "country": ''
  })

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setShippingAddress(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };
  const handleChange =(event) =>{
    const{name,value}=event.target
    setShippingAddress((shippingAddress)=>({...shippingAddress,[name]:value}))
    console.log(setShippingAddress)
  }

  const handleBackToCart = () => {
    navigate("/Addp");
  };

  // const handleConfirmOrder = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3005/address', shippingAddress);
  //     console.log(response.data); 
  //     navigate("/orderc");
  //   } catch (error) {
  //     console.error('Error processing order:', error);
  //   }
  // };
  const handleConfirmOrder=() =>{
    console.log("Clicked")

    console.log(shippingAddress)
    axios.post("http://localhost:3005/address",shippingAddress)
    .then((response)=>{
      alert("Record Saved")
      navigate("/orderc");
    })
    .catch(err=>console.log(err))
    
}



  return (
    <div>
      <Navsidebar />
      <Typography variant='h4' gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={shippingAddress.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address Line 1"
            name="addressLine1"
            value={shippingAddress.addressLine1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address Line 2"
            name="addressLine2"
            value={shippingAddress.addressLine2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={shippingAddress.country}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
          Confirm Order
        </Button>
        <Button variant="outlined" color="primary" onClick={handleBackToCart} style={{ marginLeft: '10px' }}>
          Back to Cart
        </Button>
      </div>
    </div>
  );
};

export default Shippmentadr;
