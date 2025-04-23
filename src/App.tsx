import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeaFreightContainerPage from './components/pages/SeaFreightContainerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeaFreightContainerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
