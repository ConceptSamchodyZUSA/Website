import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Facebook, ChevronDown, Star, Shield, Truck, DollarSign, Calendar, Gauge, Fuel, Zap } from 'lucide-react';
import { carService, inquiryService } from './services';
import { emailService } from './emailService';

const ConceptUSACars = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    budget: '',
    year: '',
    message: ''
  });

  // Fetch cars from Supabase on mount
  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await carService.getCars();
    if (error) {
      console.error('Error loading cars:', error);
      alert('Error loading cars. Check Supabase configuration.');
    } else {
      setCars(data || []);
    }
    setLoading(false);
  };

  const filteredCars = activeFilter === 'all'
    ? cars
    : cars.filter(car => car.status === activeFilter);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    try {
      // Save inquiry to Supabase
      const { data, error } = await inquiryService.createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        brand: formData.brand || null,
        model: formData.model || null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        year_range: formData.year || null,
        message: formData.message || null
      });

      if (error) {
        console.error('Error submitting inquiry:', error);
        alert('Error submitting form. Please try again or contact us by phone.');
        return;
      }

      // Send email notification (optional)
      if (emailService.isConfigured()) {
        const emailResult = await emailService.sendInquiryEmail(formData);
        if (!emailResult.success) {
          console.warn('Email not sent, but inquiry saved to database');
        }
      }

      console.log('Inquiry submitted:', data);
      alert('Thank you for your inquiry! We will contact you soon.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        brand: '',
        model: '',
        budget: '',
        year: '',
        message: ''
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold">
                <span className="text-red-600">CONCEPT</span>
                <span className="text-blue-500 text-sm ml-2">Samochody z USA</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-red-500 transition">Start</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-red-500 transition">O nas</button>
              <button onClick={() => scrollToSection('process')} className="hover:text-red-500 transition">Jak to działa</button>
              <button onClick={() => scrollToSection('portfolio')} className="hover:text-red-500 transition">Portfolio</button>
              <button onClick={() => scrollToSection('order')} className="hover:text-red-500 transition">Zamów auto</button>
              <button onClick={() => scrollToSection('contact')} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full transition transform hover:scale-105">
                Kontakt
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/98 backdrop-blur-sm">
            <div className="px-4 pt-2 pb-6 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:text-red-500">Start</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 hover:text-red-500">O nas</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left py-2 hover:text-red-500">Jak to działa</button>
              <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left py-2 hover:text-red-500">Portfolio</button>
              <button onClick={() => scrollToSection('order')} className="block w-full text-left py-2 hover:text-red-500">Zamów auto</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 bg-red-600 px-4 rounded-lg mt-4">Kontakt</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-red-900/50"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-500">
              <span className="block">CONCEPT</span>
              <span className="block text-4xl md:text-5xl mt-2">Samochody z USA</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Sprowadzamy amerykańskie marzenia prosto do Twojego garażu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('portfolio')}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Zobacz portfolio
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition"
            >
              Zamów auto
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-gray-400">
            <ChevronDown className="animate-bounce" />
            <span>Przewiń w dół</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Dlaczego <span className="text-red-600">CONCEPT</span>?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={40} />, title: 'Bezpieczeństwo', desc: 'Sprawdzona historia pojazdu i pełna dokumentacja' },
              { icon: <DollarSign size={40} />, title: 'Najlepsze ceny', desc: 'Import bezpośrednio z USA bez pośredników' },
              { icon: <Truck size={40} />, title: 'Pełna obsługa', desc: 'Od zakupu po rejestrację - wszystko załatwiamy' },
              { icon: <Star size={40} />, title: 'Doświadczenie', desc: 'Setki zadowolonych klientów i sprowadzonych aut' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-700 transition transform hover:scale-105 cursor-pointer"
              >
                <div className="text-red-600 flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Jak to <span className="text-blue-500">działa</span>?
          </h2>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: '01', title: 'Kontakt', desc: 'Powiedz nam czego szukasz' },
              { num: '02', title: 'Wyszukiwanie', desc: 'Znajdujemy idealne auto' },
              { num: '03', title: 'Weryfikacja', desc: 'Sprawdzamy historię i stan' },
              { num: '04', title: 'Transport', desc: 'Sprowadzamy do Polski' },
              { num: '05', title: 'Odbiór', desc: 'Odbierasz swoje auto' }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-red-600 to-blue-600 p-6 rounded-xl text-center hover:shadow-xl hover:shadow-red-500/20 transition">
                  <div className="text-5xl font-bold mb-4 opacity-50">{step.num}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-300">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronDown className="rotate-[-90deg] text-red-500" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Nasze <span className="text-red-600">Portfolio</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Sprowadzone samochody, które czekają na nowych właścicieli
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full transition ${
                activeFilter === 'all'
                  ? 'bg-red-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Wszystkie
            </button>
            <button
              onClick={() => setActiveFilter('available')}
              className={`px-6 py-2 rounded-full transition ${
                activeFilter === 'available'
                  ? 'bg-red-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Dostępne
            </button>
            <button
              onClick={() => setActiveFilter('sold')}
              className={`px-6 py-2 rounded-full transition ${
                activeFilter === 'sold'
                  ? 'bg-red-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Sprzedane
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-400">Ładowanie samochodów...</p>
            </div>
          )}

          {/* No cars message */}
          {!loading && filteredCars.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Brak samochodów w tej kategorii</p>
            </div>
          )}

          {/* Cars Grid */}
          {!loading && filteredCars.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/20 transition transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedCar(car)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.image_url || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      car.status === 'available'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}>
                      {car.status === 'available' ? 'Dostępny' : 'Sprzedany'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{car.brand} {car.model}</h3>
                    <div className="flex items-center gap-4 text-gray-400 mb-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {car.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gauge size={16} />
                        {car.mileage?.toLocaleString()} mil
                      </span>
                    </div>
                    {(car.engine_capacity || car.horsepower) && (
                      <div className="flex items-center gap-4 text-gray-400 mb-4 flex-wrap">
                        {car.engine_capacity && (
                          <span className="flex items-center gap-1">
                            <Fuel size={16} />
                            {car.engine_capacity}L
                          </span>
                        )}
                        {car.horsepower && (
                          <span className="flex items-center gap-1">
                            <Zap size={16} />
                            {car.horsepower} KM
                          </span>
                        )}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-red-600">
                      {car.price?.toLocaleString()} PLN
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Zamów <span className="text-blue-500">swoje auto</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Powiedz nam czego szukasz, a my znajdziemy idealne auto dla Ciebie
          </p>

          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Imię i nazwisko</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="jan@example.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="691 795 116"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Marka</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="np. Ford, Chevrolet"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Model (opcjonalnie)</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="np. Mustang"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Budżet (PLN)</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="150000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Rok produkcji</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="2020-2024"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Dodatkowe informacje</label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Opisz swoje preferencje, wymagania dotyczące pojazdu..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Wyślij zapytanie
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-red-600">Kontakt</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a
              href="tel:691795116"
              className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-700 transition transform hover:scale-105"
            >
              <Phone size={40} className="mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-bold mb-2">Telefon</h3>
              <p className="text-gray-400">691 795 116</p>
            </a>

            <a
              href="mailto:kuba.pospieszny@gmail.com"
              className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-700 transition transform hover:scale-105"
            >
              <Mail size={40} className="mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-400">kuba.pospieszny@gmail.com</p>
            </a>

            <a
              href="https://facebook.com/Loveusacar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-700 transition transform hover:scale-105"
            >
              <Facebook size={40} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Facebook</h3>
              <p className="text-gray-400">Loveusacar</p>
            </a>
          </div>

          {/* Google Maps */}
          <div className="bg-gray-900 p-4 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-center">Nasza lokalizacja</h3>
            <p className="text-center text-gray-400 mb-4">Długa 24, 84-230 Dębogórze-Wybudowanie</p>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.234567!2d18.1234567!3d54.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd09e3c3e0b0b9%3A0x1234567890abcdef!2zRMWCdWdhIDI0LCA4NC0yMzAgRMSZYm9nw7NyemUtV3lidWRvd2FuaWU!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - CONCEPT Samochody z USA"
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <a
                href="https://maps.app.goo.gl/Cjt7ecape4DMaosh8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full transition"
              >
                Otwórz w Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2024 CONCEPT - Samochody z USA. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>

      {/* Car Detail Modal */}
      {selectedCar && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCar(null)}
        >
          <div
            className="bg-gray-800 rounded-xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <img
              src={selectedCar.image_url || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'}
              alt={`${selectedCar.brand} ${selectedCar.model}`}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <h3 className="text-3xl font-bold mb-4">{selectedCar.brand} {selectedCar.model}</h3>

            {selectedCar.description && (
              <p className="text-gray-300 mb-6">{selectedCar.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400">Rok produkcji</p>
                <p className="text-xl font-bold">{selectedCar.year}</p>
              </div>
              <div>
                <p className="text-gray-400">Przebieg</p>
                <p className="text-xl font-bold">{selectedCar.mileage?.toLocaleString()} mil</p>
              </div>
              {selectedCar.engine_capacity && (
                <div>
                  <p className="text-gray-400">Pojemność silnika</p>
                  <p className="text-xl font-bold">{selectedCar.engine_capacity}L</p>
                </div>
              )}
              {selectedCar.horsepower && (
                <div>
                  <p className="text-gray-400">Moc</p>
                  <p className="text-xl font-bold">{selectedCar.horsepower} KM</p>
                </div>
              )}
              {selectedCar.transmission && (
                <div>
                  <p className="text-gray-400">Skrzynia biegów</p>
                  <p className="text-xl font-bold capitalize">{selectedCar.transmission}</p>
                </div>
              )}
              {selectedCar.fuel_type && (
                <div>
                  <p className="text-gray-400">Paliwo</p>
                  <p className="text-xl font-bold capitalize">{selectedCar.fuel_type}</p>
                </div>
              )}
              {selectedCar.color && (
                <div>
                  <p className="text-gray-400">Kolor</p>
                  <p className="text-xl font-bold capitalize">{selectedCar.color}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400">Status</p>
                <p className="text-xl font-bold">{selectedCar.status === 'available' ? 'Dostępny' : 'Sprzedany'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Cena</p>
                <p className="text-3xl font-bold text-red-600">{selectedCar.price?.toLocaleString()} PLN</p>
              </div>
            </div>

            {selectedCar.status === 'available' && (
              <button
                onClick={() => {
                  setSelectedCar(null);
                  scrollToSection('order');
                }}
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
              >
                Zapytaj o ten samochód
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer with author info */}
      <footer className="bg-gray-900 text-center py-6 mt-12 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          Built by{' '}
          <a
            href="https://github.com/Kobeep"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 font-semibold transition"
          >
            Kobeep
          </a>
          {' '}(Jakub Pospieszny)
        </p>
      </footer>
    </div>
  );
};

export default ConceptUSACars;
