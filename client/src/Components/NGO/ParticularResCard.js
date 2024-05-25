import React, { useState, Fragment, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import orderContext from "../context/Order/orderContext";

export default function ParticularResCard() {
  const navigate = useNavigate();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const location = useLocation();
  const resDetail = location.state ? location.state.resDetail : null;
  const { name, email, imageUrl } = resDetail || {};

  const [userInfo, setUserInfo] = useState({
    veg: "",
    nonVeg: "",
    message: "",
    vegType: "regular meal",
    nonVegType: "regular meal",
  });

  const context = useContext(orderContext);
  const { addOrder } = context;
  const userEmail = localStorage.getItem("email");

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  const resEmail = email;
  // const NgoEmail=
  const calculatePrice = (mealType, quantity) => {
    const priceMap = {
      "regular meal": 120,
      "special meal": 220,
      "premium meal": 320,
    };
    return priceMap[mealType] * quantity;
  };
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const vegPrice = calculatePrice(userInfo.vegType, userInfo.veg);
    const nonVegPrice = calculatePrice(userInfo.nonVegType, userInfo.nonVeg);
    const totalPrice = vegPrice + nonVegPrice;
    
    const orderDetails = {
      Restro: name,
      userEmail,
      VegPackets: userInfo.veg,
      VegPacketsType: userInfo.vegType,
      NonVegPacketsType: userInfo.nonVegType,
      NonVngPackets: userInfo.nonVeg,
      Messege: userInfo.message,
      resEmail,
      totalPrice,
    };

    try {
      await addOrder(
        orderDetails.Restro,
        orderDetails.userEmail,
        orderDetails.VegPackets,
        orderDetails.VegPacketsType,
        orderDetails.NonVegPacketsType,
        orderDetails.NonVngPackets,
        orderDetails.Messege,
        orderDetails.resEmail,
    
        orderDetails.totalPrice
      );

      const response = await fetch(
        `http://localhost:5000/api/auth/res/paymentmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            veg: userInfo.veg,
            nonVeg: userInfo.nonVeg,
            message: userInfo.message,
            remail: email,
            uemail: userEmail,
            name: name,
            vmeal: userInfo.vegType,
            nmeal: userInfo.nonVegType,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        navigate("/ngo");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const mealOptions = [
    {
      value: "regular meal",
      label: "Regular meal @ Rs 120",
      description: "A regular meal with basic ingredients.",
    },
    {
      value: "special meal",
      label: "Special meal @ Rs 220",
      description: "A special meal with additional sides.",
    },
    {
      value: "premium meal",
      label: "Premium meal @ Rs 320",
      description: "A premium meal with gourmet ingredients.",
    },
  ];

  return (
    <>
      <div className="content text-center mt-10">
        <h1 className="text-[#003F88] text-3xl font-bold">Welcome to {name}</h1>
        <hr className="mx-auto bg-blue-600 h-[1px] w-[250px]" />
      </div>

      <div className="flex mt-4 justify-around">
        <form className="mt-14" onSubmit={handleOnSubmit}>
          <h1 className="text-3xl font-medium text-center text-green-500">
            Please Add Packets to Donate
          </h1>

          <div className="form mt-10">
            <label className="text-sm font-medium text-center text-gray-500">
              Enter the No of Veg Packets{" "}
              <i className="fa-solid fa-circle text-green-500 mr-4"></i>
            </label>
            <br />
            <div className="flex items-center">
              <input
                type="number"
                placeholder="0"
                className="px-2 my-2 py-1 border-green-500 rounded-lg border"
                name="veg"
                value={userInfo.veg}
                onChange={onChange}
              />
              <div className="relative inline-block ml-2">
                <select
                  name="vegType"
                  value={userInfo.vegType}
                  onChange={onChange}
                  className="px-2 my-2 py-1 border-green-500 rounded-lg border"
                >
                  {mealOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="dropdown-content absolute top-full left-0 mt-1 w-64 p-2 bg-white rounded-md shadow-lg z-10">
                  {mealOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-item ${
                        userInfo.vegType === option.value ? "block" : "hidden"
                      }`}
                    >
                      {option.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form mt-2">
            <label className="text-sm font-medium text-center text-gray-500">
              Enter the No of NonVeg Packets{" "}
              <i className="fa-solid fa-circle text-red-500 mr-4"></i>
            </label>
            <br />
            <div className="flex items-center">
              <input
                type="number"
                placeholder="0"
                className="px-2 my-4 py-1 border-red-500 rounded-lg border"
                name="nonVeg"
                value={userInfo.nonVeg}
                onChange={onChange}
              />
              <div className="relative inline-block ml-2">
                <select
                  name="nonVegType"
                  value={userInfo.nonVegType}
                  onChange={onChange}
                  className="px-2 my-2 py-1 border-red-500 rounded-lg border"
                >
                  {mealOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="dropdown-content absolute top-full left-0 mt-1 w-64 p-2 bg-white rounded-md shadow-lg z-10">
                  {mealOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-item ${
                        userInfo.nonVegType === option.value
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      {option.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form mt-2">
            <label className="text-sm font-medium text-center text-gray-500">
              Message: <span className="text-red-600">*</span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Message"
              className="px-2 my-2 py-1 border-blue-500 rounded-lg border"
              name="message"
              value={userInfo.message}
              onChange={onChange}
            />
          </div>

          {openPaymentModal && (
            <Transition appear show={openPaymentModal} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setOpenPaymentModal(false)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all w-auto">
                        <Dialog.Title
                          as="h3"
                          className="text-lg text-center font-medium leading-6 text-gray-900"
                        >
                          <NavLink to={"/"}>
                            <img
                              src="/images/logo.png"
                              alt="logo"
                              className="w-48 mx-auto"
                            />
                          </NavLink>
                          <h1 className="text-xl mt-2 font-bold">
                            Pay Using QR
                          </h1>
                        </Dialog.Title>
                        <div className="mt-2 flex flex-col">
                          <img
                            src="/images/paymentqr.jpg"
                            className="h-[400px] mx-auto px-12 py-6"
                            alt="Payment QR Code"
                          />
                          <button
                            className="bg-green-500 text-white font-base px-4 py-2 rounded-xl ml-[20%] w-[60%] hover:bg-green-700"
                            onClick={handlePaymentSubmit}
                          >
                            Place Order
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          )}

          <button
            onClick={() => setOpenPaymentModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg mt-10"
          >
            <i className="fa-brands fa-google-pay fa-2xl"></i>
          </button>
        </form>

        <div className="image mt-[10%]">
          <img src={imageUrl} alt="ngo" className="w-72 rounded-sm" />
        </div>
      </div>

      <style jsx>{`
        .dropdown-content {
          display: none;
          position: absolute;
          left: 100%;
          top: 0;
          z-index: 10;
          width: 200px;
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        }
        .dropdown-item {
          padding: 8px 12px;
          font-size: 14px;
          line-height: 1.5;
        }
        .relative:hover .dropdown-content {
          display: block;
        }
      `}</style>
    </>
  );
}
