import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Navsidebar from './Navbar/Navsidebar';
import { useNavigate } from 'react-router-dom';

const OrderReview = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchShippingAddress();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3005/cart");
      setCart(response.data);
      calculateTotalAmount(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    cartItems.forEach(product => {
      product.subc.forEach(subProduct => {
        total += (subProduct.offer_price || 0) * (subProduct.quantity || 1);
      });
    });
    setTotalAmount(total);
  };

  const fetchShippingAddress = async () => {
    try {
      const response = await axios.get('http://localhost:3005/address');
      setShippingAddress(response.data);
    } catch (error) {
      console.error('Error fetching shipping address:', error);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        cartItems: cart,
        totalAmount: totalAmount,
        shippingAddress: shippingAddress,
        codInfo: 'Cash on Delivery' // Example COD information
      };

      const response = await axios.post('http://localhost:3005/order', orderData);
      if (response.data.success) {
        alert('Order placed successfully.');
        navigate('/');
        // Redirect or perform other actions as needed
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  const handleEditCart = () => {
    // Redirect to the cart page for editing
    navigate('/Addc');
  };

  return (
    <div>
      <Navsidebar />
      <Typography variant='h4' gutterBottom>
        Order Review
      </Typography>
      
      {/* Display Cart Items */}
      <Grid container spacing={2}>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <Grid item key={index} xs={20} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 300, marginBottom: '12px' }}>
                <CardActionArea>
                  <CardContent>
                    {product.subc.map((subProduct, subIndex) => (
                      <div key={subIndex}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`data:image/jpeg;base64,${subProduct.image1.data}`}
                          alt="Product Image"
                        />
                        <Typography gutterBottom variant="h5" component="div">
                          {subProduct.name || 'Unknown Product'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Price: {subProduct.offer_price || 'N/A'}
                        </Typography>
                        
                      </div>
                    ))}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Cart is empty</Typography>
        )}
      </Grid>

      {/* Display Shipping Address */}
      {/* <Typography variant='h5' gutterBottom>
        Shipping Address
      </Typography>
      <Typography variant="body1">Full Name: {shippingAddress.fullName}</Typography>
      <Typography variant="body1">Address Line 1: {shippingAddress.addressLine1}</Typography>
      <Typography variant="body1">Address Line 2: {shippingAddress.addressLine2}</Typography>
      <Typography variant="body1">City: {shippingAddress.city}</Typography>
      <Typography variant="body1">Postal Code: {shippingAddress.postalCode}</Typography>
      <Typography variant="body1">Country: {shippingAddress.country}</Typography> */}

      <div style={{ marginTop: '20px' }}>
        <div className='total-amount'>
          Total Amount: ${totalAmount}
        </div>
        <Button variant="contained" color="primary" onClick={handleEditCart}>
          Edit Cart
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmitOrder} style={{ marginLeft: '10px' }}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderReview;