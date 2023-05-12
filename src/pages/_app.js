import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try{

      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }

    } catch(err){
      console.error(err);
      localStorage.clear();
    }
  }, [])
  

  const saveCart = (myCart)=>{
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subT = 0;
    let keys = Object.keys(myCart);
    for(let i = 0; i<keys.length; i++){
      subT += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(subT);
  }

  const addToCart = (itemCode, qty, price, name, size, variant)=>{
          let newCart = cart;
          if(itemCode in cart){
            newCart[itemCode].qty = cart[itemCode].qty + qty;
          }else{
            newCart[itemCode] = {qty: 1, price, name, size, variant}
          }
          setCart(newCart);
          saveCart(newCart);
  }
  const removeFromCart = (itemCode, qty, price, name, size, variant)=>{
          let newCart = JSON.parse(JSON.stringify(cart));
          if(itemCode in cart){
            newCart[itemCode].qty = cart[itemCode].qty - qty;
          }
          if(newCart[itemCode]["qty"] <=0 ){
            delete newCart[itemCode]
          }
          setCart(newCart);
          saveCart(newCart);
  }

  const clearCart = ()=>{
    console.log("Cart cleared");
    setCart({});
    saveCart({});
  }

  const buyNow = (itemCode, qty, price, name, size, variant)=>{
    let newCart = {slug: {qty: 1, price, name, size, variant}};
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  }

  return <><Navbar key={subTotal} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
    <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}
