import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie'
import {useForm} from 'react-hook-form'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refetch, setRefetch] = useState(false)
  const {register, handleSubmit} = useForm()
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList()
  },[refetch])

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmit = (data) => {
    const newMovie = {
      title: data.title,
      director: data.director,
      metascore: data.metascore,
      stars: [data.stars]
    }
    console.log(newMovie)
    
    axios.post('http://localhost:5000/api/movies', newMovie)
      .then((res) => {
        console.log(res)
        setRefetch(!refetch)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <SavedList list={savedList} />
      <div>
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
                <button>Add Movie</button>
          </form>
      </div>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie  refetch={refetch} setRefetch={setRefetch} movies={movieList}/>
      </Route>
    </>
  );
};

export default App;
