import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import Order from "../../models/Order";

const OrderDetails = ({ order }) => {
  const {
    email,
    orderId,
    products,
    address,
    city,
    state,
    pincode,
    name,
    phone,
    amount,
    deliveryStatus,
  } = order;
  const d = new Date(order.createdAt);
  const [date, setDate] = useState("");

  useEffect(() => {
    const d = new Date(order.createdAt);
    setDate(d);
  }, []);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
          Order #{orderId}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600">
          {date &&
            date.toLocaleString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>
            {Object.keys(products).map((item,index) => {
              return (
                <div
                  key={index}
                  className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                >
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-md xl:text-xl font-semibold leading-6 text-gray-800">
                      {products[item].name}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-300">Size: </span> {products[item].size}
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          <span className="text-gray-300">Color: </span> {products[item].variant}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                      ₹{products[item].salePrice ? products[item].salePrice : products[item].price}{" "}
                        <span className="text-red-300 line-through">
                          {" "}
                          {products[item].salePrice && '₹' + products[item].price}
                        </span>
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        {products[item].qty}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      ₹{products[item].salePrice ? products[item].salePrice * products[item].qty : products[item].price * products[item].qty }
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">₹{order.amount}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">
                    Discount{" "}
                    <span className="bg-gray-200 hidden p-1 text-xs font-medium leading-3  text-gray-800">
                      STUDENT
                    </span>
                  </p>
                  <p className="text-base leading-4 text-gray-600">₹0</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">₹0</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                ₹{order.amount}
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              { order.deliveryStatus == 'processing' ? <div className="text-center">Unshipped</div>:
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        Indian Post
                        <br />
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">
                    Free
                  </p>
                </div>
              }
              <div className="w-full flex justify-center items-center">
                <button
                  disabled={true}
                  className="hover:bg-orange-600 cursor-pointer disabled:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-orange-800 text-base font-medium leading-4 text-white"
                >
                  Track
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <p>Name:</p>
                <div className=" flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    {order.name}
                  </p>
                </div>
              </div>

              <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="#1F2937"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                  {order.email}
                </p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {`${order.address}, ${order.city}, ${order.state}, ${order.pincode}, Phone Number: ${order.phone}`}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                  {`${order.address}, ${order.city}, ${order.state}, ${order.pincode}`}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Payment Info
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                  {order.paymentInfo['razorpay_payment_id']}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  };
}

export default OrderDetails;
