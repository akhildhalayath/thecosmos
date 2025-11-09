import React from 'react';
import 'antd/dist/reset.css'; // Import Ant Design styles
import './App.css'; // Import custom styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainTable from './MainTable';
import Reports from './Reports';
import tekionImage from './images/tekionlogo.png'; // Add your sample image

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={tekionImage} alt="Sample" className="App-logo" />
          <h1>Vehicle Health Management - VHM</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Reports />} />
            <Route path="/main-report" element={<MainTable />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
