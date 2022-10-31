import { Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

let socket;
const CONNECTION_PORT = 'http://localhost:8080';


const App = () => {

  const [LoggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');



  // if(LoggedIn){    
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT])
  // }









  return (
    <div className="App">
      {
        !LoggedIn ? <Login LoggedIn={LoggedIn}
          socket={socket}
          setLoggedIn={setLoggedIn}
          setRoom={setRoom}
          setUserName={setUserName}
          room={room}
          userName={userName}
        /> :

          <Chat socket={socket} userName={userName}
            room={room} />
      }
    </div>
    // <Routes>
    //   <Route path="/Login" exact element={<Login />} />
    //   <Route path="/" exact element={<Login />} />
    //   <Route path="/Home" exact element={<Home />} />
    //   <Route path="/Chat" exact element={<Chat />} />
    // </Routes>

  );
}

export default App;
