import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SigninN from './SigninN';
import axios from 'axios'


export default function Signup(props) {
    let [isOpen, setIsOpen] = useState(true)
    const [SigninNOpen, setSigninNOpen] = useState(false)
    const navigate = useNavigate();
    
    const [Userinfo, setUserinfo] = useState({ name: "", email: "", password: "", desc: "", manager_name: "", phone: "", social_link: "",location: "" })
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const convertBase64 = (file) => {
        // console.log("insite the function2");
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                console.log("Error in the filereader path");
                reject(error);
            }; 
        });
    };

    function uploadSingleImage(base64) {
        setLoading(true);
        // console.log("insite the function");
        axios.post("http://localhost:5000/uploadImage", { image: base64 })
            .then((res) => {
                setUrl(res.data);
                alert("Image uploaded Succesfully");
            })
            .then(() => setLoading(false))
            .catch(console.log);
    }

    const uploadImage = async (event) => {
        const files = event.target.files;
        // console.log("insite the function3");

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
    };

    const handleonSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/ngo/createNGO", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: Userinfo.name, email: Userinfo.email, password: Userinfo.password, manager_name: Userinfo.manager_name, desc: Userinfo.desc, phone: Userinfo.phone, social_link: Userinfo.social_link, url: url , location: Userinfo.location })
        });

        const json = await response.json();

        if (!json.success) {
            console.log("Its a error");
            alert(json.message);
        } else {
            // console.log("Resister Successfully");
            alert(json.message);
            setUserinfo({ name: "", email: "", password: "", phone: "" , });
            closeModal();
            setSigninNOpen(true);
            // navigate('/ngo', { replace: true });
        }
    };

    const onchange = (e) => {
        setUserinfo({ ...Userinfo, [e.target.name]: e.target.value })
    };


    function closeModal() {
        setIsOpen(false);
        setSigninNOpen(true);
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
                                        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                               
                                                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up your NGO Account</h2>
                                            </div>

                                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                                <form className="space-y-6" action="#" method="POST" onSubmit={handleonSubmit}>
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">NGO Name</label>
                                                        <div className="mt-2">
                                                            <input id="name" name="name" type="text" value={Userinfo.name} onChange={onchange} autoComplete="new" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                        <div className="mt-2">
                                                            <input id="email" name="email" type="email" autoComplete="email" value={Userinfo.email} onChange={onchange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                                                            <input id="password" name="password" type="password" value={Userinfo.password} onChange={onchange} autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">NGO Manager Name</label>
                                                            <div className="mt-2">
                                                                <input id="manager_name" name="manager_name" type="text" autoComplete="manager_name" value={Userinfo.manager_name} onChange={onchange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">NGO Phone Number</label>
                                                            <div className="mt-2">
                                                                <input id="phone" name="phone" type="number" autoComplete="phone" required value={Userinfo.phone} onChange={onchange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">NGO Description</label>
                                                            <div className="mt-2">
                                                                <input id="desc" name="desc" type="text" autoComplete="desc" value={Userinfo.desc} onChange={onchange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">NGO Social Media Handle</label>
                                                            <div className="mt-2">
                                                                <input id="social_link" name="social_link" type="text" autoComplete="email" value={Userinfo.social_link} onChange={onchange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                                                            <div className="mt-2">
                                                                <input id="location" name="location" type="text" autoComplete="location" value={Userinfo.location} onChange={onchange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>

                                                        <div className="image-section">
                                                            <div className="image-content">
                                                                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">Upload Images</label>
                                                                <input onChange={uploadImage} className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer   focus:outline-none placeholder-black" aria-describedby="file_input_help" id="file_input" type="file" />
                                                            </div>
                                                            <div>
                                                                {loading ? (
                                                                    <div className="flex items-center justify-center">
                                                                        <img src='../images/assets.gif' alt='loading img' className='loading' />{" "}
                                                                    </div>
                                                                ) : ""}
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-600" id="file_input_help">SVG, PNG, JPG or GIF</p>
                                                        </div>

                                                    </div>


                                                    <div>
                                                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                                    </div>
                                                </form>

                                                <p className="mt-10 text-center text-sm text-gray-500">
                                                    Already a member?
                                                    <span onClick={closeModal} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</span>
                                                    {SigninNOpen ? <SigninN show={SigninNOpen} close={() => setSigninNOpen(false)} /> : <></>}
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
