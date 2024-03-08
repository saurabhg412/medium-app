import axios from "axios";
import { useEffect, useState } from "react";

export default function usePost(){
    const [loading,setLoading] = useState(true)
    const [posts,setPosts] = useState([]);
    const [username,setUsername] = useState('')

    useEffect(function(){
        axios.get("https://backend.saurabhgupta0122.workers.dev/api/v1/post/posts",{
            headers:{"Authorization":localStorage.getItem('token')}
        })
        .then(response =>{
            setPosts(response.data);
            setLoading(false);
            setUsername(response.data);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error); 
            // Optionally: Set an error state to display feedback to the user
            setLoading(false);
            });
    },[])
    return(
        {username,posts,loading}
    )
}