import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CalendarDays, MessageSquareText, Wind, BookHeart, Users, Quote } from 'lucide-react';
import dataTradisi from '../data/tradisi.json';

const Bahasa = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKamus = dataTradisi.kosakata.filter(item => 
    item.kata.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.arti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tingkatanBahasa = [
    { tingkat: "Lemes (Halus)", icon: <Users />, desc: "Digunakan ketika berbicara dengan orang yang lebih tua, tokoh masyarakat, atau orang yang baru dikenal sebagai bentuk penghormatan." },
    { tingkat: "Loma (Akrab)", icon: <MessageSquareText />, desc: "Digunakan saat berkomunikasi dengan teman sebaya atau orang yang sudah sangat akrab dalam kehidupan sehari-hari." },
    { tingkat: "Kasar", icon: <Wind />, desc: "Umumnya dihindari, seringkali digunakan saat sedang marah atau untuk konteks bercanda dengan teman sangat dekat (tidak dianjurkan)." }
  ];

  const pepatahSunda = [
    { pepatah: "Silih Asih, Silih Asah, Silih Asuh", makna: "Saling menyayangi, saling mengajari, dan saling menjaga satu sama lain. Inti filosofi kehidupan masyarakat Sunda." },
    { pepatah: "Caina Herang Laukna Beunang", makna: "Menyelesaikan masalah dengan damai tanpa membuat keruh suasana atau menyakiti pihak manapun." },
    { pepatah: "Bengkung Ngariung Bongkok Ngaronyok", makna: "Solidaritas tinggi; selalu bersama-sama dalam menghadapi suka maupun duka." }
  ];

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-hijau py-16 md:py-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-hijau/90 via-hijau/60 to-krem"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-emas border border-white/20 shadow-xl">
                <MessageSquareText size={48} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-4 drop-shadow-xl">
              Bahasa & <span className="text-emas">Tradisi</span>
            </h1>
            <p className="text-base md:text-2xl text-white/90 font-jakarta max-w-2xl mx-auto leading-relaxed">
              Kearifan lokal yang hidup dan mengakar dalam tutur kata, laku lampah, serta upacara adat masyarakat agraris Karawang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TINGKATAN BAHASA (NEW) */}
      <section className="py-16 md:py-24 bg-krem container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Undak Usuk Basa</h2>
          <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-cokelat mb-6">Tingkatan Bahasa Sunda</h3>
          <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
          <p className="text-cokelat/80 max-w-2xl mx-auto text-sm md:text-lg">
            Bahasa Sunda memiliki aturan kesopanan yang disebut *Undak Usuk Basa*, mencerminkan karakter masyarakat yang sangat menghargai etika pergaulan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {tingkatanBahasa.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emas/10 text-center hover:border-emas/50 transition-colors group h-full flex flex-col justify-center"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-krem rounded-full flex items-center justify-center text-emas mx-auto mb-6 group-hover:bg-emas group-hover:text-white transition-colors shadow-sm">
                {item.icon}
              </div>
              <h4 className="font-playfair text-xl md:text-2xl font-bold text-cokelat mb-4">{item.tingkat}</h4>
              <p className="text-cokelat/70 text-xs md:text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. KAMUS & KALENDER (ENHANCED) */}
      <section className="py-16 md:py-24 bg-cokelat relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emas/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Kamus Section (Kiri) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-hijau/10 p-3 rounded-2xl text-hijau shadow-inner shrink-0">
                  <Search size={24} />
                </div>
                <div>
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold text-cokelat">Kamus Mini</h2>
                  <p className="text-cokelat/60 text-xs md:text-sm">Dialek Sunda Sehari-hari</p>
                </div>
              </div>

              <div className="relative mb-6 md:mb-8">
                <input 
                  type="text" 
                  placeholder="Cari kata atau arti..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-krem/50 border-2 border-krem rounded-2xl py-3.5 pl-12 pr-4 text-cokelat focus:outline-none focus:border-emas focus:bg-white transition-all font-medium text-sm md:text-base"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cokelat/40" size={18} />
              </div>

              <div className="h-[350px] md:h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-3">
                  <AnimatePresence>
                    {filteredKamus.length > 0 ? (
                      filteredKamus.map((item, idx) => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.05 }}
                          key={item.id} 
                          className="p-4 rounded-2xl hover:bg-emas/10 transition-colors border border-transparent hover:border-emas/30 bg-krem/35"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-playfair font-bold text-lg md:text-xl text-cokelat">{item.kata}</span>
                            <span className="text-hijau bg-hijau/5 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold border border-hijau/20">
                              {item.arti}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-cokelat/50 py-10 flex flex-col items-center">
                        <Wind size={40} className="mb-4 opacity-20" />
                        <p className="text-sm">Kata tidak ditemukan.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Upacara Section (Kanan) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 mt-8 lg:mt-0"
            >
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div className="bg-emas/20 p-3 rounded-2xl text-emas shrink-0">
                  <CalendarDays size={28} />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-1">Kalender Tradisi</h2>
                  <p className="text-krem/70 text-sm md:text-lg">Jadwal ritual adat masyarakat agraris</p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {dataTradisi.upacara.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.15) }}
                    key={item.id} 
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 rounded-3xl hover:bg-white/10 hover:border-emas/40 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start text-center sm:text-left">
                      <div className="w-20 h-20 md:w-28 md:h-28 py-2 md:py-4 bg-krem rounded-2xl flex flex-col items-center justify-center text-cokelat font-bold shadow-inner group-hover:bg-emas group-hover:text-white transition-colors shrink-0 mx-auto sm:mx-0">
                        <span className="text-[10px] font-normal opacity-70 uppercase tracking-widest mb-1">Event</span>
                        <span className="text-2xl md:text-3xl font-playfair leading-none">0{item.id}</span>
                      </div>
                      <div className="flex-grow pt-1">
                        <div className="inline-flex items-center gap-2 text-emas text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 bg-emas/10 px-3 py-1 rounded-full">
                          <CalendarDays size={14} /> {item.waktu}
                        </div>
                        <h3 className="text-xl md:text-2xl font-playfair font-bold text-white mb-2 group-hover:text-emas transition-colors">{item.nama}</h3>
                        <p className="text-krem/80 leading-relaxed text-xs md:text-sm">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. PEPATAH SUNDA (NEW) */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mb-12 md:mb-16"
          >
            <div className="flex justify-center mb-6">
              <BookHeart size={40} className="text-emas" />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl text-cokelat font-bold mb-4">Pituah Leluhur</h2>
            <div className="w-24 h-1 bg-emas mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {pepatahSunda.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-krem p-6 sm:p-8 md:p-10 rounded-3xl relative group hover:shadow-xl transition-all h-full flex flex-col justify-between"
              >
                <Quote className="absolute top-4 left-4 text-emas/20 rotate-180" size={50} />
                <div className="relative z-10 mt-6 flex-grow flex flex-col justify-center">
                  <h3 className="font-playfair text-lg sm:text-xl md:text-2xl font-bold text-hijau mb-4 md:mb-6 italic group-hover:text-emas transition-colors">
                    "{item.pepatah}"
                  </h3>
                  <div className="w-12 h-0.5 bg-cokelat/20 mx-auto mb-4 md:mb-6"></div>
                  <p className="text-cokelat/80 text-xs md:text-sm leading-relaxed">
                    {item.makna}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Bahasa;
