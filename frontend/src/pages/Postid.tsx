import { useParams, Link, useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar";
import usePostid from "../hooks/postid-hook";
import axios from "axios";

export default function () {
    const navigate = useNavigate()
    const { id } = useParams();
    const { posts, loading }: { posts: any, loading: boolean } = usePostid({ id });
    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <p className="text-center">Loading...</p>
            </div>);
    }
    function handleDelete(id: any) {
        axios.delete(`https://backend.saurabhgupta0122.workers.dev/api/v1/post/delete/${id}`, {
            headers: { "Authorization": localStorage.getItem("token") },
        }).then(() => {
            alert('post deleted')
            navigate('/posts')
        })
        .catch((err) => { console.log(err) })
    };

    return (
        <div className="container mx-auto p-6">
            <div className="mb-4">
                <AppBar />
            </div>

            <div className="border border-gray-200 rounded-lg p-6 shadow-md"> {/* Added shadow */}
                <div className="flex items-center justify-between mb-4"> {/* For title and button layout */}
                    <h1 className="font-bold text-3xl border-l-4 border-gray-500 pl-4">
                        Title : {posts.title}
                    </h1>

                    {/* Delete Button */}
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                        onClick={() => handleDelete(posts.id)} // Add your delete logic here
                    >
                        Delete Post
                    </button>
                </div>

                <span className="text-lg text-gray-600 block mb-4">{posts.author.name}</span>
                <p className="text-base">{posts.content}</p>

                {/* Edit Button */}
                <div className="mt-6"> {/* Added spacing */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mr-2"
                    >
                        <Link to={`/update/${id}`}>Edit Post</Link>
                    </button>
                </div>
            </div>
        </div>
    );

}