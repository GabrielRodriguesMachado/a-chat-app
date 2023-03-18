import { BrowserRouter, Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Home from './components/Home';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
