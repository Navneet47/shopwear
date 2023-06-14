import React from 'react'
import Head from 'next/head';

function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Shopnation.in</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <section className="text-gray-600 body-font relative min-h-screen bg-slate-100 shadow-xl mb-10 sm:m-5 sm:w-3/4 sm:mx-auto ">
        <div className="container px-5 py-10 mx-auto">
          <header>
            <div className="flex flex-col text-center w-full mb-10 gap-4">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
              <p className="lg:w-2/3 mx-auto  font-semibold leading-relaxed text-base">We are happy to answer your questions</p>
              <p className='lg:w-2/3 mx-auto leading-relaxed text-base mb-20'>If you have any questions regarding your order, feel free to send email, call or Whatsapp us on our support number</p>
            </div>
          </header>
          <main>
            <section id="Contact">
              <div className='flex gap-5 sm:gap-30'>
                <div className='flex flex-col text-center w-full'>
                    <p className='text-sm sm:text-lg font-bold mx-auto'>Corporate Address</p>
                    <p className='text-sm sm:text-lg mx-auto'>NS Solutions</p>
                    <p className='text-sm sm:text-lg mx-auto'>49, Kulcha Wali Gali, Kember Road</p>
                    <p className='text-sm sm:text-lg mx-auto'>Jammu, J&K, 180001</p>
                </div>
                <div className='flex flex-col text-center w-full'>
                    <p className='text-sm sm:text-lg font-bold mx-auto'>Customer Support</p>
                    <p className='text-sm sm:text-lg mx-auto'>Call/Whatsapp: <br className='sm:hidden'/> <span className='underline text-blue-600'>+91 999 999 9999</span></p>
                    <p className='text-sm sm:text-lg mx-auto whitespace-break-spaces'>Email: care@shopnation.in</p>
                    <p className='text-sm sm:text-lg mx-auto'>Morning: <br className='sm:hidden'/> <span>10AM - 6PM</span></p>
                </div>
                {/* <div className='flex flex-col text-center w-full'>
                    <p className='mx-auto text-md sm:text-lg font-bold'>Customer Support</p>
                    <p className='text-md sm:text-lg mx-auto'>Call/Whatsapp: <br/> <span className='underline text-blue-600'>+91 999 999 9999</span></p>
                    <p className='text-md sm:text-lg mx-auto'>Email: <span>support@shopnation.in</span></p>
                    <p className='text-md sm:text-lg mx-auto'>Morning: <span>10AM - 6PM</span></p>
                </div> */}
              </div>

            </section>
          </main>
        </div>
      </section>
    </>
  )
}

export default Contact;