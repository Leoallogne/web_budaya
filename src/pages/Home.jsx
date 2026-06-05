import { useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Music, Utensils, MessageCircle, MapPin, Calendar, PlayCircle, ChevronRight, Navigation, X, Search, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import dataTradisi from '../data/tradisi.json';
import dataWisata from '../data/wisata.json';
import dataKuliner from '../data/kuliner.json';
import MacVideoPlayer from '../components/MacVideoPlayer';

// --- Static Data Moved Outside Component ---
const features = [
  { title: 'Sejarah', icon: <BookOpen size={32} />, path: '/sejarah', desc: 'Jejak peradaban dari Tarumanagara hingga era modern.', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG' },
  { title: 'Kesenian', icon: <Music size={32} />, path: '/kesenian', desc: 'Kekayaan seni pertunjukan dan kriya warisan leluhur.', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', img: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg' },
  { title: 'Kuliner', icon: <Utensils size={32} />, path: '/kuliner', desc: 'Cita rasa otentik bumbu rempah khas Sunda Karawang.', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', img: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Sate_Kuah_1.jpg' },
  { title: 'Bahasa', icon: <MessageCircle size={32} />, path: '/bahasa', desc: 'Tradisi lisan dan kearifan lokal masyarakat agraris.', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', img: 'https://upload.wikimedia.org/wikipedia/id/1/15/Mengolah-sawah.jpg' },
  { title: 'Wisata', icon: <MapPin size={32} />, path: '/wisata', desc: 'Destinasi alam dan sejarah yang memukau.', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg' },
];

const highlightWisata = dataWisata.slice(0, 3);
const highlightWisataImages = [
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rumah_persembunyian.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG"
];

const carouselImages = [
  "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bendung_Walahar.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/ba/Sate_Kuah_1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rumah_persembunyian.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Wayang_golek_SF_Asian_Art_Museum.JPG"
];

const dataKunjungan = [
  { tahun: '2019', domestik: 4000, mancanegara: 2400 },
  { tahun: '2020', domestik: 1500, mancanegara: 800 },
  { tahun: '2021', domestik: 2000, mancanegara: 980 },
  { tahun: '2022', domestik: 2780, mancanegara: 1908 },
  { tahun: '2023', domestik: 3890, mancanegara: 4800 },
  { tahun: '2024', domestik: 4390, mancanegara: 5800 },
];

const dataSeni = [
  { name: 'Tari Tradisional', value: 35 },
  { name: 'Seni Pertunjukan', value: 25 },
  { name: 'Musik Daerah', value: 20 },
  { name: 'Kriya & Anyaman', value: 20 },
];

const dataEkonomi = [
  { bulan: 'Jan', umkm: 1200 },
  { bulan: 'Feb', umkm: 2100 },
  { bulan: 'Mar', umkm: 1800 },
  { bulan: 'Apr', umkm: 2780 },
  { bulan: 'Mei', umkm: 3890 },
  { bulan: 'Jun', umkm: 4390 },
  { bulan: 'Jul', umkm: 5490 },
];

const PIE_COLORS = ['#8b5e34', '#c9a227', '#2e4c32', '#dcd3b6'];

const Home = () => {
  const [activeMapQuery, setActiveMapQuery] = useState("Alun-alun Karawang");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("kunjungan"); // kunjungan, seni, umkm
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 1000], [0, 400]);

  // Memoize map locations
  const mapLocations = useMemo(() => {
    return [
      ...dataWisata.map(w => ({ id: `w-${w.id}`, nama: w.nama, kategori: w.kategori, type: 'wisata', query: `${w.nama} Karawang` })),
      ...dataKuliner.slice(0, 4).map(k => ({ id: `k-${k.id}`, nama: k.nama, kategori: 'Kuliner', type: 'kuliner', query: `${k.nama} Karawang` }))
    ];
  }, []);

  const filteredLocations = useMemo(() => {
    return mapLocations.filter(loc => loc.nama.toLowerCase().includes(searchQuery.toLowerCase()) || loc.kategori.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [mapLocations, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-krem min-h-screen overflow-hidden">
      {/* 1. HERO SECTION (WITH PARALLAX & VIDEO MODAL) */}
      <section className="relative min-h-[85vh] md:h-screen flex items-center justify-center overflow-hidden py-16 md:py-0">
        <div className="absolute inset-0 bg-cokelat z-0 overflow-hidden">
          <motion.div
            style={{ y: yHeroBg }}
            className="absolute inset-[-10%] bg-[url('https://upload.wikimedia.org/wikipedia/id/1/15/Mengolah-sawah.jpg')] bg-cover bg-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 sm:pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emas mb-6 md:mb-8 shadow-[0_0_15px_rgba(201,147,58,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emas animate-pulse"></span>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase">Pesona Jawa Barat</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-bold mb-6 drop-shadow-2xl leading-tight">
              Budaya <br className="md:hidden" />
              <span className="text-emas">Karawang</span>
            </h1>
            <p className="text-base md:text-2xl text-krem/90 font-jakarta max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-light drop-shadow-md">
              Menelusuri warisan leluhur di lumbung padi nasional, tempat lahirnya sejarah kemerdekaan dan pusat peradaban kuno Nusantara.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-emas text-cokelat px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 hover:bg-white transition-colors shadow-xl"
              >
                Mulai Eksplorasi <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
                className="w-full sm:w-auto bg-transparent border-2 border-emas text-emas px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 hover:bg-emas/20 backdrop-blur-sm transition-all shadow-xl group"
              >
                <div className="bg-emas text-cokelat rounded-full p-1 group-hover:scale-110 transition-transform"><PlayCircle size={20} /></div> Tonton Video
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-cokelat flex flex-col items-center pointer-events-none z-10"
        >
          <span className="text-xs font-bold tracking-widest uppercase mb-2 drop-shadow-sm">Scroll</span>
          <div className="w-5 h-8 border-2 border-cokelat rounded-full flex justify-center pt-1.5 backdrop-blur-sm bg-white/10">
            <div className="w-1 h-1 bg-cokelat rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setShowVideo(false)}
                className="text-white hover:text-emas bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-5xl"
            >
              <MacVideoPlayer videoId="VjGf2SNkDWM" title="Pesona Budaya Karawang" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TENTANG KARAWANG & HOVER-PAUSE MARQUEE */}
      <section className="py-16 md:py-24 bg-krem relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left"
            >
              <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm">Tentang Karawang</h2>
              <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cokelat font-bold leading-tight">
                Harmoni Tradisi & <br className="hidden sm:inline" />Kemajuan Zaman
              </h3>
              <div className="w-20 h-1 bg-emas rounded-full mx-auto lg:mx-0"></div>
              <p className="text-cokelat/80 text-base md:text-lg leading-relaxed pt-2">
                Terletak di pesisir utara Jawa Barat, Karawang bukan sekadar kota industri yang sibuk. Di balik pabrik-pabrik megah, tersimpan akar budaya Sunda yang sangat kuat dan sejarah panjang yang membentuk identitas bangsa.
              </p>
              <p className="text-cokelat/80 text-base md:text-lg leading-relaxed">
                Dari kompleks percandian tertua di Batujaya, tempat lahirnya proklamasi di Rengasdengklok, hingga tarian Jaipong yang mendunia—Karawang adalah melting pot sejarah dan budaya Nusantara.
              </p>
              <Link to="/sejarah" className="inline-flex items-center gap-2 text-emas font-bold hover:text-cokelat transition-colors pt-2 group">
                Baca Sejarah Lengkap <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative w-full"
            >
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Candi_Blandongan.JPG" alt="Candi Batujaya Karawang" className="rounded-2xl w-full h-48 sm:h-64 object-cover shadow-[0_10px_30px_rgba(45,27,14,0.15)] transform lg:translate-y-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Jaipong.jpg" alt="Kesenian Tradisional Sunda" className="rounded-2xl w-full h-48 sm:h-64 object-cover shadow-[0_10px_30px_rgba(45,27,14,0.15)]" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-emas/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>

        {/* Hover-Pause Carousel (Infinite Marquee) */}
        <div 
          className="w-full mt-16 md:mt-24 overflow-hidden py-4 relative"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-krem to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-krem to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 35, 
              repeat: Infinity,
            }}
            style={{ 
              animationPlayState: isCarouselHovered ? 'paused' : 'running' 
            }}
          >
            {[...carouselImages, ...carouselImages].map((src, i) => (
              <div key={i} className="pr-6 flex-shrink-0">
                <div className="w-[280px] md:w-[400px] h-[200px] md:h-[280px] rounded-3xl overflow-hidden shadow-lg group relative border border-emas/10">
                  <img 
                    src={src} 
                    alt={`Galeri Karawang ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cokelat/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. BENTO BOX GRID EKSPLORASI (NEW) */}
      <section id="explore" className="py-16 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Eksplorasi</h2>
            <motion.h3 variants={itemVariants} className="font-playfair text-3xl md:text-5xl text-cokelat font-bold mb-4 md:mb-6">Jelajahi Kekayaan Karawang</motion.h3>
            <motion.div variants={itemVariants} className="w-24 h-1 bg-emas mx-auto rounded-full"></motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]"
          >
            {features.map((item, index) => (
              <Link to={item.path} key={index} className={`relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${item.colSpan} ${item.rowSpan}`}>
                {/* Background Image with Glass Overlay */}
                <div className="absolute inset-0 z-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-b from-cokelat/40 via-cokelat/60 to-cokelat/90 group-hover:from-cokelat/20 group-hover:via-cokelat/40 transition-colors duration-500"></div>
                </div>
                
                {/* Content */}
                <motion.div
                  variants={itemVariants}
                  className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end"
                >
                  <div className="mb-auto">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:bg-emas group-hover:border-emas transition-all shadow-lg transform group-hover:-translate-y-2">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-emas transition-colors">{item.title}</h4>
                    <p className="text-krem/90 text-sm md:text-base leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. HIGHLIGHT WISATA */}
      <section className="py-16 md:py-24 bg-cokelat text-krem overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 text-center md:text-left gap-6 md:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-emas font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Destinasi Pilihan</h2>
              <h3 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Pesona Alam & Sejarah</h3>
              <p className="text-krem/70 text-base md:text-lg">Temukan keindahan tersembunyi yang menawarkan pengalaman liburan dan wisata edukasi yang tak terlupakan.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-auto"
            >
              <Link to="/wisata" className="inline-flex items-center justify-center gap-2 bg-emas text-cokelat px-6 py-3.5 rounded-full font-bold w-full md:w-auto hover:bg-white transition-colors">
                Lihat Semua Wisata <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {highlightWisata.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer last:sm:col-span-2 last:md:col-span-1"
              >
                <div className="relative h-64 sm:h-72 md:h-80 rounded-3xl overflow-hidden mb-4 md:mb-6 border border-white/10">
                  <img src={highlightWisataImages[index]} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cokelat via-cokelat/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-emas text-cokelat text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                      {item.kategori}
                    </span>
                    <h4 className="font-playfair text-xl md:text-2xl font-bold text-white">{item.nama}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AGENDA TRADISI */}
      <section className="py-16 md:py-24 bg-krem relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Agenda</h2>
            <h3 className="font-playfair text-3xl md:text-5xl text-cokelat font-bold mb-4 md:mb-6">Kalender Upacara Adat</h3>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataTradisi.upacara.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-krem relative group hover:-translate-y-2 transition-transform hover:shadow-xl"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-hijau/10 rounded-2xl flex items-center justify-center text-hijau mb-4 md:mb-6 group-hover:bg-emas group-hover:text-white transition-colors">
                  <Calendar size={24} />
                </div>
                <span className="text-emas text-xs md:text-sm font-bold tracking-wider uppercase mb-2 block">{item.waktu}</span>
                <h4 className="font-playfair text-xl md:text-2xl font-bold text-cokelat mb-3 md:mb-4">{item.nama}</h4>
                <p className="text-cokelat/70 text-xs md:text-sm leading-relaxed">{item.deskripsi}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 PETA INTERAKTIF (DASHBOARD STYLE) */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Peta Interaktif</h2>
            <h3 className="font-playfair text-3xl md:text-5xl text-cokelat font-bold mb-4 md:mb-6">Jelajah Wisata & Kuliner</h3>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
            <p className="text-base md:text-lg text-cokelat/80 max-w-2xl mx-auto">
              Temukan lokasi destinasi wisata sejarah, alam, dan pusat kuliner khas Karawang. Gunakan kotak pencarian untuk menemukan lokasi spesifik.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 bg-krem p-4 md:p-6 rounded-[2rem] shadow-2xl border border-emas/20">
            {/* Left Sidebar - Locations with Search */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/3 flex flex-col gap-4 w-full"
            >
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-emas/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cokelat/40" size={20} />
                  <input 
                    type="text" 
                    placeholder="Cari lokasi wisata atau kuliner..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-krem/50 rounded-xl border border-transparent focus:border-emas/50 focus:bg-white focus:outline-none transition-all text-sm md:text-base font-jakarta"
                  />
                </div>
              </div>

              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 lg:h-[450px] snap-x scroll-smooth custom-scrollbar pr-2">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => setActiveMapQuery(loc.query)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border shrink-0 w-[260px] lg:w-auto snap-start ${activeMapQuery === loc.query ? 'bg-cokelat text-krem border-cokelat shadow-lg lg:scale-[1.02]' : 'bg-white text-cokelat border-emas/10 hover:border-emas/40 hover:bg-white/80'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${activeMapQuery === loc.query ? 'bg-emas text-cokelat' : 'bg-krem text-hijau'}`}>
                          {loc.type === 'wisata' ? <Navigation size={20} /> : <Utensils size={20} />}
                        </div>
                        <div className="overflow-hidden">
                          <h5 className="font-bold text-sm md:text-base truncate">{loc.nama}</h5>
                          <span className={`text-xs font-semibold ${activeMapQuery === loc.query ? 'text-emas' : 'text-hijau'}`}>{loc.kategori}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-cokelat/60 bg-white rounded-2xl border border-dashed border-emas/30">
                    <MapPin className="mx-auto mb-3 opacity-50" size={32} />
                    <p>Lokasi tidak ditemukan.</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Side - Map and Direction Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/3 flex flex-col gap-4"
            >
              <div className="h-[350px] sm:h-[400px] lg:h-[450px] w-full rounded-2xl overflow-hidden shadow-inner border-2 border-white relative bg-white">
                <div className="absolute inset-0 bg-krem flex items-center justify-center -z-10">
                  <div className="w-10 h-10 border-4 border-emas border-t-transparent rounded-full animate-spin"></div>
                </div>
                <iframe
                  title="Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeMapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="relative z-10"
                ></iframe>
              </div>
              <div className="flex justify-end">
                <a 
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(activeMapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emas text-cokelat px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-cokelat hover:text-emas transition-colors shadow-md"
                >
                  <ExternalLink size={18} /> Petunjuk Arah ke {activeMapQuery.split(' ')[0]}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. FAKTA SECTION */}
      <section className="py-16 md:py-24 bg-hijau text-krem relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emas/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emas/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center divide-y sm:divide-y-0 sm:divide-x divide-krem/20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="py-6 sm:py-0 px-6"
            >
              <h4 className="text-5xl md:text-7xl font-playfair font-bold text-emas mb-3 drop-shadow-md">1811</h4>
              <h5 className="text-lg md:text-xl font-bold mb-2">Tahun Berdiri</h5>
              <p className="text-krem/80 text-sm md:text-base">Berdirinya Kabupaten Karawang secara administratif di era kolonial.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="py-6 sm:py-0 px-6"
            >
              <h4 className="text-5xl md:text-7xl font-playfair font-bold text-emas mb-3 drop-shadow-md">No.1</h4>
              <h5 className="text-lg md:text-xl font-bold mb-2">Lumbung Padi</h5>
              <p className="text-krem/80 text-sm md:text-base">Daerah penghasil beras terbesar yang menyokong ketahanan pangan nasional.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="py-6 sm:py-0 px-6"
            >
              <h4 className="text-5xl md:text-7xl font-playfair font-bold text-emas mb-3 drop-shadow-md">4-7</h4>
              <h5 className="text-lg md:text-xl font-bold mb-2">Abad Peradaban</h5>
              <p className="text-krem/80 text-sm md:text-base">Kompleks Candi Batujaya bukti peninggalan peradaban tertua di Jawa Barat.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6.5 DATA STATISTIK BUDAYA & PARIWISATA (TABBED VIEW) */}
      <section className="py-16 md:py-24 bg-krem relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Statistik Daerah</h2>
            <h3 className="font-playfair text-3xl md:text-5xl text-cokelat font-bold mb-4 md:mb-6">Data Pariwisata & Budaya</h3>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Tab Controls */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-emas/10">
              <button 
                onClick={() => setActiveTab('kunjungan')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'kunjungan' ? 'bg-cokelat text-emas shadow-md' : 'text-cokelat/70 hover:bg-krem hover:text-cokelat'}`}
              >
                Kunjungan Wisata
              </button>
              <button 
                onClick={() => setActiveTab('seni')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'seni' ? 'bg-cokelat text-emas shadow-md' : 'text-cokelat/70 hover:bg-krem hover:text-cokelat'}`}
              >
                Sanggar Seni
              </button>
              <button 
                onClick={() => setActiveTab('umkm')}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'umkm' ? 'bg-cokelat text-emas shadow-md' : 'text-cokelat/70 hover:bg-krem hover:text-cokelat'}`}
              >
                Ekonomi Kreatif
              </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-emas/10 min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === 'kunjungan' && (
                  <motion.div 
                    key="kunjungan"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col"
                  >
                    <h4 className="font-playfair text-xl md:text-2xl font-bold text-cokelat mb-6 text-center">Tren Kunjungan Wisatawan (2019 - 2024)</h4>
                    <div className="h-[300px] w-full mt-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dataKunjungan} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                          <XAxis dataKey="tahun" tick={{fill: '#8b5e34', fontSize: 12}} axisLine={false} tickLine={false} />
                          <YAxis tick={{fill: '#8b5e34', fontSize: 12}} axisLine={false} tickLine={false} />
                          <RechartsTooltip cursor={{fill: '#fcfaf5'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'}} />
                          <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                          <Bar dataKey="domestik" name="Domestik" fill="#2e4c32" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="mancanegara" name="Mancanegara" fill="#c9a227" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'seni' && (
                  <motion.div 
                    key="seni"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="w-full md:w-1/2 h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={dataSeni} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                            {dataSeni.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="transparent" />
                            ))}
                          </Pie>
                          <RechartsTooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'}} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h4 className="font-playfair text-2xl font-bold text-cokelat mb-6">Distribusi Sanggar Seni</h4>
                      <ul className="space-y-4">
                        {dataSeni.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-center md:justify-start gap-4 text-base text-cokelat">
                            <span className="w-4 h-4 rounded-full shrink-0 shadow-sm" style={{backgroundColor: PIE_COLORS[idx]}}></span>
                            <span className="flex-grow text-left font-medium">{item.name}</span>
                            <span className="font-bold text-lg">{item.value}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'umkm' && (
                  <motion.div 
                    key="umkm"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col"
                  >
                    <h4 className="font-playfair text-xl md:text-2xl font-bold text-cokelat mb-6 text-center">Pertumbuhan Ekonomi Kreatif & UMKM (2024)</h4>
                    <div className="h-[300px] w-full mt-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dataEkonomi} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorUmkm" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8b5e34" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#8b5e34" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="bulan" tick={{fill: '#8b5e34', fontSize: 12}} axisLine={false} tickLine={false} />
                          <YAxis tick={{fill: '#8b5e34', fontSize: 12}} axisLine={false} tickLine={false} />
                          <RechartsTooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'}} />
                          <Area type="monotone" dataKey="umkm" name="Jumlah UMKM" stroke="#8b5e34" strokeWidth={4} fillOpacity={1} fill="url(#colorUmkm)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUOTE & CTA SECTION */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-7xl md:text-9xl font-playfair text-emas/20 absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 select-none">"</span>
            <blockquote className="font-playfair text-xl sm:text-3xl md:text-5xl text-cokelat font-style-italic leading-tight mb-8 md:mb-10 relative z-10 px-4 md:px-0">
              Bangsa yang besar adalah bangsa yang menghargai jasa pahlawannya, dan daerah yang maju adalah daerah yang tak melupakan akar budayanya.
            </blockquote>
            <div className="flex justify-center items-center gap-4 mb-8 md:mb-12">
              <div className="w-12 md:w-16 h-1 bg-emas rounded-full"></div>
              <p className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm">Mari Lestarikan Bersama</p>
              <div className="w-12 md:w-16 h-1 bg-emas rounded-full"></div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block w-full sm:w-auto">
              <Link to="/sejarah" className="bg-cokelat text-krem px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg inline-flex items-center justify-center gap-3 w-full sm:w-auto hover:bg-emas hover:text-white transition-all shadow-xl">
                Mulai Perjalanan Anda <ArrowRight size={24} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
