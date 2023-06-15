import React from 'react'
import Head from 'next/head'

const Returnpolicy = () => {
    return (
        <>
            <Head>
                <title>Return Policy - Shopnation.in</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <div className='container min-h-screen my-15 mx-auto'>
                <header className='mx-auto w-5/6 text-md mt-14'>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='mx-auto text-3xl font-bold'>Refund and Cancellation Policy</h1>
                        <p className='pb-10 pt-10 mx-auto'>At ShopNation.com, our focus is complete customer satisfaction. In the event, if you are displeased with the services provided , we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine prints of each deal before buying it, it provides all the details about the services or the product you purchase.</p>
                        <p className='mx-auto'>In case of dissatisfaction from our services, clients have the liberty to cancel their projects and request a refund from us. Our Policy for the cancellation and refund will be as follows:</p>
                    </div>
                </header>
                <main className='mt-10'>
                    <section id='Cancellation Policy' className='mx-auto w-5/6 text-md'>
                        <div className='flex flex-col'>
                            <p className='mx-auto text-2xl font-bold'>Cancellation Policy</p>
                            <p className='pt-5 mx-auto'>For Cancellations please contact the us via contact us link.</p>
                            <p className='mx-auto'>Requests received later than 3 business days prior to the delivery of the product will not be processed.</p>
                        </div>
                    </section>
                    <section id='Refund Policy' className='mx-auto w-5/6 text-md mt-8'>
                        <div className='flex flex-col'>
                            <p className='mx-auto text-2xl font-bold'>Refund Policy</p>
                            <p className='mx-auto pt-5'>We will try our best to create the best products for our customers. Images are only for representational purpose and are taken in a certain lighting conditions. Colour shade may slightly vary as per the lighting conditions. In case any you are not completely satisfied with our products due to the defect in the product we can review your case and provide a refund. If paid online, refunds will be issued to the original payment method provided at the time of purchase and in case of COD, refund will be made to the UPI ID provided by the customer.</p>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Returnpolicy