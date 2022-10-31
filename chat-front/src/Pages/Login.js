import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/custom.css";



const Login = (props) => {
    const socket = props.socket;
    const navigate = useNavigate();

    const userDetails = {
        userName: props.userName,
        room: props.room
    }


    const handleSubmit = event => {
        event.preventDefault();

        sessionStorage.setItem("userName", props.userName);
        socket.emit("join_room", props.room);
        props.setLoggedIn(true);
        navigate('/Chat');
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-3 col-form-label fw-bold">Username: </label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="username" placeholder="Username" onChange={(e) => { props.setUserName(e.target.value) }} />
                            </div>
                        </div>
                        <div className="form-group row mt-2">
                            <label htmlFor="room" className="col-sm-3 col-form-label fw-bold">Room:</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="room" placeholder="Enter room" onChange={(e) => { props.setRoom(e.target.value) }} />
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col ">
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;