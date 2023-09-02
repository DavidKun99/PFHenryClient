import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Home, Landing, Detail} from '../src/views/index';

function App() {
  return (
   <div className="APP">
      <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/detail" element={<Detail/>} />
      </Routes>
   </div>
  );
}

export default App;
