import React, {useState, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Auth} from "./components/Auth"
import Cookies from "universal-cookie";
import {Chat} from "./components/Chat"



const cookies = new Cookies();

function App() {
  //const [count, setCount] = useState(0)
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)
 

  const roomInputRef = useRef(null);
  
  if (!isAuth ) {
    console.log("not authenticated")

    return (
      <div>
        Hello woklllrd
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }

    console.log("authenticated");
    return (
    
    //the first segment of dir is the homepage we will use,
    //the chatroom segment will be for continuing the tutorial
    //going to hit a merge conflict
    <div> 
      
      
      Home page???
      
      {room ? ( 
        <Chat room = {room}/>
        
      ) : (
        <div className="room"> 
          <label> Enter Room Name:</label>
          <input ref={roomInputRef}/>
          <button onClick ={() => setRoom(roomInputRef.current.value)}> 
            Enter Chat
          </button>

        </div>
      )
      }
    </div>
  )

  
}

export default App

    // //for reference in case this is needed? this was the sample code
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>