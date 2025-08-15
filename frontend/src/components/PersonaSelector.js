import React from 'react';

const PersonaSelector = ({ selectedPersona, setSelectedPersona }) => {
  return (
    <div className="persona-selector">
      <button
        className={selectedPersona === 'hitesh' ? 'active' : ''}
        onClick={() => setSelectedPersona('hitesh')}
      >
        Hitesh Choudhary
      </button>
      <button
        className={selectedPersona === 'piyush' ? 'active' : ''}
        onClick={() => setSelectedPersona('piyush')}
      >
        Piyush Garg
      </button>
    </div>
  );
};

export default PersonaSelector;