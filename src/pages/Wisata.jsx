import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Map, Star } from 'lucide-react';
import dataWisata from '../data/wisata.json';

const Wisata = () => {
  const ruteWisata = [
    { nama: "Rute Jejak Sejarah", deskripsi: "Mempelajari sejarah kemerdekaan dan kerajaan di Candi Batujaya dan Monumen Rengasdengklok.", waktu: "1 Hari" },
    { nama: "Eksplorasi Alam Pantai", deskripsi: "Menikmati udara pesisir utara dan sunset indah di Pantai Tanjung Pakis bersama keluarga.", waktu: "Setengah Hari" },
    { nama: "Santai di Pusat Kota", deskripsi: "Bermain di Alun-alun Karawang dilanjutkan menikmati wisata air Situ Cipule yang sejuk.", waktu: "Akhir Pekan" }
  ];

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cokelat">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-cokelat/80 via-cokelat/50 to-krem"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-emas/20 backdrop-blur-md rounded-full text-emas border border-emas/30 shadow-2xl">
                <Compass size={48} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 drop-shadow-2xl">
              Wisata <span className="text-emas">Budaya</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-jakarta max-w-3xl mx-auto leading-relaxed shadow-sm">
              Eksplorasi keindahan alam pesisir, situs purbakala bernilai tinggi, hingga tata kota modern yang ramah keluarga.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. RUTE REKOMENDASI (NEW) */}
      <section className="py-24 bg-krem relative -mt-20 z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-emas/20">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="md:w-1/3"
              >
                <h2 className="text-hijau font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
                  <Map size={18} /> Rute Perjalanan
                </h2>
                <h3 className="font-playfair text-4xl font-bold text-cokelat mb-4">Rekomendasi Itinerary</h3>
                <p className="text-cokelat/70 leading-relaxed mb-6">
                  Maksimalkan waktu liburan Anda dengan mengikuti rute perjalanan yang dirancang khusus untuk pengalaman terbaik di Karawang.
                </p>
                <button className="bg-cokelat text-krem px-6 py-3 rounded-full font-bold hover:bg-emas transition-colors inline-flex items-center gap-2">
                  Unduh Panduan <Navigation size={18} />
                </button>
              </motion.div>

              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {ruteWisata.map((rute, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
                    className="bg-krem p-6 rounded-3xl border border-transparent hover:border-emas/30 hover:shadow-lg transition-all"
                  >
                    <span className="inline-block bg-emas/20 text-cokelat text-xs font-bold px-3 py-1 rounded-full mb-4">
                      {rute.waktu}
                    </span>
                    <h4 className="font-bold text-lg text-hijau mb-2">{rute.nama}</h4>
                    <p className="text-cokelat/70 text-sm leading-relaxed">{rute.deskripsi}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTINASI GRID (ENHANCED) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-emas font-bold tracking-widest uppercase text-sm mb-2">Semua Destinasi</h2>
            <h3 className="font-playfair text-4xl md:text-5xl font-bold text-cokelat mb-6">Daftar Tempat Wisata</h3>
            <div className="w-24 h-1 bg-hijau mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {dataWisata.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={item.id}
                className="bg-krem rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl border border-transparent hover:border-emas/20 flex flex-col group transition-all"
              >
                <div className="h-72 relative overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/800x600/?landmark,indonesia&sig=${item.id + 300}`}
                    alt={item.nama}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cokelat via-cokelat/20 to-transparent opacity-90"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-hijau shadow-sm">
                      {item.kategori}
                    </span>
                    <div className="flex gap-1 text-emas bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold text-white">4.8</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="font-playfair text-3xl font-bold mb-2">{item.nama}</h3>
                    <div className="flex items-center gap-2 text-krem/90 text-sm font-medium">
                      <MapPin size={16} className="text-emas" /> {item.lokasi}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <p className="text-cokelat/80 leading-relaxed mb-8 flex-grow">
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

    </div>
  );
};

export default Wisata;
