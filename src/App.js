import React from 'react';
import EmbedPlayer from './components/EmbedPlayer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EmbedPlayer url='https://www.youtube.com/watch?v=2atyKTrsEdo' />
      </header>
    </div>
  );
}

export default App;
