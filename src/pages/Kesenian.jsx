import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Music, Star, Sparkles } from 'lucide-react';
import dataKesenian from '../data/kesenian.json';

const Kesenian = () => {
  const [filter, setFilter] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['Semua', ...new Set(dataKesenian.map(item => item.kategori))];
  const filteredData = filter === 'Semua' ? dataKesenian : dataKesenian.filter(item => item.kategori === filter);

  // Gambar dikurasi statis Unsplash (Menghindari broken links)
  const kesenianImages = {
    1: "https://images.unsplash.com/photo-1621255554316-2f085736173a?q=80&w=800&auto=format&fit=crop", // Tari Jaipong
    2: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop", // Topeng Banjet
    3: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop", // Wayang Golek
    4: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop", // Degung Sunda
    5: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop", // Calung
    6: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"  // Anyaman Bambu
  };

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-cokelat py-16 md:py-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6 md:mt-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-emas/20 backdrop-blur-sm rounded-full text-emas border border-emas/30 shadow-2xl">
                <Music size={40} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 drop-shadow-2xl">
              Seni & <span className="text-emas">Kriya</span>
            </h1>
            <p className="text-base md:text-2xl text-white/90 font-jakarta max-w-2xl mx-auto leading-relaxed">
              Ekspresi jiwa masyarakat Sunda yang terukir dalam gerak tari dinamis, alunan melodi bambu, dan mahakarya kerajinan tangan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. MAESTRO & SOROTAN (NEW) */}
      <section className="py-16 md:py-24 bg-krem">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 bg-white p-6 sm:p-8 md:p-12 rounded-[40px] shadow-xl border border-emas/10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:w-1/2 relative w-full"
            >
              <div className="absolute -inset-4 bg-emas/20 rounded-[40px] transform -rotate-3 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1621255554316-2f085736173a?q=80&w=800&auto=format&fit=crop" 
                alt="Tari Jaipong" 
                className="relative z-10 rounded-3xl w-full h-64 sm:h-[400px] object-cover shadow-2xl"
              />
              <div className="absolute bottom-6 -right-6 z-20 bg-cokelat text-krem p-6 rounded-2xl shadow-xl hidden md:block max-w-[200px]">
                <Sparkles className="text-emas mb-2" />
                <p className="font-bold text-sm">Lahirnya Jaipongan oleh H. Suanda di Karawang.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left w-full mt-6 lg:mt-0"
            >
              <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm flex items-center justify-center lg:justify-start gap-2">
                <Star size={16} /> Karya Mendunia
              </h2>
              <h3 className="font-playfair text-3xl md:text-5xl text-cokelat font-bold leading-tight">
                Goyang Karawang:<br/>Identitas Seni Tari
              </h3>
              <div className="w-16 h-1 bg-emas rounded-full mx-auto lg:mx-0"></div>
              <p className="text-cokelat/80 text-sm md:text-lg leading-relaxed">
                Karawang dikenal luas sebagai tempat lahirnya <strong>Tari Jaipong</strong>, sebuah genre tari pergaulan tradisional Sunda. Diciptakan oleh seniman lokal H. Suanda sekitar tahun 1970-an, tarian ini menggabungkan elemen pencak silat, wayang golek, dan ketuk tilu.
              </p>
              <p className="text-cokelat/80 text-sm md:text-lg leading-relaxed">
                Energi yang dinamis, iringan kendang yang menghentak, serta gerakan yang luwes membuat kesenian ini cepat menyebar dan menjadi salah satu identitas seni paling populer dari Jawa Barat.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. GALERI & FILTER (ENHANCED) */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-hijau/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <h2 className="text-emas font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Koleksi Seni</h2>
            <h3 className="font-playfair text-3xl md:text-5xl font-bold text-cokelat mb-8">Eksplorasi Ragam Kesenian</h3>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                    filter === cat 
                      ? 'bg-cokelat text-emas shadow-xl scale-105' 
                      : 'bg-krem text-cokelat border border-emas/20 hover:border-emas hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredData.map(item => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-krem rounded-3xl overflow-hidden shadow-lg cursor-pointer group border border-emas/10 hover:shadow-2xl hover:border-emas/50 transition-all flex flex-col h-full"
                >
                  <div className="h-56 sm:h-64 md:h-72 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-cokelat via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <img 
                      src={kesenianImages[item.id] || "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop"}
                      alt={item.nama}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop"; }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-hijau shadow-sm uppercase tracking-wider">
                        {item.kategori}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 text-center z-20 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-flex items-center gap-2 bg-emas text-cokelat px-6 py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg">
                        <Search size={16} /> Lihat Detail
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 text-center relative bg-white flex-grow flex flex-col justify-center">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-krem rounded-full flex items-center justify-center border-4 border-white z-20 text-emas shadow-sm">
                      <Music size={20} />
                    </div>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-cokelat mb-3 mt-2">{item.nama}</h3>
                    <div className="w-10 h-1 bg-emas mx-auto rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MODAL DETAIL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white w-full max-w-4xl rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto md:overflow-visible"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 text-white p-3 rounded-full hover:bg-emas hover:text-cokelat transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 h-56 sm:h-72 md:h-auto relative shrink-0">
                <img 
                  src={kesenianImages[selectedItem.id] || "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop"}
                  alt={selectedItem.nama}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cokelat/80 to-transparent md:hidden"></div>
              </div>

              <div className="md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-krem/30 overflow-y-auto">
                <span className="inline-block bg-hijau/10 text-hijau font-bold tracking-wider uppercase text-[10px] sm:text-xs px-4 py-2 rounded-full mb-4 self-start">
                  {selectedItem.kategori}
                </span>
                <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-cokelat mb-4 md:mb-6">{selectedItem.nama}</h3>
                <div className="w-16 h-1 bg-emas mb-4 md:mb-6"></div>
                <p className="text-cokelat/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-medium">
                  {selectedItem.deskripsi}
                </p>
                
                <div className="bg-white p-4 rounded-2xl border border-emas/20 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emas/20 rounded-full flex items-center justify-center text-emas shrink-0">
                    <Star size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm md:text-base text-cokelat">Warisan Budaya</h5>
                    <p className="text-[10px] sm:text-xs text-cokelat/60">Dilestarikan turun temurun</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Kesenian;
