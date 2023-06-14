import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import FullLayout from "@/layouts/FullLayout";
import { Grid } from "@mui/material";
import AllOrders from '@/Components/dashboard/AllOrders';
import mongoose from 'mongoose';
import Order from '../../../models/Order';
import Error from 'next/error';
import { useState, useEffect } from 'react';

const Orders = ({orders}) => {
  const [admin, setAdmin] = useState(null);
  const [users, setUser] = useState(process.env.NEXT_PUBLIC_ADMIN_ID);

useEffect(()=>{
  const user = localStorage.getItem('myuser');
  if(user){
    setAdmin(JSON.parse(user));
  }
},[]);

if(admin == null){
  return <Error statusCode={404}/>
}

if(admin.email !== users){
  return <Error statusCode={404} />
}
  return (
    <ThemeProvider theme={theme}>
    <FullLayout>
    <style jsx global>{`footer{display:none}`}</style>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <AllOrders products={orders} />
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context){
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find();

  return { props: {orders: JSON.parse(JSON.stringify(orders))} }
}

export default Orders;