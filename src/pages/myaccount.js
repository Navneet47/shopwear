import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const MyAccount = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({ value: null });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if (!myuser) {
      router.push("/login")
    }
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchUserData(myuser.token);
    }
  }, [])

  
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name == 'pincode') {
      setPincode(value);
    } else if (name == 'password') {
      setPassword(value);
    } else if (name == 'confirmPassword') {
      setConfirmPassword(value);
    } else if (name == 'name') {
      setName(value);
    } else if (name == 'address') {
      setAddress(value);
    } else if (name == 'phone') {
      setPhone(value);
    } else if (name == 'newPassword') {
      setNewPassword(value);
    }
  }

  const fetchUserData = async (token) => {
    let data = { token: token }
    let req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let res = await req.json()
    setName(res.name);
    setAddress(res.address);
    setPhone(res.phone);
    setPincode(res.pincode);
  }

  const handleUserSubmit = async () => {
    let data = { token: user.token, name, address, phone, pincode }
    let request = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    let res = await request.json();
    toast.success('Successfully Updated Details', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const handlePasswordSubmit = async () => {
    let res;
    if(newPassword == confirmPassword){
      let data = { token: user.token, password, newPassword, confirmPassword }
      let request = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      res = await request.json();
    }else{
      res = {success: false, error:"Password dosen't Match!"}
    }
    if(res.success){
      toast.success('Successfully Updated Password', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }else{
      toast.error(res.error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
  }



  return (
    <div className='container mx-auto my-9 pb-10'>
       <ToastContainer
        position="top-right"
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
            <Head>
        <title>Myaccount - Shopnation.in</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <h1 className='text-3xl text-center font-bold mb-10'>Account Details</h1>
      <main>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} value={name} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated)</label>
            {user && user.token ? <input readOnly type="email" id="email" name="email" value={user.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> :
              <input type="email" id="email" name="email" onChange={handleChange} value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea rows={2} cols={30} type="text" id="address" name="address" onChange={handleChange} value={address} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input placeholder='Your 10 Digit Phone Number' type="tel" id="phone" name="phone" onChange={handleChange} value={phone} pattern="[0-9]{10}" maxLength={10} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input maxLength={6} type="text" id="pincode" name="pincode" onChange={handleChange} value={pincode} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <button onClick={handleUserSubmit} className="m-2 mb-5 disabled:bg-orange-200 flex mr-2 text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md">Update</button>

      <h2 className='text-xl font-semibold'>2. Change Password</h2>
      <div className="mx-auto flex my-2 flex-wrap">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="password" id="password" name="password" onChange={handleChange} value={password} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="newPassword" className="leading-7 text-sm text-gray-600">New Password</label>
            <input type="password" id="newPassword" name="newPassword" onChange={handleChange} value={newPassword} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} value={confirmPassword} required className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <button onClick={handlePasswordSubmit} className="m-2 disabled:bg-orange-200 flex mr-2 text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded text-md">Change Password</button>
      </main>
    </div>
  )
}

export default MyAccount;