import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import './CreateBlog.css';
import calculateReadTime from "../../helpers/calculateReadTime.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

function CreateBlog({setIsAuth}) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [blogId, setBlogId] = useState(null);

    const {register, handleSubmit, formState: {errors}} =
        useForm({mode: 'onSubmit'});

    const handleFormSubmit = async (data) => {
        setLoading(true)
        const date = new Date();

   setError(null);

        try {

            const response =await axios.post(`http://localhost:3000/posts`, {
                ...data,
                created: date.toISOString(),
                shares: 0,
                comments: 0,
                readTime: calculateReadTime(data.content),
            })

            setIsAuth(true)
            setBlogId(response.data.id)
            // navigate("/blogs")

        } catch (err) {
            console.error(err)
            setError(`Post kon niet aangemaakt worden, probeer het later nogmaals ${err.message}`)
        } finally {
            setLoading(false)
        }}

        return (
            <>
                <h2>Post aanmaken</h2>

                {errors && <div className="error-message">{error}</div>}

                {blogId ? (
                <p>De blogpost is succesvol toegevoegd. Je kunt deze via  <Link to={`/blogs/${blogId}`}> hier </Link>  bekijken. </p>
                    ) : (
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <label htmlFor="title">Titel
                        <input type="text"
                               id="title"
                               placeholder="Titel"
                               {...register("title", {
                                   required: {
                                       value: true,
                                       message: "Titel is verplicht",
                                   },
                                   minLength: {
                                       value: 5,
                                       message: "Titel moet uit minimaal 5 characters bestaan",
                                   }, maxLength: {
                                       value: 50,
                                       message: "Titel moet uit maximaal 50 characters bestaan",
                                   }
                               })}
                        />
                        {errors.title && <p>{errors.title.message}</p>}
                    </label>
                    <label htmlFor="subtitle">Ondertitel
                        <input type="text"
                               id="subtitle"
                               placeholder="Ondertitel"
                               {...register("subtitle", {
                                   required: {
                                       value: true,
                                       message: "Ondertitel is verplicht",
                                   },
                                   minLength: {
                                       value: 5,
                                       message: "Ondertitel moet uit minimaal 5 characters bestaan",
                                   }, maxLength: {
                                       value: 50,
                                       message: "Ondertitel moet uit maximaal 50 characters bestaan",
                                   }
                               })}
                        />
                        {errors.subtitle && <p>{errors.subtitle.message}</p>}
                    </label>
                    <label htmlFor="author">Auteur
                        <input type="text"
                               id="author"
                               placeholder="Auteur"
                               {...register("author", {
                                   required: {
                                       value: true,
                                       message: "Auteur is verplicht",
                                   },
                                   minLength: {
                                       value: 5,
                                       message: "Auteur moet uit minimaal 5 characters bestaan",
                                   }, maxLength: {
                                       value: 50,
                                       message: "Auteur moet uit maximaal 50 characters bestaan",
                                   }
                               })}
                        />
                        {errors.author && <p>{errors.author.message}</p>}
                    </label>
                    <label htmlFor="content">Beschrijving
                        <textarea
                            id="content"
                            placeholder="Beschrijving"
                            rows="20"
                            cols="100"
                            {...register("content", {
                                required: {
                                    value: true,
                                    message: "Beschrijving is verplicht",
                                },
                                minLength: {
                                    value: 300,
                                    message: "Beschrijving moet uit minimaal 300 characters bestaan",
                                }, maxLength: {
                                    value: 2000,
                                    message: "Beschrijving moet uit maximaal 2000 characters bestaan",
                                }
                            })}
                        ></textarea>
                        {errors.content && <p>{errors.content.message}</p>}
                    </label>
                    <button type="submit" > Submit</button>
                </form>
                    )}
            </>
        );
    }

export default CreateBlog;