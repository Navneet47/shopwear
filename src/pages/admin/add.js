import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import FullLayout from "@/layouts/FullLayout";
import {
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from '@/Components/baseCard/BaseCard';
import Error from 'next/error';

const Add = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUser] = useState(process.env.NEXT_PUBLIC_ADMIN_ID);
  const [form, setForm] = useState({
    title:'',
    color:'',
    desc:'',
    slug:'',
    size:'',
    category:'',
    price:0,
    availableQty:0,
  });
  const [info, setInfo] = useState({
    img:'',
    highlight:''
  })
  function handleChange(e) {
    const {name,value} = e.target;

    if (name == 'img'){
      setInfo({...info,[name]:value })
    }
    else if (name == 'highlight'){
      setInfo({...info,[name]:value })
    }
    setForm({
      ...form,
      [name]: value
    })
  }

  async function submitForm(e){
    e.preventDefault();
    let req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({product:form,img:info.img, highlight: info.highlight })
    })
    let res = req.json();
  }


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
            <BaseCard title="Add a Product">
              <Stack spacing={3}>
                <TextField
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  label="Title"
                  variant="outlined"
                />
                <TextField onChange={handleChange} value={form.size} name="size" label="Size - [XS-XXL,6-12]" variant="outlined" />
                <TextField onChange={handleChange} value={form.color} name="color" label="Color" variant="outlined" />
                <TextField onChange={handleChange} value={form.slug} name="slug" label="Slug" variant="outlined" />
                <TextField onChange={handleChange} value={form.price} name="price" label="price" variant="outlined" />
                <TextField onChange={handleChange} value={form.availableQty} name="availableQty" label="qty" variant="outlined" />
                <TextField
                  name="desc"
                  label="Description"
                  value={info.desc}
                  multiline
                  onChange={handleChange}
                  rows={4}
                />
                <TextField
                  name="img"
                  label="Image- [separate images using (,)]"
                  value={info.img}
                  multiline
                  onChange={handleChange}
                  rows={4}
                />
                <TextField
                  name="highlight"
                  label="Highlight - [separate points using (,)]"
                  value={info.highlight}
                  multiline
                  onChange={handleChange}
                  rows={4}
                />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="hoodie"
                      name='category'
                      control={<Radio />}
                      label="Hoodie"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="tshirt"
                      control={<Radio />}
                      label="Tshirt"
                      name="category"
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="mug"
                      control={<Radio />}
                      label="Mug"
                      name='category'
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="sneaker"
                      control={<Radio />}
                      label="Sneaker"
                      name='category'
                      onChange={handleChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <br />
              <Button onClick={submitForm} variant="outlined" mt={2}>
                Submit
              </Button>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}

export default Add