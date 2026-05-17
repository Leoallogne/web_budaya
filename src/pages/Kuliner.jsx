import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Flame, Coffee, Info, Heart } from 'lucide-react';
import dataKuliner from '../data/kuliner.json';

const Kuliner = () => {
  const [filter, setFilter] = useState('Semua');
  const categories = ['Semua', ...new Set(dataKuliner.map(item => item.kategori))];
  const filteredData = filter === 'Semua' ? dataKuliner : dataKuliner.filter(item => item.kategori === filter);

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-cokelat">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-emas border border-white/20 shadow-xl">
                <Utensils size={40} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-4 drop-shadow-2xl">
              Kuliner <span className="text-emas">Khas</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-jakarta max-w-2xl mx-auto leading-relaxed">
              Kelezatan bumbu rempah warisan leluhur yang menggugah selera, dari hidangan utama hingga kudapan manis tradisional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. HIGHLIGHT RESEP (NEW) */}
      <section className="py-24 bg-krem relative overflow-hidden">
        <div className="absolute -left-40 top-20 w-80 h-80 bg-hijau/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="bg-cokelat rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center text-krem"
            >
              <div className="flex items-center gap-3 mb-6 text-emas">
                <Flame size={24} />
                <span className="font-bold tracking-widest uppercase text-sm">Resep Legendaris</span>
              </div>
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-white mb-6">Soto Karawang</h2>
              <p className="text-krem/80 text-lg leading-relaxed mb-8">
                Berbeda dengan soto dari daerah lain, Soto Karawang memiliki ciri khas kuah kuning bumbu rempah yang kental dan sangat gurih. Disajikan dengan potongan daging sapi yang empuk, taburan daun bawang, dan sensasi renyah dari emping mlinjo.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-emas mb-1">Rasa</h4>
                  <p className="text-sm">Gurih, Rempah Kuat</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-emas mb-1">Pendamping</h4>
                  <p className="text-sm">Nasi Hangat, Emping</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="md:w-1/2 relative min-h-[300px] md:min-h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1548943487-a2e4d43b4850?q=80&w=800&auto=format&fit=crop" 
                alt="Soto Karawang" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MENU GRID (ENHANCED) */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-emas font-bold tracking-widest uppercase text-sm mb-2">Eksplorasi Rasa</h2>
            <h3 className="font-playfair text-4xl md:text-5xl font-bold text-cokelat mb-8">Daftar Hidangan Khas</h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                    filter === cat 
                      ? 'bg-hijau text-krem shadow-lg scale-105' 
                      : 'bg-krem text-cokelat border-2 border-transparent hover:border-hijau/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={item.id}
                  className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-emas/10 group hover:-translate-y-2 transition-transform"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/600x400/?food,indonesia&sig=${item.id + 200}`}
                      alt={item.nama}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop"; }}
                    />
                    {/* Overlay gradient bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-cokelat font-bold px-4 py-1.5 rounded-full z-10 shadow-md flex items-center gap-2 text-sm">
                      {item.kategori === 'Minuman' ? <Coffee size={14} className="text-emas"/> : <Utensils size={14} className="text-emas"/>}
                      {item.kategori}
                    </div>

                    {/* Hover Info Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <div className="bg-emas/90 text-cokelat p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Info size={28} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 relative">
                    <div className="absolute -top-6 right-8 bg-krem w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm text-hijau">
                      <Heart size={20} fill="currentColor" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-cokelat mb-3">{item.nama}</h3>
                    <div className="w-12 h-1 bg-emas mb-5 rounded-full"></div>
                    <p className="text-cokelat/70 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Kuliner;
