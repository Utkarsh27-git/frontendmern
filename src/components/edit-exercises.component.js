import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { baseUrl } from '../Urls';

export default class EditExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {

        axios.get(`${baseUrl}/exercises/`+this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    username: response.data.username, 
                    description: response.data.description, 
                    duration: response.data.duration, 
                    date: new Date(response.data.date), 
                })
            }).catch((error) => {
                console.log(error);
            })

        axios.get(`${baseUrl}/users/`)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);

        axios.post(`${baseUrl}/exercises/update/`+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';

    }

    render() {
        return (
            <div>
                <h3 style={{ color: 'white' }}>Edit Exercise Log</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{ color: 'white' }}>Username:</label>

                        <select
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>
                                        {user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'white' }}>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'white' }}>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration} />
                    </div>

                    <div className="form-group">
                        <label style={{ color: 'white' }}>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>

                </form>
            </div>
        )
    }
}
