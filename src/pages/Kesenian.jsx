import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { X, Search, Music, Star, Sparkles, PlayCircle, Info, ChevronRight, Theater } from 'lucide-react';
import MacVideoPlayer from '../components/MacVideoPlayer';
import dataKesenian from '../data/kesenian.json';

// --- Static Data Moved Outside ---
const kesenianImages = {
  1: "https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg",
  2: "https://upload.wikimedia.org/wikipedia/commons/8/82/Tari_topeng_cirebon.jpg",
  3: "https://upload.wikimedia.org/wikipedia/commons/9/99/Wayang_golek_SF_Asian_Art_Museum.JPG",
  4: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Diajar_gamelan_degung.jpg",
  5: "https://upload.wikimedia.org/wikipedia/id/5/5d/Calung-sunda.jpg",
  6: "https://upload.wikimedia.org/wikipedia/commons/4/4a/WickerCatPole.jpg"
};

const gamelanTones = [
  { name: 'Da', freq: 261.63 }, // C4
  { name: 'Mi', freq: 311.13 }, // Eb4
  { name: 'Na', freq: 349.23 }, // F4
  { name: 'Ti', freq: 392.00 }, // G4
  { name: 'La', freq: 466.16 }, // Bb4
];

// --- 3D Card Component ---
const KesenianCard = ({ item, onClick }) => {
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
      style={{ perspective: 1000 }}
      layout
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.9 }} 
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="cursor-pointer h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={() => { x.set(200); y.set(200); }}
        style={{ rotateX, rotateY }}
        className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-emas/10 group hover:shadow-2xl transition-all h-full flex flex-col relative"
      >
        <div className="h-56 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-cokelat/80 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity"></div>
          <img 
            src={kesenianImages[item.id] || "https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg"}
            alt={item.nama}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
            onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg"; }}
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-hijau shadow-sm uppercase tracking-wider">
              {item.kategori}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
             <div className="bg-emas text-white p-4 rounded-full shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
               <Search size={24} />
             </div>
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
    </motion.div>
  );
};

const Kesenian = () => {
  const [filter, setFilter] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [activeTone, setActiveTone] = useState(null);

  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 800], [0, 300]);

  const categories = ['Semua', ...new Set(dataKesenian.map(item => item.kategori))];
  const filteredData = filter === 'Semua' ? dataKesenian : dataKesenian.filter(item => item.kategori === filter);

  // Audio Context Ref
  const audioCtxRef = useRef(null);

  useEffect(() => {
    // Initialize audio context only on user interaction later
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playTone = (tone) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    // Create oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine'; // Bamboo/Gamelan like pure tone
    osc.frequency.setValueAtTime(tone.freq, ctx.currentTime);
    
    // Envelope to sound like a percussive strike
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
    
    setActiveTone(tone.name);
    setTimeout(() => setActiveTone(null), 300);
  };

  return (
    <div className={`transition-colors duration-700 min-h-screen ${isTheaterMode ? 'bg-cokelat' : 'bg-krem'}`}>
      
      {/* 1. HERO SECTION (PARALLAX) */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cokelat z-0 overflow-hidden">
          <motion.div 
            style={{ y: yHeroBg }}
            className="absolute inset-[-10%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg')] bg-cover bg-center opacity-40"
          ></motion.div>
          <div className={`absolute inset-0 transition-colors duration-700 ${isTheaterMode ? 'bg-cokelat/90' : 'bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem'}`}></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6 md:mt-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-emas/20 backdrop-blur-md rounded-full text-emas border border-emas/30 shadow-2xl">
                <Music size={40} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 drop-shadow-2xl">
              Seni & <span className="text-emas">Kriya</span>
            </h1>
            <p className="text-base md:text-2xl text-white/90 font-jakarta max-w-2xl mx-auto leading-relaxed shadow-sm">
              Ekspresi jiwa masyarakat Sunda yang terukir dalam gerak tari dinamis, alunan melodi bambu, dan mahakarya kerajinan tangan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. VIRTUAL INSTRUMENT (NEW) */}
      <section className="py-16 bg-white relative overflow-hidden -mt-10 md:-mt-16 z-20 mx-4 lg:mx-auto max-w-6xl rounded-[40px] shadow-2xl border border-emas/20">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2 flex justify-center items-center gap-2">
            <PlayCircle size={16} /> Interaktif
          </h2>
          <h3 className="font-playfair text-3xl md:text-4xl text-cokelat font-bold mb-4">Virtual Gamelan & Calung</h3>
          <p className="text-cokelat/70 text-sm md:text-base max-w-2xl mx-auto mb-10">
            Sentuh bilah di bawah ini untuk mendengarkan nada pentatonik pelog/salendro khas alat musik tradisional Sunda.
          </p>

          <div className="flex justify-center items-end gap-2 md:gap-4 h-48 md:h-64 px-4 overflow-x-auto custom-scrollbar pb-8">
            {gamelanTones.map((tone, index) => {
              // Menghitung tinggi bilah yang berbeda-beda
              const height = 100 - (index * 10);
              const isActive = activeTone === tone.name;
              return (
                <button
                  key={tone.name}
                  onClick={() => playTone(tone)}
                  style={{ height: `${height}%` }}
                  className={`relative w-16 md:w-24 rounded-t-xl transition-all duration-100 flex flex-col items-center justify-end pb-4
                    ${isActive 
                      ? 'bg-gradient-to-b from-emas to-yellow-600 shadow-[0_0_30px_rgba(201,147,58,0.8)] -translate-y-4' 
                      : 'bg-gradient-to-b from-[#8B5A2B] to-[#5C3A21] shadow-lg hover:from-emas/80 hover:to-[#8B5A2B] hover:-translate-y-2'
                    }
                  `}
                >
                  <div className={`w-3 h-3 rounded-full mb-auto mt-4 shadow-inner ${isActive ? 'bg-white' : 'bg-black/40'}`}></div>
                  <div className={`w-3 h-3 rounded-full mb-4 shadow-inner ${isActive ? 'bg-white' : 'bg-black/40'}`}></div>
                  <span className={`font-bold text-lg md:text-2xl ${isActive ? 'text-white' : 'text-krem/60'}`}>{tone.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. GALERI BENTO GRID */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-hijau/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <h2 className={`font-bold tracking-widest uppercase text-xs md:text-sm mb-2 transition-colors duration-700 ${isTheaterMode ? 'text-emas/70' : 'text-emas'}`}>Koleksi Seni</h2>
            <h3 className={`font-playfair text-3xl md:text-5xl font-bold mb-8 transition-colors duration-700 ${isTheaterMode ? 'text-white' : 'text-cokelat'}`}>Eksplorasi Ragam Kesenian</h3>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                    filter === cat 
                      ? 'bg-cokelat text-emas shadow-xl scale-105 border-emas' 
                      : isTheaterMode 
                        ? 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                        : 'bg-white text-cokelat border border-emas/20 hover:border-emas hover:bg-krem'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            <AnimatePresence>
              {filteredData.map(item => (
                <KesenianCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
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
              className="bg-white w-full max-w-5xl rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 text-white p-3 rounded-full hover:bg-emas hover:text-cokelat transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 relative shrink-0 min-h-[300px]">
                  <img 
                    src={kesenianImages[selectedItem.id] || "https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg"}
                    alt={selectedItem.nama}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cokelat/80 to-transparent md:hidden"></div>
                </div>

                <div className="md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-krem/30">
                  <span className="inline-block bg-hijau/10 text-hijau font-bold tracking-wider uppercase text-[10px] sm:text-xs px-4 py-2 rounded-full mb-4 self-start border border-hijau/20">
                    {selectedItem.kategori}
                  </span>
                  <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-cokelat mb-4 md:mb-6">{selectedItem.nama}</h3>
                  <div className="w-16 h-1 bg-emas mb-4 md:mb-6 rounded-full"></div>
                  <p className="text-cokelat/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-medium">
                    {selectedItem.deskripsi}
                  </p>
                  
                  <div className="bg-white p-5 rounded-2xl border border-emas/20 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 bg-emas/10 rounded-full flex items-center justify-center text-emas shrink-0 border border-emas/20">
                      <Star size={28} />
                    </div>
                    <div>
                      <h5 className="font-bold text-base md:text-lg text-cokelat">Warisan Budaya</h5>
                      <p className="text-xs sm:text-sm text-cokelat/60">Seni turun temurun Karawang</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. GALERI VIDEO THEATER MODE (ENHANCED) */}
      <section className={`py-16 md:py-32 relative overflow-hidden border-t transition-colors duration-700 ${isTheaterMode ? 'border-white/10' : 'border-emas/20'}`}>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center md:text-left mb-6 md:mb-0">
              <h2 className={`font-bold tracking-widest uppercase text-xs md:text-sm mb-2 transition-colors duration-700 ${isTheaterMode ? 'text-hijau/70' : 'text-hijau'}`}>Sinematik</h2>
              <h3 className={`font-playfair text-3xl md:text-5xl font-bold transition-colors duration-700 ${isTheaterMode ? 'text-white' : 'text-cokelat'}`}>Dokumenter Pertunjukan</h3>
              <div className="w-24 h-1 bg-emas rounded-full mt-6 mx-auto md:mx-0"></div>
            </motion.div>
            
            <motion.button 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all ${
                isTheaterMode 
                  ? 'bg-emas text-cokelat shadow-[0_0_20px_rgba(201,147,58,0.4)]' 
                  : 'bg-cokelat text-krem hover:bg-hijau'
              }`}
            >
              <Theater size={20} />
              {isTheaterMode ? "Nyalakan Lampu" : "Matikan Lampu"}
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {dataKesenian.filter(item => item.youtube).map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={isTheaterMode ? 'scale-105 transition-transform duration-700 z-10' : 'transition-transform duration-700'}
              >
                <MacVideoPlayer videoId={item.youtube} title={`Pertunjukan ${item.nama}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Kesenian;
