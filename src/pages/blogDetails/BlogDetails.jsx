import {Link, useNavigate, useParams} from 'react-router-dom';
import blogposts from "../../constants/data.json";
import React, {useEffect, useState} from "react";
import convertDate from "../../helpers/convertDate.jsx";
import axios from "axios";


function BlogDetails () {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [blog, setBlog] = React.useState({});
    const[error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
    const fetchBlog = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3000/posts/${id}`)
            setBlog(response.data);
        } catch (err) {
            console.error(err)
            setError(`Post ophalen is mislukt, probeer het later nogmaals. ${err.message}`)
        } finally {
            setLoading(false);
        }
    }
    void fetchBlog();
}, [id]);


    const deleteBlog = async (id) => {

        try {
            await axios.delete(`http://localhost:3000/posts/${id}`);
            console.log(`Post met ID ${id} is verwijderd`);
            navigate("/blogs");
        } catch (err) {
            console.error(err)
            setError(`Post kon niet verwijderd worden, probeer later nogmaals ${err.message}`)
        } finally {
            setLoading(false);
        }
    }


  //   const post = blogposts.find(post => post.id === Number(id));

    return (
        <>
            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <p>laden...</p>
            ) : (
                <>
            <h2>{blog.title} ({blog.readTime} minuten)</h2>
            <strong>{blog.subtitle}</strong>
            <p>Geschreven door {blog.author} op {convertDate(blog.created)}</p>
            <p>{blog.content}</p>
            <p>{blog.comments} reacties - {blog.shares} keer gedeeld</p>
            <Link to={"/blogs/"}>Terug naar de overzichtspagina </Link>
</> )}
            <button onClick={() => deleteBlog(blog.id)}>delete</button>
        </>
)
}

export default BlogDetails;