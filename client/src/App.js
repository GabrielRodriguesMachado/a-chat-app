import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';
import ChatPage from './components/ChatPage';
import Home from './components/Home';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<ChatPage socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
