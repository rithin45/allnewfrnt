import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import Topbar from '../Adminpanel/Topbar';
import Sidebar from '../Adminpanel/Sidebar';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3005/order');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <Topbar />
      <Sidebar />
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      {orders.map(order => (
        <Card key={order._id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order ID: {order._id}
            </Typography>
            <Typography variant="body1">
              Total Amount: ${order.totalAmount}
            </Typography>
            {/* <Typography variant="body1">
              Shipping Address: {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </Typography> */}
            <Typography variant="body1">
              COD Info: {order.codInfo}
            </Typography>
            <Typography variant="body1">
              Order Created {order.createdAt}
            </Typography>
            <ul>
            {order.cartItems.map(item => (
              <li key={item._id}>
                Product ID: {item.productId}
              </li>
            ))}
          </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;
