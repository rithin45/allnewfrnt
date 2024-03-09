import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Navsidebar from './Navbar/Navsidebar';
import { Buffer } from 'buffer';
const Addcrt = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3005/cart")
      .then(res => {
        setCart(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  const handleRemoveFromCart = (productId) => {
    axios.delete(`http://localhost:3005/cart/${productId}`)
      .then(response => {
        setCart(cart.filter(item => item._id !== productId));
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Navsidebar />
      <Typography variant='h4' gutterBottom>
        Cart
      </Typography>
      <Grid container spacing={2}>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 150, marginBottom: '12px' }}>
                <CardActionArea>
                 
                  <CardContent>
                    {product.subc.map((subProduct, subIndex) => (
                      <div key={subIndex}>
                    <CardMedia
        component="img"
        height="140"
        image={`data:image/jpeg;base64,${subProduct.image1.data}`} // Replace imageData with your Base64 string
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
                        <Button size="small" color="secondary" onClick={() => handleRemoveFromCart(product._id)}>
                          Remove from Cart
                        </Button>
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
    </div>
  );
};

export default Addcrt;
