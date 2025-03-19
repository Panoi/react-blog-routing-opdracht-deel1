import React, {useEffect, useState} from 'react';
import posts from "../../constants/data.json";
import './Blogs.css';
import {Link} from "react-router-dom";
import axios from "axios";

function Blogs(){
    const [isLoading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const database_URL = "http://localhost:3000/posts"


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            setError(null);
            try {
                const response = await axios.get(database_URL);
                setBlogs(response.data);
            } catch (err){
                console.error(err)
                setError(`Posts ophalen is mislukt, probeer het later nogmaals. ${err.message}`);
            } finally {
                setLoading(false)
            }
        }

        void fetchPosts();
    }, []);

    return (
        <>
            <h2>Blogs</h2>

            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
                <p>Laden...</p>
            ) : (
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog.id} className="post">
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </Link> ({blog.author})
                            <p>{blog.comments} reacties - {blog.shares} keer gedeeld</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default Blogs;