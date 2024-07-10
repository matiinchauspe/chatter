import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import useSound from 'use-sound';
// import config from '../../../config';
import config from '../../config';
// import LatestMessagesContext from '../../../contexts/LatestMessages/LatestMessages';
import LatestMessagesContext from '../../contexts/LatestMessages/LatestMessages';
import TypingMessage from './TypingMessage';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import './_messages.scss';

// const socket = io(
//   config.BOT_SERVER_ENDPOINT,
//   { transports: ['websocket', 'polling', 'flashsocket'] }
// );
const socket = io('http://localhost:4001', { transports: ['websocket', 'polling', 'flashsocket'] });

function Messages() {
  const [message, setMessage] = useState('')
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage, messages } = useContext(LatestMessagesContext);


  useEffect(() => {
    socket.on('bot-message', (message) => {
      debugger
      setLatestMessage(message);
      playReceive();
    });

    // socket.on('user-typing', (message) => {
    //   setLatestMessage(<TypingMessage />);
    // });

    // socket.on('bot-typing', (message) => {
    //   setLatestMessage(<TypingMessage />);
    // });

    // socket.on('bot-stopped-typing', (message) => {
    //   setLatestMessage('');
    // });

    return () => {
      socket.off('bot-message');
    }
  })

  const handleSendMessage = () => {
    if (!message) { return; }

    debugger

    socket.emit('user-message', message);

    setLatestMessage(message);

    playSend();

    setMessage('');
  }

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  }




  return (
    <div className="messages">
      <Header />
      <div className="messages__list" id="message-list">
      </div>
      <Footer message={message} sendMessage={handleSendMessage} onChangeMessage={handleChangeMessage} />
    </div>
  );
}

export default Messages;
