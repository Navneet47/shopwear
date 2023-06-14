import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import FullLayout from "@/layouts/FullLayout";
import { Grid } from "@mui/material";
import ProductPerfomance from '@/Components/dashboard/AllProducts';
import mongoose from 'mongoose';
import Product from '../../../models/Product';
import Error from 'next/error';
import { useState, useEffect } from 'react';

const AllProducts = ({products}) => {
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
            <ProductPerfomance products={products} />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}

export default AllProducts;

export async function getServerSideProps(context){
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();

  return { props: {products: JSON.parse(JSON.stringify(products))} }
}