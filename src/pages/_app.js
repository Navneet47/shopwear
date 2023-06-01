import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState({value:null});
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  
  
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })
    try{

      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }

    } catch(err){
      console.error(err);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
     setUser({value: myuser.token, email: myuser.email});
     setKey(Math.random())
    }
  }, [router.query])
  
 

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
    if(Object.keys(cart).length == 0){
      setKey(Math.random())
    }
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
    setCart({});
    saveCart({});
  }

  const logOut = ()=>{
    localStorage.removeItem('myuser');
    clearCart()
    setKey(Math.random());
    setUser({value:null});
    router.push('/');
  }

  const buyNow = (itemCode, qty, price, name, size, variant)=>{
    let newCart = {}
    newCart[itemCode] = {qty: 1, price, name, size, variant};
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  }

  return <>
        <LoadingBar
        color='#ffa500'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
<Navbar logout={logOut} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
    <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
  </>
}
