import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./style.css";

function Blogs() {
    const [queryBlogs,setQueryBlogs]=useState([]);
    async function fetchPost(){
        const response = await axios.get("https://stagingngls.wpengine.com/wp-json/wp/v2/posts/");
        const blog = await response.data;
        setQueryBlogs(blog)
    }

    useEffect(()=>{
        fetchPost();
    },[])


    return (
    <div className="main_container">
      <h1>Blogs</h1>
      <div className="container">
          {queryBlogs ? 
          queryBlogs.map(function ({
            id, title, featured_image_src, author_info, excerpt,}) {
              const mainText = title.rendered;
              let data = excerpt.rendered;
              if(data){
                data=data.slice(0,200)+'...';
              }
              return (
                  <div key={id} className="card ">
                      {/* main img */}
                      {featured_image_src && (
                       <a href={`/blog/${id}`}> 
                          <img src={featured_image_src} alt=""
                          className="card_img cursor"/>
                        </a>
                      )}
                      {/* Title */}
                      
                      <div className="innerContainer">
                          <a href={`/blog/${id}`}> 
                            <h2 dangerouslySetInnerHTML={{ __html: mainText }}></h2>
                          </a> 
                          {/* Author name */}
                          <p className="author_name cursor">{`by ${author_info.display_name}`}</p>
                          {/* Small paragraph */}
                          <p className="small_text" dangerouslySetInnerHTML={{ __html: data }}></p>
                      </div>
                  </div>  
              );  
          }
          
          ):<>Loading....</>}
      </div>
    </div>
    )
}

export default Blogs
