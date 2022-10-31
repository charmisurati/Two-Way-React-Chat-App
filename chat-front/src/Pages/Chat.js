import React, { useEffect, useState } from "react";
import "../CSS/custom.css";
import user1 from "../assets/images/user1.jpg";
import io from "socket.io-client";


var sessionName;
const Chat = (props) => {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const socket = props.socket;


    sessionName = sessionStorage.getItem("userName");




    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log("receive msg", data);
            setMessageList([...messageList, data]);
        })
    })

    const handleChange = event => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        let messageContent = {
            room: props.room,
            content: {
                author: props.userName,
                message: message
            }
        }

        socket.emit("send_message", messageContent)
        setMessageList([...messageList, messageContent.content])
        setMessage('');
    }




    const onEnter = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="chat-container">
                    <div className="row">
                        <div className="col col-md-3">
                            {
                                messageList.map((val, key) => {
                                    console.log("val" + val.author, sessionName);
                                    if (sessionName != val.author) {
                                        return (

                                            <div className="user-section d-flex" key={key}>
                                                {/* <div className="userimg">
                                                <img src={user1} className="img-fluid" />
                                            </div> */}
                                                <div className="userInfo mt-3">
                                                    <div className="d-flex align-items-center">
                                                        <span className="online"></span>
                                                        <span>{val.author}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }


                        </div>
                        <div className="col col-md-9 ">
                            <div className="chat-head">
                                <div className="d-flex">
                                    <img src={user1} className="img-fluid" />
                                    <span>{props.userName}</span>
                                </div>
                            </div>
                            <div className="chat-body">
                                {/* <div className="message"> */}
                                {
                                    messageList.map((val, key) => {
                                        return (
                                            <div className={`message ${val.author == props.userName ? "bot-msg" : "user-msg"}`} id={key} key={key}>
                                                <p>
                                                    <span>{val.message}</span>
                                                </p>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="chat-footer">
                                <div className="form-group chat-text">
                                    <input type="text" className="form-control msgInput" autoComplete="off" placeholder="Enter message" onChange={handleChange} onKeyPress={onEnter} value={message} />
                                    <a href="#_" className="" id="submit-msg" onClick={sendMessage}>
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Chat;