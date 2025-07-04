import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CryptoConverter from "./pages/CryptoConverter";
import Navbar from "./components/Navbar";
import SupportWidget from "./components/SupportWidget";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<CryptoConverter />} />
      </Routes>
      <SupportWidget />
    </Router>
  );
}

export default App;
