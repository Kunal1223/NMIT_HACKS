import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Signup from './SignupR';

export default function Signin(props) {
    let [isOpen, setIsOpen] = useState(true)
    let [SignUpOpen, setSignUpOpen] = useState(false)
    const [Userinfo, setUserinfo] = useState({ email: "", password: "" });

    function closeModal() {
        setIsOpen(false)
        props.close();
    } 

    function openSignUpModal() {
        setSignUpOpen(true);
        closeModal();
    }

    const navigate = useNavigate();

    const handleonSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/res/loginRES", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: Userinfo.email, password: Userinfo.password })
        });

        const json = await response.json();
 
        if (!json.success) {
            alert(json.message);
        }
        else {
            // console.log("inside this");
            localStorage.setItem('restroAuthToken', json.authToken);
            localStorage.setItem('email' , Userinfo.email);
            alert(json.message);
            closeModal();
            navigate('/restro');
        } 

        // console.log(localStorage.getItem('email'));
    };

    const onchange = (e) => {
        setUserinfo({ ...Userinfo, [e.target.name]: e.target.value })
    }


    return (
        <>
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
                                        <NavLink to={'/'}><img src="/images/logo.png" alt='logo' className='w-48 mx-auto' /></NavLink>

                                        <h1 className='text-xl mt-8 font-bold'>Sign in With Restaurant Account </h1>

                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="flex min-h-full flex-col justify-center px-2 py-4 lg:px-8">


                                            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                                                <form className="space-y-6" action="#" method="POST" onSubmit={handleonSubmit} >
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                        <div className="mt-2">
                                                            <input id="email" name="email" type="email" value={Userinfo.email} onChange={onchange} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                            <div className="text-sm">
                                                                <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input id="password" name="password" type="password" value={Userinfo.password} onChange={onchange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                                    </div>
                                                </form>

                                                <p className="mt-10 text-center text-sm text-gray-500">
                                                    Not a member?
                                                    <span onClick={() => {
                                                        // closeModal();
                                                        setSignUpOpen(true);
                                                    }}
                                                        className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</span>
                                                </p>
                                                {SignUpOpen ? <Signup showSignUp={SignUpOpen} closeSignUp={() => {
                                                    // closeModal()
                                                    setSignUpOpen(false)
                                                }} /> : <></>}
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
    )
}
