import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import PersonaSelector from './components/PersonaSelector';
import './App.css';

const App = () => {
  const [selectedPersona, setSelectedPersona] = useState('hitesh');

  // Keep separate histories for each persona
  const [chatHistories, setChatHistories] = useState({
    hitesh: [],
    piyush: []
  });

  const updateMessages = (persona, newMessages) => {
    setChatHistories(prev => ({
      ...prev,
      [persona]: newMessages
    }));
  };

  return (
    <div className="app">
      <h1>Persona AI Chat</h1>
      <PersonaSelector selectedPersona={selectedPersona} setSelectedPersona={setSelectedPersona} />
      <ChatInterface
        persona={selectedPersona}
        messages={chatHistories[selectedPersona]}
        setMessages={(newMessages) => updateMessages(selectedPersona, newMessages)}
      />
    </div>
  );
};

export default App;
