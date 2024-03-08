import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Quote } from "../components/quote";
import { Heading } from "../components/heading";
import { signupSchema } from "@saurabh412/index";



function Signup() {
    const [formData, setFormData] = useState<signupSchema>({
        name: '', email: '', password: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    let navigate = useNavigate()
    function handleChange(e: any) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    async function submitHandler(e: any) {
        e.preventDefault();

        // Validation 
        const { success } = signupSchema.safeParse(formData);
        if (!success) {
            alert("Error in signing up! Please check your credentials.")
            return setErrors(errors);
        }
        else {
            try {
                const response = await axios.post("https://backend.saurabhgupta0122.workers.dev/api/v1/user/signup",
                    formData);
                localStorage.setItem("token", response.data.jwt);
                alert(`Account Created Successfully For ${formData.email}`)
                navigate("/post")
            }
            catch (err) {
                alert("Error in signing up! Please check your credentials.")
            }
        }
    }

    return (
        <div className="grid grid-cols-12 h-screen bg-slate-100">
            <div className="h-screen w-full flex items-center justify-center col-span-7 flex-col rounded-lg shadow-lg border p-6">
                <Heading></Heading>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input name="name" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input name="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>
                

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Password:</label>
                    <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                </div>

                <div className="mt-4 mb-6">
                    <button className="bg-blue-500 hover:bg-indigo-700 text-white font-bold py-2 px-10 rounded-md focus:outline-none focus:shadow-outline" onClick={submitHandler}>Signup</button>
                </div>
            </div>
            <div className="text-xl h-screen bg-slate-200 flex flex-col items-center justify-center font-serif p-20 col-span-5">
                <Quote></Quote>
            </div>
        </div>
    )
}
export default Signup;