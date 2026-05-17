import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sejarah from './pages/Sejarah';
import Kesenian from './pages/Kesenian';
import Kuliner from './pages/Kuliner';
import Bahasa from './pages/Bahasa';
import Wisata from './pages/Wisata';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sejarah" element={<Sejarah />} />
            <Route path="/kesenian" element={<Kesenian />} />
            <Route path="/kuliner" element={<Kuliner />} />
            <Route path="/bahasa" element={<Bahasa />} />
            <Route path="/wisata" element={<Wisata />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
