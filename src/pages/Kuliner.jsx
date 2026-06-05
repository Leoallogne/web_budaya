import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Utensils, Flame, Coffee, Info, Heart, RefreshCw, ChefHat, CheckCircle2 } from 'lucide-react';
import MacVideoPlayer from '../components/MacVideoPlayer';
import dataKuliner from '../data/kuliner.json';

// --- Static Data Moved Outside ---
const kulinerImages = {
  1: "https://upload.wikimedia.org/wikipedia/commons/0/05/Soto_ayam.JPG",
  2: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Pepes_ikan_emas_%28pais_lauk_mas%29_Sunda.jpg",
  3: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Karedok_platter.JPG",
  4: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Gemblong.JPG",
  5: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Dodol_Garut_Cihampelas_Bandung.JPG",
  6: "https://upload.wikimedia.org/wikipedia/commons/8/86/Kampung_Paya_Jaras_Tengah%2C_Selangor_20250112_111330.jpg"
};

// Data Profil Rasa
const flavorProfiles = {
  1: { manis: 10, gurih: 90, pedas: 40, asam: 20 }, // Soto
  2: { manis: 20, gurih: 80, pedas: 60, asam: 10 }, // Pepes
  3: { manis: 40, gurih: 60, pedas: 70, asam: 30 }, // Karedok
  4: { manis: 90, gurih: 40, pedas: 0, asam: 0 },   // Gemblong
  5: { manis: 100, gurih: 30, pedas: 0, asam: 0 },  // Dodol
  6: { manis: 80, gurih: 60, pedas: 0, asam: 10 },  // Cendol
};

const FlavorBar = ({ label, value, colorClass }) => (
  <div className="mb-2 w-full">
    <div className="flex justify-between text-[10px] sm:text-xs mb-1 text-krem/80 font-bold uppercase tracking-wider">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full bg-black/40 rounded-full h-1.5 sm:h-2 overflow-hidden shadow-inner">
      <motion.div 
        initial={{ width: 0 }} 
        whileInView={{ width: `${value}%` }} 
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${colorClass}`}
      ></motion.div>
    </div>
  </div>
);

// --- 3D Flip Card Component ---
const RecipeFlipCard = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flavors = flavorProfiles[item.id] || { manis: 50, gurih: 50, pedas: 50, asam: 50 };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] [perspective:1000px] group">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-700 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.1)] rounded-[32px] border border-emas/20"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Sisi Depan */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-[32px] overflow-hidden flex flex-col">
          <div className="h-[60%] relative overflow-hidden">
            <img 
              src={kulinerImages[item.id] || "https://upload.wikimedia.org/wikipedia/commons/0/05/Soto_ayam.JPG"}
              alt={item.nama}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/0/05/Soto_ayam.JPG"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-cokelat font-bold px-4 py-1.5 rounded-full z-10 shadow-md flex items-center gap-2 text-[10px] sm:text-xs">
              {item.kategori === 'Minuman' ? <Coffee size={14} className="text-emas"/> : <Utensils size={14} className="text-emas"/>}
              {item.kategori}
            </div>
          </div>
          <div className="p-6 relative flex-grow flex flex-col justify-center text-center">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-krem w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm text-hijau z-20">
              <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-cokelat mb-2 mt-4">{item.nama}</h3>
            <div className="w-12 h-1 bg-emas mx-auto rounded-full mb-3"></div>
            <p className="text-cokelat/60 text-xs sm:text-sm font-semibold uppercase tracking-widest">Sentuh untuk membalik</p>
          </div>
        </div>

        {/* Sisi Belakang (Resep & Rasa) */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-cokelat rounded-[32px] overflow-hidden p-6 sm:p-8 flex flex-col justify-center border border-emas/30 text-krem">
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-emas mb-1 text-center">{item.nama}</h3>
          <p className="text-center text-[10px] sm:text-xs text-krem/50 mb-4">{item.kategori}</p>
          
          <p className="text-xs sm:text-sm text-krem/80 leading-relaxed mb-6 text-center line-clamp-3">
            {item.deskripsi}
          </p>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-4 flex-grow">
            <h4 className="font-bold text-emas text-[10px] sm:text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <Flame size={14} /> Profil Rasa
            </h4>
            <FlavorBar label="Gurih" value={flavors.gurih} colorClass="bg-yellow-500" />
            <FlavorBar label="Manis" value={flavors.manis} colorClass="bg-orange-400" />
            <FlavorBar label="Pedas" value={flavors.pedas} colorClass="bg-red-500" />
            <FlavorBar label="Asam" value={flavors.asam} colorClass="bg-lime-400" />
          </div>

          <button className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 bg-emas/20 hover:bg-emas text-emas hover:text-cokelat rounded-xl transition-colors font-bold text-xs sm:text-sm border border-emas/30">
            <RefreshCw size={16} /> Kembali
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Kuliner = () => {
  const [filter, setFilter] = useState('Semua');
  
  // Menu Builder State
  const [selectedMenu, setSelectedMenu] = useState({ utama: null, camilan: null, minuman: null });

  const categories = ['Semua', ...new Set(dataKuliner.map(item => item.kategori))];
  const filteredData = filter === 'Semua' ? dataKuliner : dataKuliner.filter(item => item.kategori === filter);

  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 800], [0, 250]);

  // Menu Builder Logic
  const menuUtamaOptions = dataKuliner.filter(i => i.kategori === 'Makanan Utama' || i.kategori === 'Sayuran');
  const camilanOptions = dataKuliner.filter(i => i.kategori === 'Camilan');
  const minumanOptions = dataKuliner.filter(i => i.kategori === 'Minuman');

  const handleSelectMenu = (type, item) => {
    setSelectedMenu(prev => ({ ...prev, [type]: item }));
  };

  const getMenuFeedback = () => {
    const count = Object.values(selectedMenu).filter(Boolean).length;
    if (count === 0) return "Belum ada sajian yang dipilih. Mangga dipilih, akang, teteh!";
    if (count === 1) return "Pilihan yang sedap! Tambahkan pendamping agar lebih mantap.";
    if (count === 2) return "Kombinasi yang pas! Tinggal satu menu lagi untuk menyempurnakan hidangan.";
    return "Luar Biasa! Ini adalah sajian otentik Sunda Karawang sejati. Raos pisan euy!";
  };

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION (PARALLAX) */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cokelat z-0 overflow-hidden">
          <motion.div 
            style={{ y: yHeroBg }}
            className="absolute inset-[-10%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/0/05/Soto_ayam.JPG')] bg-cover bg-center opacity-40"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6 md:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-emas border border-white/20 shadow-xl">
                <Utensils size={36} md={40} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-4 drop-shadow-2xl">
              Kuliner <span className="text-emas">Khas</span>
            </h1>
            <p className="text-base md:text-2xl text-white/90 font-jakarta max-w-2xl mx-auto leading-relaxed shadow-sm">
              Kelezatan bumbu rempah warisan leluhur yang menggugah selera, dari hidangan utama hingga kudapan manis tradisional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE MENU BUILDER (GAME) */}
      <section className="py-16 bg-white relative overflow-hidden -mt-10 md:-mt-16 z-20 mx-4 lg:mx-auto max-w-6xl rounded-[40px] shadow-2xl border border-emas/20">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-hijau text-krem rounded-full mb-4 shadow-lg border-4 border-white">
              <ChefHat size={32} />
            </div>
            <h3 className="font-playfair text-3xl sm:text-4xl text-cokelat font-bold mb-2">Sajian Nusantara Anda</h3>
            <p className="text-cokelat/70 text-sm md:text-base max-w-xl mx-auto">
              Pilih hidangan utama, camilan, dan minuman untuk melihat profil hidangan gaya Sunda Karawang Anda hari ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Kolom 1: Utama */}
            <div className="bg-krem/50 p-6 rounded-3xl border border-emas/20 text-center">
              <h4 className="font-bold text-emas uppercase tracking-widest text-xs mb-4">Hidangan Utama</h4>
              <div className="space-y-3">
                {menuUtamaOptions.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => handleSelectMenu('utama', item)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all border ${selectedMenu.utama?.id === item.id ? 'bg-cokelat text-emas border-emas shadow-lg scale-105' : 'bg-white text-cokelat border-transparent hover:border-emas/50 hover:bg-white'}`}
                  >
                    {item.nama}
                  </button>
                ))}
              </div>
            </div>
            {/* Kolom 2: Camilan */}
            <div className="bg-krem/50 p-6 rounded-3xl border border-emas/20 text-center">
              <h4 className="font-bold text-emas uppercase tracking-widest text-xs mb-4">Kudapan Manis</h4>
              <div className="space-y-3">
                {camilanOptions.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => handleSelectMenu('camilan', item)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all border ${selectedMenu.camilan?.id === item.id ? 'bg-cokelat text-emas border-emas shadow-lg scale-105' : 'bg-white text-cokelat border-transparent hover:border-emas/50 hover:bg-white'}`}
                  >
                    {item.nama}
                  </button>
                ))}
              </div>
            </div>
            {/* Kolom 3: Minuman */}
            <div className="bg-krem/50 p-6 rounded-3xl border border-emas/20 text-center">
              <h4 className="font-bold text-emas uppercase tracking-widest text-xs mb-4">Penutup Dahaga</h4>
              <div className="space-y-3">
                {minumanOptions.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => handleSelectMenu('minuman', item)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all border ${selectedMenu.minuman?.id === item.id ? 'bg-cokelat text-emas border-emas shadow-lg scale-105' : 'bg-white text-cokelat border-transparent hover:border-emas/50 hover:bg-white'}`}
                  >
                    {item.nama}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-hijau rounded-3xl p-6 sm:p-8 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emas/20 rounded-full blur-2xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selectedMenu.utama ? 'bg-emas text-cokelat' : 'bg-white/20 text-white/50'}`}><Utensils size={20}/></div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selectedMenu.camilan ? 'bg-emas text-cokelat' : 'bg-white/20 text-white/50'}`}><Heart size={20}/></div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selectedMenu.minuman ? 'bg-emas text-cokelat' : 'bg-white/20 text-white/50'}`}><Coffee size={20}/></div>
              </div>
              <p className="font-playfair text-xl sm:text-2xl font-bold mb-2">
                {getMenuFeedback()}
              </p>
              {Object.values(selectedMenu).filter(Boolean).length === 3 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm border border-white/30 inline-flex items-center gap-2 text-sm font-bold text-emas">
                  <CheckCircle2 size={18} /> Menu Sempurna
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENU FLIP CARDS GRID (ENHANCED) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <h2 className="text-emas font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Eksplorasi Rasa</h2>
            <h3 className="font-playfair text-3xl md:text-5xl font-bold text-cokelat mb-8">Daftar Hidangan Khas</h3>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                    filter === cat 
                      ? 'bg-hijau text-krem shadow-lg scale-105 border-transparent' 
                      : 'bg-krem text-cokelat border border-emas/20 hover:border-emas hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={item.id}
                >
                  <RecipeFlipCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. DOKUMENTER & RESEP KULINER (ENHANCED) */}
      <section className="py-16 md:py-24 bg-cokelat relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Indonesian_Food.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
            <h2 className="text-emas font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Liputan</h2>
            <h3 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-6">Dokumenter & Resep Kuliner</h3>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {dataKuliner.filter(item => item.youtube).map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MacVideoPlayer videoId={item.youtube} title={`Resep ${item.nama}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Kuliner;
