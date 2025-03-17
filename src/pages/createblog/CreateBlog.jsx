import React from 'react';
import {useForm} from "react-hook-form";
import './CreateBlog.css';
import calculateReadTime from "../../helpers/calculateReadTime.jsx";
import {useNavigate} from "react-router-dom";

function CreateBlog({setIsAuth}){

    const navigate = useNavigate();

    const { register,  handleSubmit, formState: { errors } } =
        useForm({ mode: 'onSubmit'});

    function handleFormSubmit(data) {
        const date = new Date();

        console.log({
            ...data,
            created: date.toISOString(),
            shares: 0,
            comments: 0,
         readTime: calculateReadTime(data.description),
        });

        setIsAuth(true)
        navigate("/blogs")
    }

    return (
        <>
            <h2>Post aanmaken</h2>
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
                <label htmlFor="subTitle">Ondertitel
                    <input type="text"
                    id="subTitle"
                    placeholder="Ondertitel"
                    {...register("subTitle", {
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
                    {errors.subTitle && <p>{errors.subTitle.message}</p>}
                </label>
                <label htmlFor="author">Auteur
                <input type="text"
                id="author"
                placeholder="Auteur"
                {...register("author" , {
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
                <label htmlFor="description">Beschrijving
                <textarea
                id="description"
                placeholder="Beschrijving"
                rows="20"
                cols="100"
                {...register("description", {
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
                    {errors.description && <p>{errors.description.message}</p>}
                </label>
                <button type="submit" onClick={() => setIsAuth((prev) => !prev)}>Submit</button>
            </form>
        </>
    );
}

export default CreateBlog;