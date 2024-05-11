import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { baseUrl } from '../Urls';
import { useParams } from 'react-router-dom';

const EditExercise = () => {
    const { id } = useParams();
    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
    });

    useEffect(() => {
        axios.get(`${baseUrl}/exercises/${id}`)
            .then(response => {
                setExercise({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date),
                });
            }).catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setExercise(prevExercise => ({
            ...prevExercise,
            [name]: value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        const updatedExercise = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
        };

        axios.post(`${baseUrl}/exercises/update/${id}`, updatedExercise)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));

        window.location = '/';
    };

    return (
        <div>
            <h3 style={{ color: 'white' }}>Edit Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Username:</label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name="username"
                        value={exercise.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Description: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name="description"
                        value={exercise.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Duration (in minutes): </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        name="duration"
                        value={exercise.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={date => setExercise(prevState => ({ ...prevState, date }))}
                        />
                    </div>
                </div>
                <div className="form-group"style={{ marginTop: '20px' }}>
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default EditExercise;
