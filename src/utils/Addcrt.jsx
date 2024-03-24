import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Drawer, IconButton } from '@mui/material';
import Navsidebar from './Navbar/Navsidebar';
import { useNavigate } from 'react-router-dom'; 
import '../utils/cart.scss';
import { AiOutlineClose } from 'react-icons/ai'; 

const Addcrt = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get("http://localhost:3005/cart")
      .then(res => {
        setCart(res.data);
        calculateTotalAmount(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    cartItems.forEach(product => {
      product.subc.forEach(subProduct => {
        total += (subProduct.offer_price || 0) * (subProduct.quantity || 1);
      });
    });
    setTotalAmount(total);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const proceedToPayment = () => {
    setOpen(false); 
    navigate("/ship");
    clearCart();
  };

  const clearCart = () => {
    axios.delete("http://localhost:3005/cart")
      .then(res => {
        setCart([]); 
      })
      .catch(err => console.log(err));
  };

  const deleteItem = (_id) => {
    axios.delete(`http://localhost:3005/cart/${_id}`)
      .then(res => {
        // Update cart after deletion
        setCart(cart.filter(product => product._id !== _id)); 
        calculateTotalAmount(cart.filter(product => product._id !== _id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Navsidebar />
      <Typography variant='h4' gutterBottom>
        Cart
      </Typography>
      <div className='total-amount'>
        Total Amount: ${totalAmount}
        <Button variant="contained" color="primary" onClick={handleOpen}>Proceed to Payment</Button>
      </div>
      
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <div style={{ width: '300px', padding: '20px' }}>
          <IconButton onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <AiOutlineClose />
          </IconButton>
          <Typography variant="h6" gutterBottom>Confirmation</Typography>
          <Typography variant="body1">
            Are you sure you want to proceed to payment?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total Amount: ${totalAmount}
          </Typography>
          <Button onClick={proceedToPayment} color="primary" style={{ marginTop: '20px' }}>Proceed</Button>
        </div>
      </Drawer>
      
      <Grid container spacing={2}>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <Grid item key={index} xs={20} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 150, marginBottom: '12px' }}>
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
                          Offer Price: {subProduct.offer_price || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          MRP: {subProduct.MRP || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Category: {subProduct.category || 'N/A'}
                        </Typography>
                      </div>
                    ))}
                    <Button variant="outlined" color="secondary" onClick={() => deleteItem(product._id)}>Delete</Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Cart is empty</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Addcrt;
