import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { background } from '@chakra-ui/react';
import Navsidebar from './Navbar/Navsidebar';
import{Buffer} from 'buffer';


const Addcrt = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3005/addtocart")
      .then(response => {
        setCart(response.data);
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
        {cart.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 150, marginBottom: '12px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`data:image/jpeg;base64,${Buffer.from(product.image1.data).toString('base64')}`}
                  alt={product.name}
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
                  <Button size="small" color="secondary" onClick={() => handleRemoveFromCart(product._id)}>
                    Remove from Cart
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

export default Addcrt;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
// import { Buffer } from 'buffer';
// import Navsidebar from './Navbar/Navsidebar';

// const Addcrt= () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3005/cart")
//       .then(response => {
//         setCartItems(response.data);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleRemoveFromCart = (productId) => {
//     axios.delete(`http://localhost:3005/cart/${productId}`)
//       .then(response => {
//         setCartItems(cartItems.filter(item => item._id !== productId));
//       })
//       .catch(err => console.log(err));
//   };

//   return (
//     <div>
//       <Navsidebar />
//       <Typography variant='h4' gutterBottom>
//         Cart
//       </Typography>
//       <div style={{ overflowX: 'auto' }}>
//         <Grid container spacing={2} style={{ flexWrap: 'nowrap' }}>
//           {cartItems.map((item, index) => (
//             <Grid item key={index}>
//               <Card style={{ minWidth: 300 }}>
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="130"
//                     image={`data:image/jpeg;base64,${Buffer.from(item.image1.data).toString('base64')}`}
//                     alt={item.name}
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {item.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Offer Price: {item.offer_price}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       MRP: {item.MRP}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Category: {item.category}
//                     </Typography>
//                     <Button size="small" color="secondary" onClick={() => handleRemoveFromCart(item._id)}>
//                       Remove from Cart
//                     </Button>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default Addcrt;





