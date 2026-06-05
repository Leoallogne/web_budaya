import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, CalendarDays, MessageSquareText, Wind, BookHeart, Users, Quote, Brain, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import dataTradisi from '../data/tradisi.json';

// --- Static Data Moved Outside ---
const tingkatanBahasa = [
  { tingkat: "Lemes (Halus)", icon: <Users />, desc: "Digunakan ketika berbicara dengan orang yang lebih tua, tokoh masyarakat, atau orang yang baru dikenal sebagai bentuk penghormatan." },
  { tingkat: "Loma (Akrab)", icon: <MessageSquareText />, desc: "Digunakan saat berkomunikasi dengan teman sebaya atau orang yang sudah sangat akrab dalam kehidupan sehari-hari." },
  { tingkat: "Kasar", icon: <Wind />, desc: "Umumnya dihindari, seringkali digunakan saat sedang marah atau untuk konteks bercanda dengan teman sangat dekat (tidak dianjurkan)." }
];

const pepatahSunda = [
  { pepatah: "Silih Asih, Silih Asah, Silih Asuh", makna: "Saling menyayangi, saling mengajari, dan saling menjaga satu sama lain. Inti filosofi kehidupan masyarakat Sunda." },
  { pepatah: "Caina Herang Laukna Beunang", makna: "Menyelesaikan masalah dengan damai tanpa membuat keruh suasana atau menyakiti pihak manapun." },
  { pepatah: "Bengkung Ngariung Bongkok Ngaronyok", makna: "Solidaritas tinggi; selalu bersama-sama dalam menghadapi suka maupun duka." },
  { pepatah: "Kudu Hadé Gogog Hadé Tagog", makna: "Harus baik tutur katanya dan baik pula tingkah lakunya." },
  { pepatah: "Sacangreud Pageuh Sagolek Pangkek", makna: "Menepati janji dan konsisten dengan apa yang sudah diucapkan." }
];

// --- Proverb Generator Card ---
const WisdomCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const generateRandom = () => {
    setIsFlipped(true);
    setTimeout(() => {
      const newIndex = Math.floor(Math.random() * pepatahSunda.length);
      setCurrentIndex(newIndex);
      setIsFlipped(false);
    }, 400); // Wait for half flip
  };

  const item = pepatahSunda[currentIndex];

  return (
    <div className="relative w-full max-w-md mx-auto h-[350px] [perspective:1000px] cursor-pointer" onClick={generateRandom}>
      <motion.div
        animate={{ rotateY: isFlipped ? 90 : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full bg-krem p-8 md:p-10 rounded-[32px] shadow-xl border border-emas/20 flex flex-col justify-between relative group hover:shadow-2xl hover:-translate-y-2"
      >
        <Quote className="absolute top-6 left-6 text-emas/10 rotate-180" size={80} />
        <div className="absolute top-4 right-4 bg-emas/10 text-emas p-2 rounded-full group-hover:rotate-180 transition-transform duration-700">
          <RefreshCw size={20} />
        </div>
        <div className="relative z-10 flex-grow flex flex-col justify-center text-center">
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-hijau mb-6 italic leading-relaxed">
            "{item.pepatah}"
          </h3>
          <div className="w-12 h-1 bg-emas mx-auto mb-6 rounded-full"></div>
          <p className="text-cokelat/80 text-sm leading-relaxed">
            {item.makna}
          </p>
        </div>
        <div className="text-center relative z-10 mt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emas">Sentuh untuk Acak</span>
        </div>
      </motion.div>
    </div>
  );
};

// --- Vocabulary Quiz Component ---
const VocabularyQuiz = () => {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const vocabulary = dataTradisi.kosakata;

  const generateQuestion = () => {
    const correctIdx = Math.floor(Math.random() * vocabulary.length);
    const correctItem = vocabulary[correctIdx];
    
    // Generate 3 wrong options
    let wrongOptions = [];
    while(wrongOptions.length < 3) {
      const wrongIdx = Math.floor(Math.random() * vocabulary.length);
      if(wrongIdx !== correctIdx && !wrongOptions.includes(vocabulary[wrongIdx])) {
        wrongOptions.push(vocabulary[wrongIdx]);
      }
    }
    
    const allOptions = [correctItem, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setQuestion(correctItem);
    setOptions(allOptions);
    setShowResult(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (selectedItem) => {
    if (showResult) return; // Prevent multiple clicks
    
    const correct = selectedItem.id === question.id;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(s => s + 10);
    } else {
      setScore(0); // Reset score on mistake
    }

    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  if (!question) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-hijau/20 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-hijau font-bold">
          <Brain size={20} /> Kuis Kosakata
        </div>
        <div className="bg-emas/10 text-emas px-4 py-1.5 rounded-full text-xs font-bold tracking-widest">
          SKOR: {score}
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-xs text-cokelat/60 uppercase tracking-widest mb-2 font-bold">Apa arti dari kata ini?</p>
        <h3 className="font-playfair text-4xl font-bold text-cokelat">{question.kata}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={showResult}
            className={`p-4 rounded-xl text-sm font-semibold transition-all border text-left flex justify-between items-center
              ${showResult 
                ? opt.id === question.id 
                  ? 'bg-green-100 border-green-500 text-green-800 shadow-md' // Benar
                  : 'bg-gray-50 border-gray-200 text-gray-400' // Salah lainnya
                : 'bg-krem/30 border-emas/20 text-cokelat hover:bg-emas/10 hover:border-emas/50'
              }
            `}
          >
            <span>{opt.arti}</span>
            {showResult && opt.id === question.id && <CheckCircle size={18} className="text-green-600" />}
            {showResult && !isCorrect && opt.id !== question.id && <XCircle size={18} className="text-red-400 opacity-0" />}
          </button>
        ))}
      </div>

      {showResult && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
          className={`text-center mt-6 font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}
        >
          {isCorrect ? 'Leres Pisan! (Benar Sekali!)' : 'Aduh, Lepat! (Wah, Salah!)'}
        </motion.div>
      )}
    </div>
  );
};

const Bahasa = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { scrollY } = useScroll();
  const yHeroBg = useTransform(scrollY, [0, 800], [0, 300]);

  const filteredKamus = dataTradisi.kosakata.filter(item => 
    item.kata.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.arti.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-krem min-h-screen">
      
      {/* 1. HERO SECTION (PARALLAX) */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-hijau">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ y: yHeroBg }}
            className="absolute inset-[-10%] bg-[url('https://upload.wikimedia.org/wikipedia/id/1/15/Mengolah-sawah.jpg')] bg-cover bg-center opacity-40"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-hijau/90 via-hijau/60 to-krem"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6 md:mt-0">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full text-emas border border-white/20 shadow-xl">
                <MessageSquareText size={48} />
              </div>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-4 drop-shadow-xl">
              Bahasa & <span className="text-emas">Tradisi</span>
            </h1>
            <p className="text-base md:text-2xl text-white/90 font-jakarta max-w-2xl mx-auto leading-relaxed shadow-sm">
              Kearifan lokal yang hidup dan mengakar dalam tutur kata, laku lampah, serta upacara adat masyarakat agraris Karawang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TINGKATAN BAHASA (ENHANCED) */}
      <section className="py-16 md:py-24 bg-krem relative z-10 -mt-10 md:-mt-16 mx-4 lg:mx-auto max-w-6xl rounded-[40px] shadow-2xl border border-emas/10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12 pt-8"
        >
          <h2 className="text-hijau font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Undak Usuk Basa</h2>
          <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-cokelat mb-6">Tingkatan Bahasa Sunda</h3>
          <div className="w-24 h-1 bg-emas mx-auto rounded-full mb-6"></div>
          <p className="text-cokelat/70 max-w-2xl mx-auto text-sm md:text-base px-4">
            Bahasa Sunda memiliki aturan kesopanan yang mencerminkan karakter masyarakat yang sangat menghargai etika pergaulan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 px-6 md:px-12 pb-12">
          {tingkatanBahasa.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-krem/30 p-6 sm:p-8 rounded-3xl shadow-sm border border-emas/10 text-center hover:border-emas/50 hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-hijau mx-auto mb-6 group-hover:bg-hijau group-hover:text-white transition-colors shadow-sm">
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

      {/* 3. KAMUS & KUIS INTERAKTIF */}
      <section className="py-16 md:py-24 bg-cokelat relative overflow-hidden mt-16 md:mt-24">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emas/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
            
            {/* Kuis Section (Kiri) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
               <VocabularyQuiz />
            </motion.div>

            {/* Kamus Section (Kanan) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 rounded-[32px] shadow-2xl h-[550px] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-hijau/10 p-3 rounded-2xl text-hijau shadow-inner shrink-0">
                  <Search size={24} />
                </div>
                <div>
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold text-cokelat">Kamus Mini</h2>
                  <p className="text-cokelat/60 text-xs md:text-sm">Pencarian Dialek Sunda Sehari-hari</p>
                </div>
              </div>

              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Cari kata atau arti..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-krem/50 border-2 border-krem rounded-2xl py-3.5 pl-12 pr-4 text-cokelat focus:outline-none focus:border-emas focus:bg-white transition-all font-medium text-sm md:text-base shadow-inner"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cokelat/40" size={18} />
              </div>

              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-3">
                  <AnimatePresence>
                    {filteredKamus.length > 0 ? (
                      filteredKamus.map((item, idx) => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={item.id} 
                          className="p-4 rounded-2xl border border-transparent hover:border-emas/30 bg-krem/35 hover:bg-emas/5 transition-colors group"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-playfair font-bold text-lg md:text-xl text-cokelat group-hover:text-hijau transition-colors">{item.kata}</span>
                            <span className="text-hijau bg-white px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-sm border border-hijau/10">
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

          </div>
        </div>
      </section>

      {/* 4. KALENDER AGRARIS (TIMELINE) */}
      <section className="py-20 md:py-32 bg-krem relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 md:mb-20">
            <div className="flex justify-center mb-4">
              <CalendarDays size={32} className="text-emas" />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-cokelat mb-4">Siklus Tradisi Agraris</h2>
            <p className="text-cokelat/70 max-w-2xl mx-auto text-sm md:text-lg">
              Ritual adat masyarakat Karawang yang selaras dengan siklus penanaman padi dan syukur alam.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative">
            {/* Garis Vertikal (Mobile) & Horizontal (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-emas/20 -translate-y-1/2 z-0"></div>
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-emas/20 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {dataTradisi.upacara.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex md:flex-col items-center md:text-center gap-6 md:gap-4 group"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-krem shadow-xl z-10 shrink-0 group-hover:bg-emas transition-colors group-hover:scale-110 duration-300">
                     <span className="font-playfair font-bold text-xl text-hijau group-hover:text-white">0{item.id}</span>
                  </div>
                  
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-emas/10 group-hover:border-emas/50 transition-colors relative md:mt-4 w-full">
                     <div className="hidden md:block absolute -top-3 left-1/2 w-4 h-4 bg-white border-t border-l border-emas/10 transform rotate-45 -translate-x-1/2 group-hover:border-emas/50 transition-colors"></div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-emas block mb-2">{item.waktu}</span>
                     <h4 className="font-playfair text-lg font-bold text-cokelat mb-2">{item.nama}</h4>
                     <p className="text-xs text-cokelat/70 leading-relaxed">{item.deskripsi}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PEPATAH SUNDA (PROVERB GENERATOR) */}
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
            <p className="text-cokelat/60 mt-6 max-w-lg mx-auto text-sm md:text-base">
              Sentuh kartu di bawah ini untuk mendapatkan petuah bijak harian dari leluhur Sunda.
            </p>
          </motion.div>

          <WisdomCard />
          
        </div>
      </section>

    </div>
  );
};

export default Bahasa;
