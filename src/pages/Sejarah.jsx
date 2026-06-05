import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Landmark, User, Clock, ChevronDown, Plus, Minus, Theater } from 'lucide-react';
import MacVideoPlayer from '../components/MacVideoPlayer';
import dataSejarah from '../data/sejarah.json';

// --- Static Data Moved Outside ---
const tokohSejarah = [
  { nama: "Syekh Hasanuddin (Syekh Quro)", peran: "Penyebar Islam Pertama", deskripsi: "Mendirikan pesantren pertama di Jawa Barat (Pesantren Quro) di Karawang pada awal abad ke-15. Makamnya di Pulobata masih menjadi pusat ziarah." },
  { nama: "R.A.A. Singaperbangsa", peran: "Bupati Pertama Karawang", deskripsi: "Dikenal dengan gelar Adipati Kertabumi III. Dilantik oleh Sultan Agung Mataram pada tahun 1633 untuk meletakkan dasar pemerintahan dan lumbung padi." },
  { nama: "Bung Karno & Bung Hatta", peran: "Proklamator Kemerdekaan", deskripsi: "Pernah disinggahkan oleh para pemuda pejuang (Soekarni, Wikana, dll) ke Rengasdengklok, Karawang, pada 16 Agustus 1945 untuk merumuskan proklamasi." }
];

const eraCategories = [
  { id: "semua", label: "Semua Era", ids: [1,2,3,4,5,6] },
  { id: "kuno", label: "Peradaban Kuno", ids: [1,2] },
  { id: "kolonial", label: "Kolonial & Kemerdekaan", ids: [3,4] },
  { id: "modern", label: "Era Modern", ids: [5,6] }
];

// --- 3D Hover Card Component ---
const TokohCard = ({ tokoh, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouse(event) {
    if(!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={() => {
          x.set(200);
          y.set(200);
        }}
        style={{ rotateX, rotateY }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl h-full flex flex-col group overflow-hidden relative cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emas/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-emas/20 rounded-2xl flex items-center justify-center text-emas mb-6 group-hover:scale-110 group-hover:bg-emas group-hover:text-cokelat transition-all duration-300 shadow-inner">
            <User size={32} />
          </div>
          <span className="text-emas font-semibold text-sm tracking-widest uppercase block mb-2">{tokoh.peran}</span>
          <h4 className="font-playfair text-2xl font-bold text-white mb-4">{tokoh.nama}</h4>
        </div>

        <div className="relative z-10 mt-auto">
          <div className="h-0 group-hover:h-[120px] opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
            <p className="text-krem/90 leading-relaxed font-light pt-2 text-sm md:text-base">
              {tokoh.deskripsi}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Sejarah = () => {
  const [activeEra, setActiveEra] = useState("semua");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 800], [0, 250]);

  const activeCategory = eraCategories.find(c => c.id === activeEra);
  const filteredTimeline = dataSejarah.filter(item => activeCategory.ids.includes(item.id));

  return (
    <div className={`transition-colors duration-700 min-h-screen ${isTheaterMode ? 'bg-cokelat' : 'bg-krem'}`}>
      
      {/* 1. HERO SECTION SEJARAH (PARALLAX) */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cokelat z-0 overflow-hidden">
          <motion.div 
            style={{ y: yHeroBg }}
            className="absolute inset-[-10%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d5/Rumah_persembunyian.jpg')] bg-cover bg-center opacity-40"
          ></motion.div>
          <div className={`absolute inset-0 transition-colors duration-700 ${isTheaterMode ? 'bg-cokelat/90' : 'bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem'}`}></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-emas/20 backdrop-blur-md rounded-full text-emas border border-emas/30 shadow-[0_0_20px_rgba(201,147,58,0.3)]">
                <Landmark size={40} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 drop-shadow-2xl">
              Jejak <span className="text-emas">Sejarah</span>
            </h1>
            <p className="text-lg md:text-2xl text-krem/90 font-jakarta max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md">
              Menyusuri lorong waktu pangkal perjuangan; dari pusat penyebaran Islam, lumbung padi nasional, hingga saksi bisu kemerdekaan Republik Indonesia.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center text-emas mt-8"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. TIMELINE ZIGZAG DENGAN FILTER (NEW) */}
      <section className={`py-24 px-4 relative transition-colors duration-700 ${isTheaterMode ? 'bg-cokelat text-white/50' : 'bg-krem text-cokelat'}`}>
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-hijau font-bold tracking-widest uppercase text-sm mb-2">Kronologi Waktu</h2>
            <h3 className={`font-playfair text-4xl md:text-5xl font-bold mb-6 ${isTheaterMode ? 'text-white' : 'text-cokelat'}`}>Garis Waktu Karawang</h3>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-10"></div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 bg-white/40 backdrop-blur-sm p-2 rounded-2xl shadow-sm border border-emas/20 inline-flex">
              {eraCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveEra(cat.id); setExpandedEvent(null); }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all relative ${activeEra === cat.id ? 'text-cokelat shadow-md' : 'text-cokelat/60 hover:text-cokelat hover:bg-white/50'}`}
                >
                  {activeEra === cat.id && (
                    <motion.div layoutId="activeEraPill" className="absolute inset-0 bg-emas rounded-xl -z-10" />
                  )}
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="relative mt-16">
            {/* Garis vertikal timeline */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emas via-emas/40 to-transparent transform md:-translate-x-1/2 rounded-full"></div>

            <AnimatePresence mode="popLayout">
              {filteredTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                const isExpanded = expandedEvent === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                    className={`relative flex flex-col items-start md:items-center justify-between mb-16 md:mb-24 ${
                      isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Spasi zig-zag di desktop */}
                    <div className="hidden md:block md:w-5/12"></div>

                    {/* Dot Timeline */}
                    <motion.div 
                      layout
                      className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-emas shadow-[0_0_20px_rgba(201,147,58,0.5)] transform -translate-x-1/2 flex items-center justify-center z-10 mt-6 md:mt-0"
                    >
                      <div className="w-3 h-3 bg-cokelat rounded-full"></div>
                    </motion.div>

                    {/* Konten Card */}
                    <div className="w-full pl-16 md:pl-0 md:w-5/12 z-10">
                      <motion.div
                        layout
                        onClick={() => setExpandedEvent(isExpanded ? null : item.id)}
                        className={`p-6 md:p-8 rounded-3xl shadow-xl border cursor-pointer transition-colors relative overflow-hidden group ${
                          isTheaterMode ? 'bg-cokelat/80 backdrop-blur-md border-emas/20' : 'bg-white border-emas/10 hover:border-emas/40'
                        }`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emas/5 rounded-bl-[100px] -mr-10 -mt-10 z-0 transition-transform group-hover:scale-150 group-hover:bg-emas/10 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                          <motion.div layout className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-krem text-hijau rounded-lg shadow-sm">
                              <Clock size={20} />
                            </div>
                            <span className="inline-block px-4 py-1 bg-hijau/10 text-hijau font-bold rounded-full text-sm">
                              {item.tahun}
                            </span>
                          </motion.div>
                          
                          <motion.h3 layout className={`font-playfair text-2xl md:text-3xl font-bold mb-4 ${isTheaterMode ? 'text-white' : 'text-cokelat'}`}>
                            {item.era}
                          </motion.h3>
                          
                          <motion.p layout className={`leading-relaxed text-base md:text-lg ${isTheaterMode ? 'text-krem/70' : 'text-cokelat/80'}`}>
                            {item.deskripsi}
                          </motion.p>
                          
                          {/* Tombol Expand */}
                          <motion.div layout className="mt-6 flex justify-end">
                            <button className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors ${
                              isExpanded ? 'bg-cokelat text-emas' : 'bg-emas/10 text-emas group-hover:bg-emas group-hover:text-cokelat'
                            }`}>
                              {isExpanded ? <><Minus size={16}/> Tutup</> : <><Plus size={16}/> Pelajari Selengkapnya</>}
                            </button>
                          </motion.div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="overflow-hidden"
                              >
                                <div className={`p-5 rounded-2xl border ${isTheaterMode ? 'bg-black/20 border-white/10' : 'bg-krem border-emas/20'}`}>
                                  <p className={`text-sm italic ${isTheaterMode ? 'text-white/60' : 'text-cokelat/70'}`}>
                                    *Dokumen sejarah terperinci tentang {item.era} akan dimuat di sini. Menampilkan artefak, foto arsip, dan catatan saksi mata yang berkaitan dengan peristiwa ini.*
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. TOKOH BERSEJARAH (3D HOVER CARDS) */}
      <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${isTheaterMode ? 'bg-black' : 'bg-cokelat'} text-krem`}>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-emas font-bold tracking-widest uppercase text-sm mb-2">Tokoh & Pahlawan</h2>
            <h3 className="font-playfair text-4xl md:text-5xl text-white font-bold mb-6 drop-shadow-lg">Figur Pengukir Sejarah</h3>
            <div className="w-24 h-1 bg-hijau mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(74,124,89,0.5)]"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {tokohSejarah.map((tokoh, index) => (
              <TokohCard key={index} tokoh={tokoh} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. VIDEO DOKUMENTER (THEATER MODE) */}
      <section className={`py-16 md:py-24 relative overflow-hidden transition-colors duration-700 ${isTheaterMode ? 'bg-black/95 shadow-[inset_0_0_100px_rgba(0,0,0,1)]' : 'bg-krem'}`}>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center md:text-left">
              <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Dokumenter</h2>
              <h3 className={`font-playfair text-3xl md:text-5xl font-bold mb-4 ${isTheaterMode ? 'text-white' : 'text-cokelat'}`}>Saksi Bisu Sejarah</h3>
              <div className={`w-24 h-1 rounded-full mx-auto md:mx-0 ${isTheaterMode ? 'bg-emas/50' : 'bg-emas'}`}></div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-lg ${
                isTheaterMode ? 'bg-emas text-cokelat shadow-emas/20' : 'bg-cokelat text-emas'
              }`}
            >
              <Theater size={20} />
              {isTheaterMode ? 'Matikan Theater Mode' : 'Mode Bioskop (Gelap)'}
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className={`transition-all duration-700 rounded-[2rem] overflow-hidden ${isTheaterMode ? 'shadow-[0_0_50px_rgba(201,147,58,0.2)] scale-[1.02] border-2 border-emas/20' : 'shadow-2xl'}`}
          >
            <MacVideoPlayer videoId="VjGf2SNkDWM" title="Sejarah Karawang" />
          </motion.div>
        </div>
      </section>

      {/* 5. GALERI MASA LALU */}
      <section className={`py-24 transition-colors duration-700 ${isTheaterMode ? 'bg-cokelat' : 'bg-white'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-hijau font-bold tracking-widest uppercase text-sm mb-2">Dokumenter Visual</h2>
              <h3 className={`font-playfair text-4xl md:text-5xl font-bold ${isTheaterMode ? 'text-white' : 'text-cokelat'} mb-4`}>Galeri Masa Lalu</h3>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className={`mt-6 md:mt-0 max-w-sm text-right ${isTheaterMode ? 'text-white/50' : 'text-cokelat/60'}`}
            >
              <p>Merekam jejak keemasan dan perjuangan melalui lensa sejarah.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG" alt="Candi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-cokelat/90 via-transparent to-transparent"></div>
              <h4 className="absolute bottom-6 left-6 font-playfair text-3xl font-bold text-white drop-shadow-md">Candi Batujaya</h4>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="md:col-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/id/1/15/Mengolah-sawah.jpg" alt="Padi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-cokelat/90 via-transparent to-transparent"></div>
              <h4 className="absolute bottom-6 left-6 font-playfair text-2xl font-bold text-white drop-shadow-md">Lumbung Padi Nasional</h4>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="md:col-span-1 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Rumah_persembunyian.jpg" alt="Sejarah" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-cokelat/40 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-1 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Wayang_golek_SF_Asian_Art_Museum.JPG" alt="Tradisi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-cokelat/40 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sejarah;
