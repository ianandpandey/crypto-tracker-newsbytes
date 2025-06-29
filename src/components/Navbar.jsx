import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/convert" className="hover:underline">Converter</Link>
    </nav>
  );
}

export default Navbar;
