import React from 'react';
import { Container, Typography, Grid, Paper, Avatar, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Navsidebar from './Navsidebar';

const About = () => {
    return (
        <div>
        <Navsidebar/>
        <Container>
            <Typography variant="h1" align="center" gutterBottom>About Us</Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '24px' }}>
                        <Typography variant="h2" gutterBottom>Our Story</Typography>
                        <Typography variant="body1">
                        In the heart of the city, SmartMart emerges as a pioneer in grocery shopping innovation. Equipped with AI-powered carts and IoT sensors, customers enjoy a seamless experience as they navigate the aisles. Interactive displays offer personalized recommendations and product information, enhancing the shopping journey. With real-time inventory monitoring and 24/7 AI chat support, SmartMart sets a new standard for convenience and efficiency. Customers flock to experience the future of grocery shopping, where technology and creativity converge to redefine the retail experience.                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '24px' }}>
                        <Typography variant="h2" gutterBottom>Our Mission</Typography>
                        <Typography variant="body1">
                            Our mission is to provide fresh, high-quality groceries to our customers at affordable prices. We are committed to sourcing products from local farmers and producers whenever possible to support our community and promote sustainability.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '24px' }}>
                        <Typography variant="h2" gutterBottom>Our Team</Typography>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar src="/images/ceo.jpg" alt="CEO" style={{ width: '80px', height: '80px' }} />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6">Mithul</Typography>
                                <Typography variant="body2">Founder & CEO</Typography>
                            </Grid>
                            
                        </Grid>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar src="/images/ceo.jpg" alt="CEO" style={{ width: '80px', height: '80px' }} />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6">Niranj</Typography>
                                <Typography variant="body2">Founder & CEO</Typography>
                            </Grid>
                            
                        </Grid>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar src="/images/ceo.jpg" alt="CEO" style={{ width: '80px', height: '80px' }} />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6">Rithin</Typography>
                                <Typography variant="body2">Founder & CEO</Typography>
                            </Grid>
                            
                        </Grid>
                        <Divider style={{ margin: '16px 0' }} />
                        {/* <Grid container spacing={2}> */}
                            {/* <Grid item>
                                <Avatar><PersonIcon /></Avatar>
                            </Grid> */}
                            {/* <Grid item xs>
                                <Typography variant="h6">Jane Smith</Typography>
                                <Typography variant="body2">Operations Manager</Typography>
                            </Grid> */}
                        {/* </Grid> */}
                        {/* Add more team members as needed */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </div>
    );
};

export default About;
