import axios from "axios";
import { useEffect, useState } from "react";

export default function usePostid({id}:any){
    const [loading,setLoading] = useState(true)
    const [posts,setPosts] = useState('');

    useEffect(function(){
        axios.get(`https://backend.saurabhgupta0122.workers.dev/api/v1/post/${id}`,{
            headers:{"Authorization":localStorage.getItem('token')}
        })
        .then(response =>{
            setPosts(response.data);
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching posts:", error); 
            // Optionally: Set an error state to display feedback to the user
            setLoading(false);
            });
    },[id])
    return(
        { posts, loading}
     )
}