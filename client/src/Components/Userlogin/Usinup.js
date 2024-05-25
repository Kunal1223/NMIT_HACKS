import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SigninU from './Ulogin';


export default function Signup(props) {
    let [isOpen, setIsOpen] = useState(true)
    const [SigninUOpen, setSigninUOpen] = useState(false)
    const navigate = useNavigate();

    const [Userinfo, setUserinfo] = useState({ name: "", email: "", password: "", phone: "" , location: ""});

    const handleonSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/user/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: Userinfo.name, email: Userinfo.email, password: Userinfo.password , phone: Userinfo.phone , location: Userinfo.location})
        });

        const json = await response.json();

        if (!json.success) {
            alert(json.message);
        } else {
            // console.log("Resister")
            alert(json.message);
            setUserinfo({ name: "", email: "", password: "", phone: "", });
            closeModal();
            setSigninUOpen(true);
            // navigate('/ngo', { replace: true });
        }
    };

    const onchange = (e) => {
        setUserinfo({ ...Userinfo, [e.target.name]: e.target.value })
    };

    function closeModal() {
        setIsOpen(false)
        setSigninUOpen(true);
        props.closeSignUp();
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <NavLink to={'/'}><img src="/images/logo.png" alt='logo' className='w-48 mx-auto' /></NavLink>

                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
                                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                                                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up User Account</h2>
                                            </div>

                                            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                                                <form className="space-y-6" action="#" method="POST" onSubmit={handleonSubmit}>
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                                                        <div className="mt-2">
                                                            <input id="name" name="name" type="text" value={Userinfo.name} onChange={onchange} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                        <div className="mt-2">
                                                            <input id="email" name="email" type="email" value={Userinfo.email} onChange={onchange} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                                                        <div className="mt-2">
                                                            <input id="location" name="location" type="text" value={Userinfo.location} onChange={onchange} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="flex items-center justify-between">
                                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                        </label>

                                                        <div className="mt-2">
                                                            <input id="password" name="password" type="password"
                                                                value={Userinfo.password} onChange={onchange} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mt-6">User Phone Number</label>
                                                        <div className="mt-2">
                                                            <input id="phone" name="phone" type="number" autoComplete="phone" required value={Userinfo.phone} onChange={onchange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>


                                                    <div>
                                                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                                    </div>
                                                </form>

                                                <p className="mt-10 text-center text-sm text-gray-500">
                                                    Already a member?
                                                    <span onClick={closeModal} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</span>
                                                    {SigninUOpen ? <SigninU show={SigninUOpen} close={() => setSigninUOpen(false)} /> : <></>}
                                                </p>
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
