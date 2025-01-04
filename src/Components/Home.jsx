import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();  

  const [roomId, setRoomId] = useState("");

  const generateRoomId = () => {
    const newRoomId  = Math.random().toString(36).substring(2,9);
    const timestamp = Date.now().toString().substring(-4);
    setRoomId(newRoomId + timestamp)
  }

  const OneAndOneCall = () => {
    if(!roomId){
        alert("Please Generate Room Id First");
        return;
    }
    navigate(`room/${roomId}?type=one-on-one`);
  }

  const GroupCall = () => {
    if(!roomId){
        alert("Please Generate Room Id First");
        return;
    }
    navigate(`room/${roomId}?type=Group-Call`);
  }

  return (
    <div className='flex sm:items-center justify-center h-screen bg-sky-50'>
      <div className='text-center mt-16 sm:mt-0'>
        <h1 className='font-bold text-4xl sm:text-5xl'>Welcome to Video Calling App</h1>
        <p className='italic text-xl text-gray-600 mt-8'>Start a video call with a randomly generated Room ID</p>
        <div className='flex justify-center mt-14 sm:mt-10'>
            <input type="text" placeholder='Generated Room Id' readOnly value={roomId} className='text-center  px-0 sm:px-5 py-3 rounded-md border border-gray-300' />
            <button onClick={generateRoomId} className='ml-4 bg-blue-600 hover:bg-blue-500 rounded-md p-2 sm:px-5 text-white'>Generated</button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center mt-14 sm:mt-10 space-y-8 sm:space-y-0 sm:space-x-6">
            <button onClick={OneAndOneCall} disabled={!roomId} className={`w-auto mx-4 sm:mx-0 rounded-md  sm:px-5 py-4 text-white text-lg ${
              roomId
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}>One-on-One Call</button>
            <button onClick={GroupCall} disabled={!roomId} className={`w-auto mx-4 sm:mx-0 sm:ml-6 rounded-md px-9 py-4 text-white text-lg ${
              roomId
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}>Group Call</button>
        </div>
      </div>
    </div>
  )
}

export default Home
