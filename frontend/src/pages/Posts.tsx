import AppBar from "../components/Appbar";
import usePost from "../hooks/useposts-hook";
import { Link } from "react-router-dom";

export default function Posts(){
    const {loading,posts}:{loading:boolean,posts:any[]} = usePost();
    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <p className="text-center">Loading...</p>
            </div>);
    }
    return (
        <div>
            <div className="mb-2">
                <AppBar></AppBar>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
            {posts.map(function(post: any) {
                return(
                    <Link key={post.id} to={`/Post/${post.id}`}>
                   <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg overflow-hidden">
                    <div className="flex justify-start items-center">
                        <span className="text-gray-500 text-md mr-2">{post.id}<span className="font-bold text-black">.</span></span>
                        <h3 className="font-bold text-lg mb-0">Author : {post.author.name}</h3>
                    </div>
                        <h2 className="text-xl font-medium mb-3">title : {post.title}</h2>
                        <p className="text-gray-700">content : {post.content}</p>
                    </div>
                    </Link>
            )})}

            </div>
        </div>
    );
}