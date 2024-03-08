import { useState } from "react";
import { Headings } from "../components/signinHeading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signinSchema } from "@saurabh412/index";

function Signin() {
    const [formData,setFormData] = useState<signinSchema>({
        email : ''   ,   password: ''
    })
    const navigate = useNavigate()

    function handleChange(e:any){
        setFormData({...formData,[e.target.name]: e.target.value})
    }
    async function handleSubmit(e:any){
        e.preventDefault();
        const {success} = signinSchema.safeParse(formData)
         if(!success) {
            return alert("Invalid Inputs")
         };
        try{
            const response = await axios.post("https://backend.saurabhgupta0122.workers.dev/api/v1/user/signin", formData)
        if (response.status == 200) {
            localStorage.setItem("token", response.data.jwt);
            alert(`Welcome ${response.data.user.name}`);
            navigate("/post")
        } 
        } catch{
            alert(`You Don't Have Account Create A New Account`);
            navigate('/')
        }   
    }
    return (
        <div className=" bg-gray-200">
            <div className="bg-blue-600 p-2">
                Medium
            </div>
            <div className="h-screen w-full flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div>
                        <Headings></Headings>
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4" onChange={handleChange} />
                        <div className="flex mt-4 text-sm text-cyan-600">
                            <Link to="/update" className="hover:text-cyan-500 transition ease-out duration-100">Forgot password?</Link>
                        </div>
                        <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded-full w-full" onClick={handleSubmit}>Login</button>

                        <div className="flex items-center justify-center mt-8">
                            <hr className="flex-1 border-gray-300" />
                            <span className="bg-white px-4 text-gray-500">OR</span>
                            <hr className="flex-1 border-gray-300" />
                        </div>

                        <div className="mt-4 font-medium text-md text-gray-700 text-center">
                            Don't have an account?
                            <Link to="/" className="text-cyan-600 hover:text-cyan-900 font-bold"> Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signin;