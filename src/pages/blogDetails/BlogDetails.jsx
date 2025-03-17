import {Link, useParams} from 'react-router-dom';
import blogposts from "../../constants/data.json";
import React from "react";
import convertDate from "../../helpers/convertDate.jsx";

function BlogDetails () {


  const { id } = useParams();
    const post = blogposts.find(post => post.id === Number(id));

    return (
        <>
            <h2>{post.title} ({post.readTime} minuten)</h2>
            <strong>{post.subtitle}</strong>
            <p>Geschreven door {post.title} op {convertDate(post.created)}</p>
            <p>{post.content}</p>
            <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
            <Link to={"/blogs/"}>Terug naar de overzichtspagina </Link>
        </>
    )
}

export default BlogDetails;