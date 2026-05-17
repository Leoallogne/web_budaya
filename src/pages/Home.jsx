import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Music, Utensils, MessageCircle, MapPin, Calendar, PlayCircle, ChevronRight, Navigation } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import dataTradisi from '../data/tradisi.json';
import dataWisata from '../data/wisata.json';
import dataKuliner from '../data/kuliner.json';

const Home = () => {
  const [activeMapQuery, setActiveMapQuery] = useState("Alun-alun Karawang");

  const mapLocations = [
    ...dataWisata.map(w => ({ id: `w-${w.id}`, nama: w.nama, kategori: w.kategori, type: 'wisata', query: `${w.nama} Karawang` })),
    ...dataKuliner.slice(0, 4).map(k => ({ id: `k-${k.id}`, nama: k.nama, kategori: 'Kuliner', type: 'kuliner', query: `${k.nama} Karawang` }))
  ];

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

  const features = [
    { title: 'Sejarah', icon: <BookOpen size={32} />, path: '/sejarah', desc: 'Jejak peradaban dari Tarumanagara hingga era modern.' },
    { title: 'Kesenian', icon: <Music size={32} />, path: '/kesenian', desc: 'Kekayaan seni pertunjukan dan kriya warisan leluhur.' },
    { title: 'Kuliner', icon: <Utensils size={32} />, path: '/kuliner', desc: 'Cita rasa otentik bumbu rempah khas Sunda Karawang.' },
    { title: 'Bahasa', icon: <MessageCircle size={32} />, path: '/bahasa', desc: 'Tradisi lisan dan kearifan lokal masyarakat agraris.' },
    { title: 'Wisata', icon: <MapPin size={32} />, path: '/wisata', desc: 'Destinasi alam dan sejarah yang memukau.' },
  ];

  // Ambil 3 wisata untuk highlight
  const highlightWisata = dataWisata.slice(0, 3);

  const carouselImages = [
    "https://images.unsplash.com/photo-1574046538337-3cb83e8749bc?q=80&w=800&auto=format&fit=crop", // Sawah/Pertanian (Lumbung Padi)
    "https://images.unsplash.com/photo-1604554371195-23c21a4fbda8?q=80&w=800&auto=format&fit=crop", // Kuliner Tradisional
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop", // Candi/Sejarah Batujaya
    "https://images.unsplash.com/photo-1531260796528-ae45fd8297b6?q=80&w=800&auto=format&fit=crop", // Kesenian Wayang/Sunda
    "https://images.unsplash.com/photo-1544260275-c08dcde2e737?q=80&w=800&auto=format&fit=crop", // Pantai/Alam Pakis
    "https://images.unsplash.com/photo-1513529367460-705b768a3eb5?q=80&w=800&auto=format&fit=crop"  // Modern/Pesisir Karawang
  ];

  // Gambar spesifik untuk highlight wisata agar relevan dan tidak error dari source.unsplash
  const highlightWisataImages = [
    "https://images.unsplash.com/photo-1584852926771-4dc791bcf12c?q=80&w=800&auto=format&fit=crop", // Representasi Rengasdengklok (Sejarah/Bendera)
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // Representasi Pantai Pakis
    "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800&auto=format&fit=crop"  // Representasi Candi Batujaya
  ];

  // Data Statistik (Baru ditambahkan)
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

  const PIE_COLORS = ['#8b5e34', '#c9a227', '#2e4c32', '#dcd3b6']; // Cokelat, Emas, Hijau, Krem

  return (
    <div className="bg-krem min-h-screen overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] md:h-screen flex items-center justify-center overflow-hidden py-16 md:py-0">
        <div className="absolute inset-0 bg-cokelat">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504221507732-5246c045949b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 sm:pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emas mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-emas animate-pulse"></span>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase">Pesona Jawa Barat</span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-bold mb-6 drop-shadow-2xl leading-tight">
              Budaya <br className="md:hidden" />
              <span className="text-emas">Karawang</span>
            </h1>
            <p className="text-base md:text-2xl text-krem/90 font-jakarta max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-light">
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
                className="w-full sm:w-auto bg-transparent border-2 border-emas text-emas px-8 py-4 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 hover:bg-emas hover:text-cokelat transition-colors shadow-xl"
              >
                <PlayCircle size={20} /> Tonton Video
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-cokelat flex flex-col items-center pointer-events-none"
        >
          <span className="text-xs font-bold tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-5 h-8 border-2 border-cokelat rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1 bg-cokelat rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* 2. TENTANG KARAWANG (NEW) */}
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
                <img src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=600&auto=format&fit=crop" alt="Candi Batujaya Karawang" className="rounded-2xl w-full h-48 sm:h-64 object-cover shadow-lg transform lg:translate-y-8" />
                <img src="https://images.unsplash.com/photo-1531260796528-ae45fd8297b6?q=80&w=600&auto=format&fit=crop" alt="Kesenian Tradisional Sunda" className="rounded-2xl w-full h-48 sm:h-64 object-cover shadow-lg" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-emas/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Halus (Smooth Infinite Marquee) */}
        <div className="w-full mt-16 md:mt-24 overflow-hidden py-4 relative">
          {/* Efek gradient di ujung kiri & kanan untuk menyamarkan batas */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-krem to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-krem to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...carouselImages, ...carouselImages].map((src, i) => (
              <div key={i} className="pr-6 flex-shrink-0">
                <div className="w-[280px] md:w-[400px] h-[200px] md:h-[280px] rounded-3xl overflow-hidden shadow-lg group relative">
                  <img 
                    src={src} 
                    alt={`Galeri Karawang ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-cokelat/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. NAVIGATION CARDS */}
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {features.map((item, index) => (
              <Link to={item.path} key={index} className="last:col-span-2 sm:last:col-span-1">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-krem rounded-3xl p-5 md:p-8 border border-emas/10 h-full flex flex-col items-center text-center transition-all group shadow-sm hover:shadow-2xl hover:border-emas/30"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-hijau mb-4 md:mb-6 group-hover:bg-emas group-hover:text-white transition-colors shadow-md">
                    {item.icon}
                  </div>
                  <h4 className="font-playfair text-xl md:text-2xl font-bold text-cokelat mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-cokelat/70 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. HIGHLIGHT WISATA (NEW) */}
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
                <div className="relative h-64 sm:h-72 md:h-80 rounded-3xl overflow-hidden mb-4 md:mb-6">
                  <img src={highlightWisataImages[index]} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cokelat via-cokelat/20 to-transparent opacity-80"></div>
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

      {/* 5. AGENDA TRADISI (NEW) */}
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
                className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-krem relative group hover:-translate-y-2 transition-transform"
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

      {/* 5.5 PETA INTERAKTIF (NEW) */}
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
              Temukan lokasi destinasi wisata sejarah, alam, dan pusat kuliner khas Karawang dengan mudah melalui peta di bawah ini.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 bg-krem p-4 md:p-8 rounded-3xl shadow-xl border border-emas/20">
            {/* Left Sidebar - Locations */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/3 flex flex-col gap-4 w-full"
            >
              <h4 className="font-playfair text-xl md:text-2xl font-bold text-cokelat mb-2 flex items-center gap-2">
                <MapPin className="text-emas" /> Titik Lokasi
              </h4>
              {/* Premium mobile horizontal scroll & desktop vertical scroll layout */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 lg:h-[400px] snap-x scroll-smooth custom-scrollbar">
                {mapLocations.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setActiveMapQuery(loc.query)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border shrink-0 w-[260px] lg:w-auto snap-start ${activeMapQuery === loc.query ? 'bg-cokelat text-krem border-cokelat shadow-lg scale-[1.02]' : 'bg-white text-cokelat border-emas/10 hover:border-emas/40 hover:bg-white/80'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${activeMapQuery === loc.query ? 'bg-emas text-cokelat' : 'bg-krem text-hijau'}`}>
                        {loc.type === 'wisata' ? <Navigation size={20} /> : <Utensils size={20} />}
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="font-bold text-sm md:text-base truncate">{loc.nama}</h5>
                        <span className={`text-xs font-semibold ${activeMapQuery === loc.query ? 'text-emas' : 'text-hijau'}`}>{loc.kategori}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Google Map iframe */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/3 h-[300px] sm:h-[400px] lg:h-[480px] w-full rounded-2xl overflow-hidden shadow-inner border-2 border-white relative"
            >
              {/* Skeleton/Loading bg behind iframe */}
              <div className="absolute inset-0 bg-cokelat/5 flex items-center justify-center -z-10">
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
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. FAKTA SECTION (ENHANCED) */}
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

      {/* 6.5 DATA STATISTIK BUDAYA & PARIWISATA (NEW) */}
      <section className="py-16 md:py-24 bg-krem relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Statistik Daerah</h2>
            <h3 className="font-playfair text-3xl md:text-5xl text-cokelat font-bold mb-4 md:mb-6">Perkembangan Pariwisata</h3>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
            <p className="text-base md:text-lg text-cokelat/80 max-w-2xl mx-auto">
              Data interaktif yang menunjukkan pertumbuhan pesat sektor pariwisata, keragaman seni budaya, dan ekonomi kreatif di Kabupaten Karawang.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart - Kunjungan Wisatawan */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-emas/10"
            >
              <h4 className="font-playfair text-xl md:text-2xl font-bold text-cokelat mb-6 text-center">Tren Kunjungan Wisatawan</h4>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataKunjungan} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="tahun" tick={{fill: '#8b5e34', fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#8b5e34', fontSize: 12}} axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{fill: '#fcfaf5'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                    <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                    <Bar dataKey="domestik" name="Domestik" fill="#2e4c32" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mancanegara" name="Mancanegara" fill="#c9a227" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie Chart - Proporsi Seni & Area Chart */}
            <div className="grid grid-rows-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{delay: 0.2}}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-emas/10 flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-full md:w-1/2 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dataSeni} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {dataSeni.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h4 className="font-playfair text-xl font-bold text-cokelat mb-4">Distribusi Sanggar Seni</h4>
                  <ul className="space-y-3">
                    {dataSeni.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-center md:justify-start gap-3 text-sm text-cokelat/80">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{backgroundColor: PIE_COLORS[idx]}}></span>
                        <span className="flex-grow text-left">{item.name}</span>
                        <span className="font-bold">{item.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{delay: 0.4}}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-emas/10"
              >
                <h4 className="font-playfair text-lg font-bold text-cokelat mb-4 text-center">Pertumbuhan Ekraf (UMKM) 2024</h4>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dataEkonomi} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUmkm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5e34" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5e34" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="bulan" tick={{fill: '#8b5e34', fontSize: 10}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fill: '#8b5e34', fontSize: 10}} axisLine={false} tickLine={false} />
                      <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                      <Area type="monotone" dataKey="umkm" stroke="#8b5e34" strokeWidth={3} fillOpacity={1} fill="url(#colorUmkm)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
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
            <span className="text-7xl md:text-9xl font-playfair text-emas/20 absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2">"</span>
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
