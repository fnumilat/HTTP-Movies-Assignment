import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import useForceUpdate from 'use-force-update';
import axios from 'axios';
import "../index.css";


const UpdateMovie = props => {
    const { id } = useParams();
    const [item, setItem] = useState({ id });
    console.log("props.match.params.id", props.match.params.id);
    const forceUpdate = useForceUpdate();
    const history = useHistory();
  
    useEffect(() => {
      const itemToUpdate = props.movies.find(thing => `${thing.id}` === id);
  
      if (itemToUpdate) {
        setItem(itemToUpdate);
      }
    }, [props.movies, id]);
  

  
    const handleChange = ev => {
      setItem({
        ...item,
        [ev.target.name]: ev.target.value
      });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      forceUpdate();
  
      axios
        .put(`http://localhost:5000/api/movies/${id}`, {
          id: id,
          title: item.title,
          director: item.director,
          metascore: Number(item.metascore),
          stars: [item.stars]
        })
        .then(res => {
          console.log(res);
          history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    };

    return(
        <div>
            <h2 className="Form-Title">Update the Movie</h2>
            <form className="Update-Form" onSubmit={handleSubmit}>
                <input
                    className="Form-Input"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={item.title}
                />
                <input
                    className="Form-Input"
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="director"
                    value={item.director}
                />
                <input
                    className="Form-Input"
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="metascore"
                    value={item.metascore}
                />
                <input 
                    className="Form-Input"
                    type="text"
                    placeholder="star"
                    value={item.stars}
                    onChange={handleChange}
                />
                
                <button className="Form-Save-Button">Save the Update</button>
            </form>
        </div>
    )
};

export default UpdateMovie;