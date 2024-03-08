import { Link } from "react-router-dom"
export function Heading(){
    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <div className="font-bold text-4xl p-2 m-4 text-center">
                Create an account
            </div>
            <div className="font-medium text-lg py-4 text-gray-700 text-center">
                Already have an account? <Link to={'/signin'} className="text-blue-600 cursor-pointer hover:underline">Login</Link>
            </div>
        </div>
    )
}