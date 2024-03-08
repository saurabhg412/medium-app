import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar";

export default function Publish() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    return (
    <div>
        <AppBar></AppBar>
        <div className="container mx-auto p-8 bg-slate-200 h-screen">
            <div className="text-3xl font-bold mb-4">
                <h1>Publish a new blog   post</h1>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title: </label>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" /><br />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Content: </label><br />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea><br />
            </div>

            <button onClick={function () {
                axios.post("https://backend.saurabhgupta0122.workers.dev/api/v1/post/create", {
                    title: title,
                    content: content
                }, {
                    headers: { "Authorization": localStorage.getItem('token') }
                })
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            alert('Post Published Successfully!')
                            navigate('/post', { replace: true })
                        } else {
                            alert('Error Occured while publishing the Post!')
                        }
                    }).catch(() => alert('Network Error!'))
            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Publish</button>
        </div>
    </div>

    )
}
