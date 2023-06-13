import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

function Signup() {

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  const router = useRouter();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/');
    }
   },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = userInfo;
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let response = await res.json();

    if(!response.success){
      toast.success("Email Already exists", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      } else {
        setUserInfo({
          name: "",
          email: "",
          password: ""
        });
        toast.success('Account Created Successfully', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setTimeout(()=>{
            router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)
          },2500);
    }
  }



  return (<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for an account</h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
            <input onChange={handleChange} id="name" name="name" type="text" value={userInfo.name} required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus: outline-orange-500 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input onChange={handleChange} id="email" name="email" type="email" value={userInfo.email} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus: outline-orange-500 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input onChange={handleChange} id="password" name="password" type="password" value={userInfo.password} autoComplete="current-password" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus: outline-orange-500 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Sign up</button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <Link href={"/login"}>
          <span className="font-semibold leading-6 text-orange-600 hover:text-orange-500"> Login</span>
        </Link>
      </p>
    </div>
  </div>)
}

export default Signup;