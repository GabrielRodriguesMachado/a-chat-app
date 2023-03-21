/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const usernameInputRef = useRef(null);

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/chat');
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to open chat</h2>
      <label htmlFor="username" className="username__label">Username</label>
      <input
        type="text"
        minLength={6}
        maxLength={15}
        name="username"
        id="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="username__input"
        ref={usernameInputRef}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;