import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Beranda', path: '/' },
    { name: 'Sejarah', path: '/sejarah' },
    { name: 'Kesenian', path: '/kesenian' },
    { name: 'Kuliner', path: '/kuliner' },
    { name: 'Bahasa & Tradisi', path: '/bahasa' },
    { name: 'Wisata', path: '/wisata' },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-cokelat sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-playfair text-emas text-2xl md:text-3xl font-bold tracking-wider">
              Karawang
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-4">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm lg:text-base font-medium transition-colors relative text-krem hover:text-emas`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-emas"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-krem hover:text-emas focus:outline-none bg-white/5 p-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-cokelat/80 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[70] md:hidden flex flex-col"
            >
              <div className="flex justify-end p-6 border-b border-white/10">
                <button onClick={() => setIsOpen(false)} className="text-krem hover:text-emas transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col px-6 py-8 space-y-4 overflow-y-auto">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-2xl text-lg font-medium transition-all ${
                        isActive ? 'text-cokelat bg-emas shadow-lg shadow-emas/20' : 'text-krem hover:text-emas hover:bg-white/5 border border-transparent hover:border-emas/20'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
