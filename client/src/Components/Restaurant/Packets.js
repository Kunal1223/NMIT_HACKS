import Lottie from 'lottie-react'
import Donate from '../../assets/donate.json'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Packets = () => {

    const [Userinfo, setUserinfo] = useState({ Veg: "", Nonveg: "" });

    const email = localStorage.getItem('email');
    // console.log(email);

    const Navigate = useNavigate();
    const handleonSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/res/packets", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Veg: Userinfo.Veg, Nonveg: Userinfo.Nonveg , email:email})
        });

        const json = await response.json();

        if (!json.success) {
            alert(json.message);
        }
        else {;
            alert(json.message);
            Navigate('/restro');
        }
    };

    const onchange = (e) => {
        setUserinfo({ ...Userinfo, [e.target.name]: e.target.value })
    }

    return (

        <div className='bg-[#F1F5F9] mt-20 w-[90%] rounded-3xl mx-12 h-[500px] flex justify-around'>
            <form className="mt-16" onSubmit={handleonSubmit}>
                <h1 className='text-3xl font-medium text-center text-green-500'>
                    Please Add Packets to Donate</h1>

                <div className="form mt-10">
                    <label className='text-sm font-medium text-center text-gray-500'>Enter the No of Veg Packets <i class="fa-solid fa-circle text-green-500 mr-4"></i></label><br />
                    <input type='number' placeholder='0' className='px-2 my-2 py-1 border-green-500 rounded-lg border' name='Veg' value={Userinfo.Veg} 
                    onChange={onchange}  /> <br />
                </div>

                <div className="form mt-2">
                    <label className='text-sm font-medium text-center text-gray-500'>Enter the No of NonVeg Packets <i class="fa-solid fa-circle text-red-500 mr-4"></i></label><br />
                    <input type='number' placeholder='0' className='px-2 my-4 py-1 border-red-500 rounded-lg border' name='Nonveg' value={Userinfo.Nonveg} onChange={onchange} />
                </div>

                <div className="form mt-2">
                    <label className='text-sm font-medium text-center text-gray-500'>Enter the food donation items description </label><br/>
                    <textarea name="desc" typeof='text' id="desc" className='border-green-500 rounded-lg border w-52'></textarea>
                </div>

                <button className='bg-green-500 text-white px-4 py-1 rounded-lg mt-6'>Submit</button>
            </form>

            <div className="pic mt-32 ml-10">
                <Lottie animationData={Donate} className='animation h-72' />
            </div>

        </div>
    )
}

export default Packets