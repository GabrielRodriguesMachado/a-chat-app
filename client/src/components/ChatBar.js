import React from 'react'

const ChatBar = ({ socket, users }) => {
  const currentUser = localStorage.getItem("userName");

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <h4 className='chat__welcome'>Welcome, {currentUser}</h4>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar