import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useParams, useHistory } from "react-router-dom";



const UpdateMovie = (props) => {
    const {id} = useParams()
    const movieToEdit = props.movies[id] 
    console.log(movieToEdit)


        const preLoadedValues = {
            title: movieToEdit.title,
            director: movieToEdit.director,
            metascore: movieToEdit.metascore,
            stars: movieToEdit.stars
        }
            const {register, handleSubmit} = useForm({
                defaultValues: preLoadedValues || {}
            })
    const [movie, setMovie] = useState()
    
    // useEffect(() => {
    //     axios.get(`http://localhost:5000/api/movies/${id}`)
    //         .then(res => {
    //             setMovie(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // },[id])
    
    // const onSubmit = (data) => {
    //     const updatedMovie = {
    //         title: data.title,
    //         director: data.director,
    //         metascore: data.metascore,
    //         stars: data.stars,
    //         id: `${id}`
    //     }
    //     console.log(updatedMovie)
    // }


    
    return (
        <div>
            <h1>Update Movie Form</h1>
            <form onSubmit={handleSubmit()}>
                <label>Title:&nbsp;
                    <input 
                        type="text"
                        name="title"
                        // value={movie.title}
                        ref={register}
                    /> 
                </label>
                <label>Director:&nbsp;
                    <input 
                        type="text"
                        name="director"
                        // value={movie.director}
                        ref={register}
                    /> 
                </label>
                <label>Metascore:&nbsp;
                    <input 
                        type="text"
                        name="metascore"
                        // value={movie.metascore}
                        ref={register}
                    /> 
                </label>
                <label>Stars:&nbsp;
                    <input 
                        type="text"
                        name="stars"
                        // value={movie.stars}
                        ref={register}
                    /> 
                </label>
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;