import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import{Buffer} from 'buffer';
import Navsidebar from './Navbar/Navsidebar';


const Addpro = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3005/view")
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleAddToCart = (productId) => {
    axios.post(`http://localhost:3005/addtocart/${productId}`)
      .then(response => {
        console.log("Product added to cart:", response.data);
        // Optionally, you can update the UI to reflect that the product has been added to the cart
      })
      .catch(err => console.error("Error adding product to cart:", err));
  };

  return (
    <div>
       <Navsidebar />
      <Typography variant='h4' gutterBottom>
        Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={8} lg={3}>
            <Card sx={{ maxHeight:700, maxWidth: 300, marginBottom: '7px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`data:image/jpeg;base64,${Buffer.from(product.image1.data).toString('base64')}`}
                  alt={product.image1}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Offer Price: {product.offer_price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    MRP: {product.MRP}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Button size="small" color="primary" onClick={() => handleAddToCart(product._id)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Addpro;


