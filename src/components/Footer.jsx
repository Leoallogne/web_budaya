import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-cokelat text-krem pt-16 pb-8 border-t-4 border-emas">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Kolom 1: Deskripsi */}
          <div>
            <h3 className="font-playfair text-emas text-2xl font-bold mb-4">Budaya Karawang</h3>
            <p className="text-krem/80 leading-relaxed font-jakarta">
              Platform informasi digital untuk melestarikan dan memperkenalkan kekayaan warisan budaya, sejarah, kesenian, serta keindahan alam Karawang kepada dunia.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 className="font-playfair text-xl font-semibold mb-4 text-white">Eksplorasi</h4>
            <ul className="space-y-3">
              <li><Link to="/sejarah" className="text-krem/80 hover:text-emas transition-colors">Sejarah Karawang</Link></li>
              <li><Link to="/kesenian" className="text-krem/80 hover:text-emas transition-colors">Seni & Pertunjukan</Link></li>
              <li><Link to="/kuliner" className="text-krem/80 hover:text-emas transition-colors">Kuliner Khas</Link></li>
              <li><Link to="/bahasa" className="text-krem/80 hover:text-emas transition-colors">Bahasa & Tradisi</Link></li>
              <li><Link to="/wisata" className="text-krem/80 hover:text-emas transition-colors">Destinasi Wisata</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak / Info */}
          <div>
            <h4 className="font-playfair text-xl font-semibold mb-4 text-white">Hubungi Kami</h4>
            <ul className="space-y-3 text-krem/80">
              <li>Pemerintah Kabupaten Karawang</li>
              <li>Dinas Pariwisata dan Kebudayaan</li>
              <li>Jl. Alun-Alun Selatan No. 1, Karawang Barat</li>
              <li className="pt-4">
                <a href="#" className="inline-block px-4 py-2 bg-emas text-cokelat font-bold rounded-lg hover:bg-white transition-colors">
                  Dukung Pelestarian Budaya
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-krem/20 pt-8 text-center">
          <p className="text-krem/60 text-sm">
            &copy; {new Date().getFullYear()} Budaya Karawang. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
