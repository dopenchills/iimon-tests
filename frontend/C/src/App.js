import React from 'react';
import { FullFruitsList } from './features/friuts/fruits';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='fruit-list-container'>
        <FullFruitsList className="fruit-list" />
      </div>
    </div>
  );
}

export default App;
