import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useParams, useHistory } from "react-router-dom";



const UpdateMovie = (props) => {
    
    const {refetch, setRefetch} = props
    const history = useHistory()
    const { id } = useParams()
	const movieToEdit = props.movies[id] || {}
	const { register, handleSubmit, setValue } = useForm()
	useEffect(
		() => {
			setValue('title', movieToEdit.title)
            setValue('director', movieToEdit.director)
            setValue('metascore', movieToEdit.metascore)
            setValue('stars', movieToEdit.stars)
		},
		[ movieToEdit ]
	)
    
    const onSubmit = (data) => {
        const updatedMovie = {
            title: data.title,
            director: data.director,
            metascore: data.metascore,
            stars: [data.stars],
            id: `${id}`
        }
        
        axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then((res) => {
                console.log(res)
                setRefetch(!refetch)
                history.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            console.log(res)
            setRefetch(!refetch)
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div>
            <h1>Update Movie Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            <button onClick={handleDelete}>Delete Movie</button>
        </div>
    )
}

export default UpdateMovie;