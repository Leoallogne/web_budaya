import { motion } from 'framer-motion';
import { BookOpen, Landmark, User, Clock, ChevronDown } from 'lucide-react';
import dataSejarah from '../data/sejarah.json';

const Sejarah = () => {
  const tokohSejarah = [
    { nama: "Syekh Hasanuddin (Syekh Quro)", peran: "Penyebar Islam Pertama", deskripsi: "Mendirikan pesantren pertama di Jawa Barat (Pesantren Quro) di Karawang pada awal abad ke-15. Makamnya di Pulobata masih menjadi pusat ziarah." },
    { nama: "R.A.A. Singaperbangsa", peran: "Bupati Pertama Karawang", deskripsi: "Dikenal dengan gelar Adipati Kertabumi III. Dilantik oleh Sultan Agung Mataram pada tahun 1633 untuk meletakkan dasar pemerintahan dan lumbung padi." },
    { nama: "Bung Karno & Bung Hatta", peran: "Proklamator Kemerdekaan", deskripsi: "Pernah disinggahkan oleh para pemuda pejuang (Soekarni, Wikana, dll) ke Rengasdengklok, Karawang, pada 16 Agustus 1945 untuk merumuskan proklamasi." }
  ];

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION SEJARAH */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cokelat">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603525281898-7243c2c4bfbb?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-emas/20 backdrop-blur-md rounded-full text-emas border border-emas/30">
                <Landmark size={40} />
              </div>
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 drop-shadow-xl">
              Jejak <span className="text-emas">Sejarah</span>
            </h1>
            <p className="text-lg md:text-2xl text-krem/90 font-jakarta max-w-2xl mx-auto mb-10 leading-relaxed font-light">
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

      {/* 2. TIMELINE ZIGZAG (ENHANCED) */}
      <section className="py-24 px-4 container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-hijau font-bold tracking-widest uppercase text-sm mb-2">Kronologi Waktu</h2>
          <h3 className="font-playfair text-4xl md:text-5xl font-bold text-cokelat mb-6">Garis Waktu Karawang</h3>
          <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
        </motion.div>

        <div className="relative">
          {/* Garis vertikal timeline */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emas via-emas/40 to-krem transform md:-translate-x-1/2 rounded-full"></div>

          {dataSejarah.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                className={`relative flex items-center justify-between mb-16 md:mb-24 ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-row`}
              >
                {/* Spasi untuk zig-zag di desktop */}
                <div className="hidden md:block md:w-5/12"></div>

                {/* Dot Timeline */}
                <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-emas shadow-[0_0_20px_rgba(201,147,58,0.4)] transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-cokelat rounded-full"></div>
                </div>

                {/* Konten Card */}
                <div className="w-full pl-16 md:pl-0 md:w-5/12">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-white p-8 rounded-3xl shadow-xl border border-emas/10 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emas/5 rounded-bl-[100px] -mr-10 -mt-10 z-0 transition-transform group-hover:scale-150 group-hover:bg-emas/10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-krem text-hijau rounded-lg">
                          <Clock size={20} />
                        </div>
                        <span className="inline-block px-4 py-1 bg-hijau/10 text-hijau font-bold rounded-full text-sm">
                          {item.tahun}
                        </span>
                      </div>
                      <h3 className="font-playfair text-3xl font-bold text-cokelat mb-4">{item.era}</h3>
                      <p className="text-cokelat/80 leading-relaxed text-lg">
                        {item.deskripsi}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. TOKOH BERSEJARAH (NEW) */}
      <section className="py-24 bg-cokelat text-krem relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-emas font-bold tracking-widest uppercase text-sm mb-2">Tokoh & Pahlawan</h2>
            <h3 className="font-playfair text-4xl md:text-5xl text-white font-bold mb-6">Figur Pengukir Sejarah</h3>
            <div className="w-24 h-1 bg-hijau mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tokohSejarah.map((tokoh, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-emas/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 bg-emas/20 rounded-2xl flex items-center justify-center text-emas mb-6 group-hover:scale-110 group-hover:bg-emas group-hover:text-cokelat transition-all">
                  <User size={32} />
                </div>
                <span className="text-emas font-semibold text-sm tracking-widest uppercase block mb-2">{tokoh.peran}</span>
                <h4 className="font-playfair text-2xl font-bold text-white mb-4">{tokoh.nama}</h4>
                <p className="text-krem/70 leading-relaxed">
                  {tokoh.deskripsi}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALERI MASA LALU (NEW) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-hijau font-bold tracking-widest uppercase text-sm mb-2">Dokumenter Visual</h2>
              <h3 className="font-playfair text-4xl md:text-5xl font-bold text-cokelat mb-4">Galeri Masa Lalu</h3>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="mt-6 md:mt-0 text-cokelat/60 max-w-sm text-right"
            >
              <p>Merekam jejak keemasan dan perjuangan melalui lensa sejarah.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop" alt="Candi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-cokelat/90 via-transparent to-transparent"></div>
              <h4 className="absolute bottom-6 left-6 font-playfair text-3xl font-bold text-white">Candi Batujaya</h4>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="md:col-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=800&auto=format&fit=crop" alt="Padi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-cokelat/90 via-transparent to-transparent"></div>
              <h4 className="absolute bottom-6 left-6 font-playfair text-2xl font-bold text-white">Lumbung Padi Nasional</h4>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="md:col-span-1 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=500&auto=format&fit=crop" alt="Sejarah" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-cokelat/30 group-hover:bg-transparent transition-colors"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-1 rounded-3xl overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1596404618206-fb849edcd1fa?q=80&w=500&auto=format&fit=crop" alt="Tradisi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-cokelat/30 group-hover:bg-transparent transition-colors"></div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sejarah;
