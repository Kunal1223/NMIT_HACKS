import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function OrderCard(props) {
  const order_detail = props.order_detail;
  const [orderUpdate, setOrderUpdate] = useState({ status: "" });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setOrderUpdate({ ...orderUpdate, status: e.target.value });
  };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const orderDate = new Date(order_detail.date);
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let price = 0; // Assuming you calculate price here if needed

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/auth/user/updateorder/${order_detail._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ status: orderUpdate.status }),
      }
    );

    const json = await response.json();
    console.log(json); // Log the entire JSON response to see its structure

    // Adjust the condition based on your API's actual response structure
    if (response.ok) { // Assuming 'success' is the correct property
      alert("Updated Successfully");
      closeModal();
      
    } else {
      alert(json.message);
    }
  };

  return (
    <>
      <div>
        <section className="pt-10 relative">
          <div className="w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
            <div className="main-box border border-gray-800 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                <div className="data">
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Id:{" "}
                    <span className="text-indigo-600 font-medium">
                      {order_detail._id}
                    </span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black mt-4">
                    Order Payment Date :{" "}
                    <span className="text-gray-400 font-medium">
                      {formattedDate}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full px-3 min-[400px]:px-6">
                <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                  <div className="img-box max-lg:w-full">
                    {/* <img src={imageUrl} alt="Restaurant" className="aspect-square w-full lg:max-w-[140px]" /> */}
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div className="flex items-center">
                        <div>
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                            {order_detail.Restro}
                          </h2>

                          <div className="flex items-center">
                            <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                              Vegetarian Packets:{" "}
                              <span className="text-gray-500">
                                {order_detail.VegPackets}
                              </span>
                            </p>
                            <p className="font-medium text-base leading-7 text-black">
                              Non-Vegetarian Packets:{" "}
                              <span className="text-gray-500">
                                {order_detail.NonVngPackets}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">
                              Price
                            </p>
                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                              RS. {order_detail.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black mx-2">
                              Status
                            </p>
                            <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              {order_detail.status}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <button
                            onClick={openModal}
                            className="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent mx-7 my-11 rounded"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    <h1 className="text-xl mt-8 font-bold">Update Order</h1>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex min-h-full flex-col justify-center px-2 py-4 lg:px-8">
                      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                          className="space-y-6"
                          action="#"
                          method="POST"
                          onSubmit={handleOnSubmit}
                        >
                          <div>
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Status
                            </label>
                            <div className="mt-2">
                              <input
                                id="status"
                                name="status"
                                type="text"
                                onChange={onChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div>
                            <button
                              type="submit"
                              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
