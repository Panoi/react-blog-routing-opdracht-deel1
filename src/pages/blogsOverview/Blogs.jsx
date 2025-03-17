import React from 'react';
import posts from "../../constants/data.json";
import './Blogs.css';
import {Link} from "react-router-dom";

function Blogs(){
    console.log(posts)

    return (
        <>
            <h2>blogs</h2>
            <ul>
                {posts.map((post) => {
                    return (
                    <li key={post.id} className="post">
                        <Link to={`/blogs/${post.id}`}>
                        {post.title}</Link> ({post.author})
                        <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                    </li>
                );
                })}
            </ul>
        </>
    );
}

export default Blogs;