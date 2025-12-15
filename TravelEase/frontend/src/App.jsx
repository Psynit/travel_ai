import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';

import { FavoritesProvider } from './context/FavoritesContext';
import Favorites from './pages/Favorites';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <div className="d-flex flex-column min-h-screen">
            <Navbar />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:id" element={<PackageDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/book" element={<Booking />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
            <footer className="bg-dark text-white text-center py-3 mt-auto">
              <p className="mb-0">&copy; 2024 TravelEase. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
