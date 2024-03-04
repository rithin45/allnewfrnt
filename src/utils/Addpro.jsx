// import React, { useEffect, useState } from 'react';
// import Navsidebar from './Navbar/Navsidebar';
// import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
// import{Buffer} from 'buffer';
// import axios from 'axios';

// const Addpro = () => {
//   const [category, setCategory] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:3005/view/`)
//       .then(response => {
//         setCategory(response.data)
//       })
//       .catch(err => console.log(err))
//   }, []);

//   const handleAddToCart = (productId, quantity,_id) => {
//     // Find the product from the category array based on the productId
//     const product = category.find(product => product._id === productId);
    
//     if (!product) {
//       console.log("Product not found");
//       return;
//     }
  
//     const productWithQuantity = { ...product, quantity };
//     setCart([...cart, productWithQuantity]);
    
//     axios.post("http://localhost:3005/addtocart", productWithQuantity)
//       .then(response => {
//         console.log("Product added to cart:", response.data);
//       })
//       .catch(err => console.log(err))
//   };
  

//   return (
//     <div>
//       <Navsidebar />
//       <div></div>
//       <Grid container sx={{ gap: 2 }}>
//         {category.map((product, index) => (
//           <Grid key={index}>
//             <Card>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   width="200"
//                   image={`data:image/jpeg;base64,${Buffer.from(product.image1.data).toString('base64')}`}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant='body2' component="div">
//                     {product.name}
//                   </Typography>
//                   <Typography variant='body2' color="text.secondary">
//                     OFFER PRICE: {product.offer_price}
//                   </Typography>
//                   <Typography variant='body1' color="text.secondary">
//                     MRP: {product.MRP}
//                   </Typography>
//                   <Typography variant='body1' color="text.secondary">
//                     CATEGORY: {product.category}
//                   </Typography>
//                   <TextField
//                     label="QUANTITY"
//                     type='number'
//                     inputProps={{ min: 1 }}
//                   />
//                 </CardContent>
//               </CardActionArea>
//               <Button fullWidth variant='contained' color='primary' style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   )
// }

// export default Addpro;




// import React, { useEffect, useState } from 'react';
// import Navsidebar from './Navbar/Navsidebar';
// import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
// import { Buffer } from 'buffer';
// import axios from 'axios';

// const Addpro = () => {
//   const [category, setCategory] = useState([]);
//   const [cart, setCart] = useState({});

//   useEffect(() => {
//     axios.get(`http://localhost:3005/view/`)
//       .then(response => {
//         setCategory(response.data);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleAddToCart = (productId, quantity) => {
//     // Find the product from the category array based on the productId
//     const product = category.find(product => product._id === productId);

//     if (!product) {
//       console.log("Product not found");
//       return;
//     }

//     // Update the cart with the new product
//     setCart(prevCart => ({
//       ...prevCart,
//       [productId]: {
//         ...product,
//         quantity
//       }
//     }));

//     axios.post(`http://localhost:3005/addtocart`, {
//       productId,
//       quantity
//     })
//       .then(response => {
//         console.log("Product added to cart:", response.data);
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div>
//       <Navsidebar />
//       <div></div>
//       <Grid container sx={{ gap: 2 }}>
//         {category.map((product, index) => (
//           <Grid key={index}>
//             <Card>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   width="200"
//                   image={`data:image/jpeg;base64,${Buffer.from(product.image1.data).toString('base64')}`}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant='body2' component="div">
//                     {product.name}
//                   </Typography>
//                   <Typography variant='body2' color="text.secondary">
//                     OFFER PRICE: {product.offer_price}
//                   </Typography>
//                   <Typography variant='body1' color="text.secondary">
//                     MRP: {product.MRP}
//                   </Typography>
//                   <Typography variant='body1' color="text.secondary">
//                     CATEGORY: {product.category}
//                   </Typography>
//                   <TextField
//                     label="QUANTITY"
//                     type='number'
//                     inputProps={{ min: 1 }}
//                     onChange={(e) => handleAddToCart(product._id, parseInt(e.target.value))}
//                   />
//                 </CardContent>
//               </CardActionArea>
//               <Button fullWidth variant='contained' color='primary' style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default Addpro;





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
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="130"
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







