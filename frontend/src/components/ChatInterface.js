import React, { useState } from 'react';
import axios from 'axios';

const ChatInterface = ({ persona, messages, setMessages }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL, {
        persona,
        messages: updatedMessages,
      });

      const aiMessage = { role: 'assistant', content: response.data.content };
      setMessages([...updatedMessages, aiMessage]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      setMessages([...updatedMessages, { role: 'assistant', content: 'Oops, something went wrong!' }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
