import React, { Component } from 'react';
import axios from 'axios';
import { baseUrl } from '../Urls';

export default class CreateUser extends Component {

    constructor(props) {
        super(props); 

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: "",
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();


        const user = {
            username: this.state.username,
        }
        console.log(user);

        axios.post(`${baseUrl}/users/add`, user)
        .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
       
    }

    render() {
        return (
            <div>
            <h3 style={{ color: 'white' }}>Create New User</h3>

            <form onSubmit = {this.onSubmit}>


                <div className="form-group">
                    <label><b style={{ color: 'white' }}>Username:</b> </label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername} />
                </div>


                <div className="form-group">
                    <input type="submit" value="Create Users" className="btn btn-primary"/>
                </div>

            </form>
        </div>
            )
        }
    
    }