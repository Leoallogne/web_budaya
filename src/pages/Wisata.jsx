import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Navigation, Compass, Map, Star, Plus, Minus, Route, Check } from 'lucide-react';
import MacVideoPlayer from '../components/MacVideoPlayer';
import dataWisata from '../data/wisata.json';

// --- Static Data Moved Outside ---
const ruteWisata = [
  { nama: "Rute Jejak Sejarah", deskripsi: "Mempelajari sejarah kemerdekaan dan kerajaan di Candi Batujaya dan Monumen Rengasdengklok.", waktu: "1 Hari" },
  { nama: "Eksplorasi Alam Pantai", deskripsi: "Menikmati udara pesisir utara dan sunset indah di Pantai Tanjung Pakis bersama keluarga.", waktu: "Setengah Hari" },
  { nama: "Santai di Pusat Kota", deskripsi: "Bermain di Alun-alun Karawang dilanjutkan menikmati wisata air Situ Cipule yang sejuk.", waktu: "Akhir Pekan" }
];

const wisataImages = {
  1: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rumah_persembunyian.jpg",
  2: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg",
  3: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG",
  4: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg",
  5: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rumah_persembunyian.jpg"
};

// --- Interactive Itinerary Builder Component ---
const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState([]);
  const [activeTab, setActiveTab] = useState('pilih'); // 'pilih' atau 'rute'

  const toggleDestination = (item) => {
    if (itinerary.some(i => i.id === item.id)) {
      setItinerary(itinerary.filter(i => i.id !== item.id));
    } else {
      if (itinerary.length < 4) {
        setItinerary([...itinerary, item]);
      } else {
        alert("Maksimal 4 destinasi untuk satu hari perjalanan!");
      }
    }
  };

  const getMapQuery = () => {
    if (itinerary.length === 0) return "Karawang, Jawa Barat";
    // Using the first item for the map preview, or combined if supported.
    return `${itinerary[0].nama}, Karawang`;
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl p-6 sm:p-8 md:p-12 border border-emas/20 mb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-hijau/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="text-center mb-10">
        <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2 flex justify-center items-center gap-2">
          <Route size={18} /> Rencana Perjalanan
        </h2>
        <h3 className="font-playfair text-3xl md:text-4xl font-bold text-cokelat mb-4">Buat Itinerary Anda</h3>
        <p className="text-cokelat/70 text-sm md:text-base max-w-2xl mx-auto">
          Pilih hingga 4 destinasi untuk merencanakan perjalanan ideal Anda di Karawang hari ini.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Kolom Kiri: Pilihan & Daftar */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="flex gap-4 mb-6 border-b border-emas/20 pb-2">
            <button 
              onClick={() => setActiveTab('pilih')}
              className={`pb-2 font-bold text-sm md:text-base transition-colors ${activeTab === 'pilih' ? 'text-emas border-b-2 border-emas' : 'text-cokelat/50 hover:text-cokelat'}`}
            >
              Pilih Destinasi
            </button>
            <button 
              onClick={() => setActiveTab('rute')}
              className={`pb-2 font-bold text-sm md:text-base transition-colors flex items-center gap-2 ${activeTab === 'rute' ? 'text-hijau border-b-2 border-hijau' : 'text-cokelat/50 hover:text-cokelat'}`}
            >
              Itinerary Saya <span className="bg-emas/20 text-emas px-2 py-0.5 rounded-full text-xs">{itinerary.length}</span>
            </button>
          </div>

          <div className="flex-grow h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {activeTab === 'pilih' ? (
              <div className="space-y-3">
                {dataWisata.map((item) => {
                  const isSelected = itinerary.some(i => i.id === item.id);
                  return (
                    <div 
                      key={item.id}
                      onClick={() => toggleDestination(item)}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all group ${
                        isSelected 
                          ? 'bg-hijau/10 border-hijau/30 text-hijau shadow-sm' 
                          : 'bg-krem/30 border-emas/10 text-cokelat hover:bg-emas/10 hover:border-emas/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={wisataImages[item.id]} alt={item.nama} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm md:text-base">{item.nama}</h4>
                          <p className="text-[10px] md:text-xs opacity-70 flex items-center gap-1"><MapPin size={10}/> {item.lokasi}</p>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-hijau text-white' : 'bg-white text-emas group-hover:bg-emas group-hover:text-white'}`}>
                        {isSelected ? <Check size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {itinerary.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-cokelat/40 pt-10">
                    <Map size={48} className="mb-4 opacity-20" />
                    <p>Belum ada destinasi terpilih.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {itinerary.map((item, index) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                        key={item.id} 
                        className="bg-white p-4 rounded-2xl border border-emas/20 shadow-sm flex items-center gap-4 relative"
                      >
                        <div className="w-8 h-8 rounded-full bg-emas text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-cokelat text-sm md:text-base">{item.nama}</h4>
                          <p className="text-xs text-cokelat/60">{item.kategori}</p>
                        </div>
                        <button 
                          onClick={() => toggleDestination(item)}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Peta */}
        <div className="lg:w-1/2 h-[400px] lg:h-auto rounded-3xl overflow-hidden border border-emas/20 shadow-inner relative bg-krem">
          {itinerary.length > 0 ? (
             <iframe
               title="Peta Rute Wisata"
               width="100%"
               height="100%"
               style={{ border: 0 }}
               loading="lazy"
               allowFullScreen
               src={`https://www.google.com/maps/embed/v1/place?key=AlzaSy...&q=${encodeURIComponent(getMapQuery())}`} 
               // Note: Karena kita tidak punya API key nyata di sini, kita akan gunakan tampilan peta statis / embed generic.
               // Untuk demo, kita pakai iframe placeholder yang aman, atau embed dari openstreetmap.
             ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-cokelat/40 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]">
              <Compass size={64} className="mb-4 opacity-20" />
              <p className="font-playfair text-xl">Peta Wilayah</p>
              <p className="text-sm mt-2">Pilih destinasi untuk melihat perkiraan lokasi.</p>
            </div>
          )}
          {/* Cover iframe with a visual for demo if needed since google maps requires API KEY for generic embed. 
              Let's use a standard iframe mapping to maps.google.com with generic search. */}
          {itinerary.length > 0 && (
             <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(getMapQuery())}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
             ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};


const Wisata = () => {
  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 800], [0, 300]);

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION (PARALLAX) */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden py-16 md:py-0">
        <div className="absolute inset-0 bg-cokelat z-0 overflow-hidden">
          <motion.div 
            style={{ y: yHeroBg }}
            className="absolute inset-[-10%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG')] bg-cover bg-center opacity-40"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-6 md:mt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-emas/20 backdrop-blur-md rounded-full text-emas border border-emas/30 shadow-2xl">
                <Compass size={40} md={48} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 drop-shadow-2xl">
              Wisata <span className="text-emas">Budaya</span>
            </h1>
            <p className="text-base md:text-2xl text-white/90 font-jakarta max-w-3xl mx-auto leading-relaxed shadow-sm">
              Eksplorasi keindahan alam pesisir, situs purbakala bernilai tinggi, hingga tata kota modern yang ramah keluarga.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ITINERARY PLANNER & RUTE REKOMENDASI */}
      <section className="py-16 bg-krem relative z-20 -mt-10 sm:-mt-20">
        <div className="container mx-auto px-4 lg:px-8">
          
          <ItineraryPlanner />

          <div className="text-center mb-10">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-cokelat mb-4">Paket Rute Terpopuler</h3>
            <div className="w-16 h-1 bg-emas mx-auto rounded-full mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ruteWisata.map((rute, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
                className="bg-white p-6 md:p-8 rounded-[32px] border border-emas/10 hover:border-emas/40 hover:shadow-[0_8px_30px_rgb(201,147,58,0.15)] transition-all text-center group"
              >
                <div className="w-12 h-12 bg-krem rounded-full flex items-center justify-center text-emas mx-auto mb-4 group-hover:bg-emas group-hover:text-white transition-colors">
                  <Map size={20} />
                </div>
                <span className="inline-block bg-hijau/10 text-hijau text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                  {rute.waktu}
                </span>
                <h4 className="font-playfair font-bold text-xl text-cokelat mb-3">{rute.nama}</h4>
                <p className="text-cokelat/70 text-sm leading-relaxed">{rute.deskripsi}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. DESTINASI GRID (3D EFFECTS ENHANCED) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
            <h2 className="text-emas font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Semua Destinasi</h2>
            <h3 className="font-playfair text-3xl md:text-5xl font-bold text-cokelat mb-6">Daftar Tempat Wisata</h3>
            <div className="w-24 h-1 bg-hijau mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
            {dataWisata.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={item.id}
                className="bg-krem rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl border border-transparent hover:border-emas/30 flex flex-col group transition-all duration-500 hover:-translate-y-2"
              >
                <div className="h-64 sm:h-72 relative overflow-hidden">
                  <img 
                    src={wisataImages[item.id] || "https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG"}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cokelat via-cokelat/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-hijau shadow-sm uppercase tracking-wider">
                      {item.kategori}
                    </span>
                    <div className="flex gap-1 items-center text-emas bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] sm:text-xs font-bold text-white">4.8</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-2">{item.nama}</h3>
                    <div className="flex items-center gap-2 text-krem/90 text-xs sm:text-sm font-medium">
                      <MapPin size={16} className="text-emas" /> {item.lokasi}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-white relative">
                  <p className="text-cokelat/80 text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-grow">
                    {item.deskripsi}
                  </p>

                  <a 
                    href={item.maps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-krem text-cokelat border border-emas/30 rounded-2xl font-bold hover:bg-emas hover:text-white transition-colors group/btn shadow-sm"
                  >
                    Buka di Google Maps 
                    <Navigation size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> 
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. JELAJAH WISATA VIRTUAL */}
      <section className="py-16 md:py-24 bg-krem relative overflow-hidden border-t border-emas/20">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
            <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Virtual Tour</h2>
            <h3 className="font-playfair text-3xl md:text-5xl font-bold text-cokelat mb-6">Jelajah Wisata Virtual</h3>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            {dataWisata.filter(item => item.youtube).map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MacVideoPlayer videoId={item.youtube} title={`${item.nama}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Wisata;
