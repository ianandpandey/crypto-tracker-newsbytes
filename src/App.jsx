import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CryptoConverter from './pages/CryptoConverter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<CryptoConverter />} />
      </Routes>
    </Router>
  );
}

export default App;
