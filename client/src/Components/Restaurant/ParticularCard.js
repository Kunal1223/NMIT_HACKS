import React, { useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';

const ParticularCard = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const ngoDetail = location.state ? location.state.ngoDetail : null;

    const { name, email, manager_name, desc, phone, social_link, imageUrl, date } = ngoDetail;

    const [Userinfo, setUserinfo] = useState({ Veg: "", Nonveg: "", Reason: "" });

    const onchange = (e) => {
        setUserinfo({ ...Userinfo, [e.target.name]: e.target.value })
    }

    const remail = localStorage.getItem('email'); 
    // console.log(name);
    // console.log(remail);

    const handleonSubmit = async (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/auth/res/sendmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Veg: Userinfo.Veg, Nonveg: Userinfo.Nonveg, Reason: Userinfo.Reason, nemail: email, remail: remail , manager: manager_name , name : name }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success === true) {
                    alert(data.message);
                    navigate('/restro'); 
                } else {
                    alert(data.message);
                }
            })
    }


    return (
        <>
            <div className="content text-center mt-10">
                <h1 className='text-[#003F88] text-3xl font-bold '>Welcome to the {name} NGO</h1>
                <hr className='mx-auto bg-blue-600 h-[1px] w-[450px]' />
            </div>

            <div className='flex mt-4 justify-around ' >
                <form className="mt-14" onSubmit={handleonSubmit}>
                    <h1 className='text-3xl font-medium text-center text-green-500'>
                        Please Add Packets to Donate</h1>

                    <div className="form mt-10">
                        <label className='text-sm font-medium text-center text-gray-500'>Enter the No of Veg Packets <i className="fa-solid fa-circle text-green-500 mr-4"></i></label><br />
                        <input type='number' placeholder='0' className='px-2 my-2 py-1 border-green-500 rounded-lg border' name='Veg' value={Userinfo.Veg}
                            onChange={onchange} /> <br />
                    </div>

                    <div className="form mt-2">
                        <label className='text-sm font-medium text-center text-gray-500'>Enter the No of NonVeg Packets <i className="fa-solid fa-circle text-red-500 mr-4"></i></label><br />
                        <input type='number' placeholder='0' className='px-2 my-4 py-1 border-red-500 rounded-lg border' name='Nonveg' value={Userinfo.Nonveg} onChange={onchange} />
                    </div>
                    <div className="form mt-2">
                        <label className='text-sm font-medium text-center text-gray-500'>Reason : <span className='text-red-600 '>*</span> </label><br />
                        <input type='text' placeholder='0' className='px-2 my-2 py-1 border-blue-500 rounded-lg border' name='Reason' value={Userinfo.Reason} onChange={onchange} />
                    </div>

                    <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg mt-10'><i className="fa-regular fa-envelope mr-1"></i> Send  </button>
                </form>

                <div className="image mt-[10%] ">
                    <img src={imageUrl} alt="ngo" className='w-72 rounded-sm' />
                </div>
            </div>
        </>
    );
}

export default ParticularCard;
