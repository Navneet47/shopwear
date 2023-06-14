import React, { useState } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

function Forgot() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == 'email') {
      setEmail(value);
    }

    if (name == 'password') {
      setPassword(value)
    } else if (name == 'cpassword') {
      setCpassword(value)
    }

  }

  const resetPassword = async () => {
    if (password == cpassword) {
      let data = {
        password,
        sendMail: false,
        token: router.query.token
      }
      let req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let res = await req.json();
      if (res.success) {
        toast.success("Password have been changed", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setPassword('');
        setCpassword('');
        setTimeout(() => {
          router.push('/login');
        }, 2000)
      } else {
        toast.error("Error", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Password Not Matching", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const sendResetEmail = async () => {
    let data = {
      email,
      sendMail: true
    }
    let req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await req.json();
    console.log(res);
    if (res.success) {
      toast.success("Password reset Instruction have been sent to your email, If you don't find email, Please check Spam folder!", {
        position: "top-left",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Error", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  return (<>
    <Head>
      <title>Forgot Password - Shopnation.in</title>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
    </Head>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer
        position="top-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <header>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {router.query.token && <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password</h2>}
        {!router.query.token && <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password?</h2>}
      </div>
      </header>
      <main>

      {router.query.token && <div className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
            <input placeholder='Password' onChange={handleChange} id="password" name="password" type="password" value={password} autoComplete="password" required className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus: outline-orange-500 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          <div className="mt-2">
            <input placeholder='Confirm Password' onChange={handleChange} id="cpassword" name="cpassword" type="password" value={cpassword} autoComplete="password" required className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus: outline-orange-500 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button onClick={resetPassword} type="submit" className=" disabled:bg-slate-200 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Reset</button>
        </div>
        {password && password == cpassword ? <span className='text-green-600'>Password matched </span> : <span className='text-red-600'>Password does not match </span>}
      </div>}
      {!router.query.token && <div className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div className="mt-2">
            <input placeholder='Email Address' onChange={handleChange} id="email" name="email" type="email" autoComplete="email" value={email} required className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus: outline-orange-500 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button onClick={sendResetEmail} type="submit" className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Continue</button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Remembered password?
          <Link href={"/login"}>
            <span className="font-semibold leading-6 text-orange-600 hover:text-orange-500"> Login</span>
          </Link>
        </p>
      </div>}
      </main>
    </div>
  </>
  )
}

export default Forgot;