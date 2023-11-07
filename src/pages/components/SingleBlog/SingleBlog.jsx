import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import "./style.css"
import React, { useEffect, useState } from 'react'


function SingleBlog({id}) {
    const [user,setUser] = useState({});
    const [loading,setLoading]=useState(false);
    async function fetchSingleBlog(){
        setLoading(true);
        const response =await  axios.get(`https://stagingngls.wpengine.com/wp-json/wp/v2/posts/${id}`);
        const result = await response.data;
        console.log(result?.content?.rendered);
        setUser(result);
        setLoading(false);
    }
    useEffect(()=>{
        fetchSingleBlog();
    },[])
    if(loading){return <h1>Loading...</h1>}

    return (
        <>
            {   user?
                <div dangerouslySetInnerHTML={{__html:user?.content?.rendered}}></div>
                :<></>
            }
        </>
    )
}

export default SingleBlog;
