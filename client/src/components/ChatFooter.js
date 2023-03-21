/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';

const ChatFooter = ({ socket, users }) => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);

  const handleTyping = () => 
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      const isPrivate = recipient !== '';
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketId: socket.id,
        recipient: recipient,
        isPrivate: isPrivate,
      });
    }
    setMessage('');
    socket.emit('typing', '');
    messageInputRef.current.focus();
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="recipientSelect"
        >
          <option value="">Everyone</option>
          {users.map((user) => {
            if (user.userName !== localStorage.getItem('userName')) {
              return (
                <option key={user.socketID} value={user.userName}>
                  {user.userName}
                </option>
              );
            } else {
              return null;
            }
          })}
        </select>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          ref={messageInputRef}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
