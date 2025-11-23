import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu, X, Phone, Mail, Facebook, ChevronDown, Star, Shield, Truck, DollarSign, Calendar, Gauge, Fuel, Zap, ChevronLeft, ChevronRight, Settings, ArrowUp, ArrowDown, Loader2, Cookie } from 'lucide-react';
import { carService, inquiryService } from './services';
import emailjs from '@emailjs/browser';
import CookieConsentBanner from './CookieConsent';

// Use WebP for better performance (30% smaller)
const backgroundImageWebP = '/optimized-images/background-1200w.webp';
const backgroundImageFallback = '/background.jpg';

const ConceptUSACars = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9; // 3x3 grid
  const [submittingForm, setSubmittingForm] = useState(false);
  const [formLoadTime] = useState(Date.now()); // Track when form was loaded

  // Parallax scroll effect
  const [scrollY, setScrollY] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    budget: '',
    year: '',
    message: '',
    website: '' // Honeypot field - should remain empty
  });

  // Console Easter Egg - dla ciekawskich deweloperów 😄
  useEffect(() => {
    console.log('%c🚗 CONCEPT USA CARS 🚗', 'font-size: 20px; font-weight: bold; color: #10b981;');
    console.log('%c⚠️ STOP! ⚠️', 'font-size: 16px; font-weight: bold; color: #ef4444;');
    console.log('%cJeśli ktoś kazał Ci tutaj coś wkleić, to próbuje Cię oszukać! 🚫', 'font-size: 14px; color: #f59e0b;');
    console.log('%c\nPróbujesz podejrzeć ceny sprzedanych aut? 🕵️', 'font-size: 14px; font-weight: bold; color: #8b5cf6;');
    console.log('%cNiestety, te dane są zaszyfrowane po stronie serwera 🔐', 'font-size: 12px; color: #6b7280;');
    console.log('%cJeśli jesteś zainteresowany podobnym autem, skontaktuj się z nami! 📞', 'font-size: 12px; color: #3b82f6;');
    console.log('%c\n💡 Szukasz pracy? Jesteśmy otwarci na współpracę!', 'font-size: 12px; color: #10b981;');
    console.log('%cNapisz do nas: kontakt@conceptusa.pl', 'font-size: 12px; font-style: italic; color: #6b7280;');
  }, []);

  // Page loading effect
  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations (bi-directional)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05, // Very low threshold for instant mobile loading
      rootMargin: '100px 0px 100px 0px' // Start loading 100px before entering viewport
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section entering viewport - add to visible
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        } else {
          // Section leaving viewport - remove from visible (for reverse effect)
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            newSet.delete(entry.target.id);
            return newSet;
          });
        }
      });
    };    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Fetch cars from Supabase on mount
  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY); // Track scroll position for parallax
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await carService.getCars();
    if (error) {
      console.error('Error loading cars:', error);
      alert('⚠️ Błąd ładowania samochodów.\n\nSprawdź połączenie z internetem lub odśwież stronę.');
    } else {
      setCars(data || []);
    }
    setLoading(false);
  };

  const filteredCars = (activeFilter === 'all'
    ? cars
    : cars.filter(car => car.status === activeFilter))
    .sort((a, b) => {
      // Available cars first
      if (a.status === 'available' && b.status !== 'available') return -1;
      if (a.status !== 'available' && b.status === 'available') return 1;
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Image gallery navigation
  const getCarImages = (car) => {
    // Prioritize images array, fallback to image_url, then placeholder
    if (car.images && Array.isArray(car.images) && car.images.length > 0) {
      // Filter out empty strings and null values
      const validImages = car.images.filter(img => img && img.trim() !== '');
      if (validImages.length > 0) {
        return validImages;
      }
    }
    if (car.image_url && car.image_url.trim() !== '') {
      return [car.image_url];
    }
    return ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'];
  };

  // Drivetrain icon helper
  const getDrivetrainIcon = (drivetrain) => {
    if (!drivetrain) return null;
    const type = drivetrain.toLowerCase();
    if (type.includes('awd') || type.includes('4wd') || type === '4x4') {
      return <Settings size={16} className="text-orange-500" />;
    } else if (type.includes('fwd') || type.includes('front')) {
      return <ArrowUp size={16} className="text-blue-500" />;
    } else if (type.includes('rwd') || type.includes('rear')) {
      return <ArrowDown size={16} className="text-red-500" />;
    }
    return null;
  };

  const getDrivetrainLabel = (drivetrain) => {
    if (!drivetrain) return '';
    const type = drivetrain.toLowerCase();
    if (type.includes('awd')) return 'AWD (napęd na 4 koła)';
    if (type.includes('4wd') || type === '4x4') return '4WD (napęd na 4 koła)';
    if (type.includes('fwd') || type.includes('front')) return 'FWD (napęd na przód)';
    if (type.includes('rwd') || type.includes('rear')) return 'RWD (napęd na tył)';
    return drivetrain;
  };

  const nextImage = () => {
    if (!selectedCar) return;
    const images = getCarImages(selectedCar);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!selectedCar) return;
    const images = getCarImages(selectedCar);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openCarModal = (car) => {
    setSelectedCar(car);
    setCurrentImageIndex(0); // Reset to first image
  };

  const closeCarModal = () => {
    setSelectedCar(null);
    setCurrentImageIndex(0);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rate limiting - prevent spam (60 seconds between submissions)
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    const now = Date.now();

    if (lastSubmitTime) {
      const timeSinceLastSubmit = (now - parseInt(lastSubmitTime)) / 1000;
      if (timeSinceLastSubmit < 60) {
        const remainingSeconds = Math.ceil(60 - timeSinceLastSubmit);
        alert(`⏰ Poczekaj jeszcze ${remainingSeconds} sekund przed kolejnym zapytaniem!\n\nOchrona przed spamem.`);
        return;
      }
    }

    // Honeypot check - if filled, it's a bot
    if (formData.website) {
      console.log('Bot detected - honeypot field filled');
      setSubmittingForm(false);
      return; // Silently reject without showing error
    }

    // Time-based check - reject if form submitted too quickly (less than 3 seconds)
    const timeSpent = (Date.now() - formLoadTime) / 1000;
    if (timeSpent < 3) {
      console.log('Bot detected - form submitted too quickly:', timeSpent, 'seconds');
      setSubmittingForm(false);
      return; // Silently reject
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert('⚠️ Wypełnij wymagane pola!\n\nPotrzebujemy: Imię, Email i Telefon');
      return;
    }

    // Validate RODO consent
    if (!formData.rodoConsent) {
      alert('⚠️ Musisz wyrazić zgodę na przetwarzanie danych osobowych!\n\nZaznacz checkbox z klauzulą RODO.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('⚠️ Nieprawidłowy format email!\n\nPodaj poprawny adres email.');
      return;
    }

    setSubmittingForm(true); // Start loading

    try {
      // Parse budget safely
      const budgetValue = formData.budget ? parseFloat(formData.budget) : null;

      // Save inquiry to Supabase
      const { error } = await inquiryService.createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        brand: formData.brand || null,
        model: formData.model || null,
        budget: budgetValue,
        year_range: formData.year || null,
        message: formData.message || null
      });

      if (error) {
        console.error('Error submitting inquiry:', error);
        setSubmittingForm(false);
        alert('❌ Nie udało się wysłać formularza.\n\nZadzwoń do nas: +48-691-795-116 lub spróbuj ponownie.');
        return;
      }

      // Send emails via EmailJS
      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          brand: formData.brand || 'Nie podano',
          model: formData.model || 'Nie podano',
          budget: formData.budget ? `${parseInt(formData.budget).toLocaleString('pl-PL')} PLN` : 'Nie podano',
          year: formData.year || 'Nie podano',
          message: formData.message || 'Brak dodatkowych informacji',
          to_email: 'conceptusacars@gmail.com'
        };

        // Email 1: To company (notification about new inquiry)
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        // Email 2: Auto-reply to customer (thank you message)
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID,
          {
            to_name: formData.name,
            to_email: formData.email,
            brand: formData.brand || 'dowolnej marki',
            model: formData.model || 'dowolnego modelu',
            budget: formData.budget ? `${parseInt(formData.budget).toLocaleString('pl-PL')} PLN` : 'nie określono',
            year: formData.year || 'dowolnego roku',
            inquiry_details: `Marka: ${formData.brand || 'Nie podano'}\nModel: ${formData.model || 'Nie podano'}\nRok: ${formData.year || 'Nie podano'}\nBudżet: ${formData.budget ? parseInt(formData.budget).toLocaleString('pl-PL') + ' PLN' : 'Nie podano'}${formData.message ? '\n\nDodatkowe informacje: ' + formData.message : ''}`
          },
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        console.log('Emails sent successfully via EmailJS');
      } catch (emailError) {
        console.warn('Email not sent via EmailJS, but inquiry saved:', emailError);
      }

      // Save submission timestamp for rate limiting
      localStorage.setItem('lastSubmitTime', now.toString());

      setSubmittingForm(false); // Stop loading

      console.log('Inquiry submitted successfully');
      alert('🚗 Dziękujemy! Twoje zapytanie zostało wysłane.\n\nSkontaktujemy się z Tobą w ciągu 24h z ofertą Twojego wymarzonego auta! 🇺🇸');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        brand: '',
        model: '',
        budget: '',
        year: '',
        message: '',
        website: '', // Reset honeypot
        rodoConsent: false
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmittingForm(false); // Stop loading on error
      alert('❌ Ups! Coś poszło nie tak.\n\nSpróbuj ponownie lub zadzwoń: +48-691-795-116');
    }
  };

  // Fill form with car details and scroll to order section
  const inquireAboutCar = (car) => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      brand: car.brand,
      model: car.model,
      budget: car.price?.toString() || '',
      year: car.year?.toString() || '',
      message: `Hej! Jestem zainteresowany ${car.brand} ${car.model} z ${car.year} roku. Proszę o więcej informacji.`
    });
    setSelectedCar(null);
    scrollToSection('order');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>CONCEPT - Samochody z USA | Import Dodge, Ford, Jeep z Ameryki</title>
        <meta name="description" content="Sprowadzamy samochody z USA. Muscle cars, pickupy, SUVy. Pełna obsługa: faktura VAT, kredyty, leasingi. Odprawa celna port Gdynia." />
        <link rel="canonical" href="https://conceptusa.pl/" />
        <meta property="og:title" content="CONCEPT - Samochody z USA | Import aut z Ameryki" />
        <meta property="og:description" content="Sprowadzamy samochody z USA. Muscle cars, pickupy, SUVy. Faktura VAT, kredyty, leasingi. Port Gdynia." />
        <meta property="og:url" content="https://conceptusa.pl/" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />

      {/* Loading Bar */}
      {pageLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
          <div className="h-full bg-gradient-to-r from-red-600 via-blue-500 to-red-600 animate-[loading_1s_ease-in-out]"
               style={{ width: '100%' }}></div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Staggered fade-in animation for steps */
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up-fade {
          animation: slideUpFade 0.6s ease-out forwards;
        }

        /* Delays for staggered effect */
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }

        /* Police lights effect for car cards 🚨 */
        @keyframes policeLights {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(220, 38, 38, 0.8),
              0 0 40px rgba(220, 38, 38, 0.6),
              0 0 60px rgba(220, 38, 38, 0.4);
          }
          25% {
            box-shadow:
              0 0 30px rgba(220, 38, 38, 1),
              0 0 60px rgba(220, 38, 38, 0.8),
              0 0 90px rgba(220, 38, 38, 0.6);
          }
          50% {
            box-shadow:
              0 0 20px rgba(59, 130, 246, 0.8),
              0 0 40px rgba(59, 130, 246, 0.6),
              0 0 60px rgba(59, 130, 246, 0.4);
          }
          75% {
            box-shadow:
              0 0 30px rgba(59, 130, 246, 1),
              0 0 60px rgba(59, 130, 246, 0.8),
              0 0 90px rgba(59, 130, 246, 0.6);
          }
        }

        .police-lights:hover {
          animation: policeLights 1s ease-in-out infinite;
        }

        /* RED LED Effects for CONCEPT */
        @keyframes ledGlowRed {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 10px rgba(239, 68, 68, 0.8));
            text-shadow: 0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.4);
          }
          50% {
            filter: brightness(1.2) drop-shadow(0 0 20px rgba(239, 68, 68, 1));
            text-shadow: 0 0 30px rgba(239, 68, 68, 0.9), 0 0 60px rgba(239, 68, 68, 0.6), 0 0 80px rgba(239, 68, 68, 0.4);
          }
        }

        /* LED Snake - wąż idzie w prawo, potem pulsuje */
        @keyframes ledSnakeTop {
          0% {
            transform: translateX(-120%) scaleX(0.5);
            opacity: 0;
          }
          15% {
            transform: translateX(-60%) scaleX(1);
            opacity: 1;
          }
          30% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          45% {
            transform: translateX(60%) scaleX(1);
            opacity: 1;
          }
          60% {
            transform: translateX(120%) scaleX(0.5);
            opacity: 0;
          }
          70%, 100% {
            transform: translateX(0%);
            opacity: 0.8;
          }
        }

        @keyframes ledSnakeBottom {
          0% {
            transform: translateX(120%) scaleX(0.5);
            opacity: 0;
          }
          15% {
            transform: translateX(60%) scaleX(1);
            opacity: 1;
          }
          30% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          45% {
            transform: translateX(-60%) scaleX(1);
            opacity: 1;
          }
          60% {
            transform: translateX(-120%) scaleX(0.5);
            opacity: 0;
          }
          70%, 100% {
            transform: translateX(0%);
            opacity: 0.6;
          }
        }

        /* BLUE LED Effects for Samochody z USA */
        @keyframes ledGlowBlue {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
            text-shadow: 0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4);
          }
          50% {
            filter: brightness(1.15) drop-shadow(0 0 15px rgba(59, 130, 246, 1));
            text-shadow: 0 0 25px rgba(59, 130, 246, 0.9), 0 0 50px rgba(59, 130, 246, 0.6), 0 0 70px rgba(59, 130, 246, 0.4);
          }
        }

        @keyframes ledSnakeTopBlue {
          0% {
            transform: translateX(-120%) scaleX(0.5);
            opacity: 0;
          }
          15% {
            transform: translateX(-60%) scaleX(1);
            opacity: 1;
          }
          30% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          45% {
            transform: translateX(60%) scaleX(1);
            opacity: 1;
          }
          60% {
            transform: translateX(120%) scaleX(0.5);
            opacity: 0;
          }
          70%, 100% {
            transform: translateX(0%);
            opacity: 0.7;
          }
        }

        @keyframes ledSnakeBottomBlue {
          0% {
            transform: translateX(120%) scaleX(0.5);
            opacity: 0;
          }
          15% {
            transform: translateX(60%) scaleX(1);
            opacity: 1;
          }
          30% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          45% {
            transform: translateX(-60%) scaleX(1);
            opacity: 1;
          }
          60% {
            transform: translateX(-120%) scaleX(0.5);
            opacity: 0;
          }
          70%, 100% {
            transform: translateX(0%);
            opacity: 0.5;
          }
        }

        /* Apply animations */
        .animate-led-glow-red {
          animation: ledGlowRed 2.5s ease-in-out infinite 1s;
        }

        .animate-led-snake-top {
          animation: ledSnakeTop 4s ease-in-out infinite;
        }

        .animate-led-snake-bottom {
          animation: ledSnakeBottom 4s ease-in-out infinite;
        }

        .animate-led-glow-blue {
          animation: ledGlowBlue 2.8s ease-in-out infinite 1.2s;
        }

        .animate-led-snake-top-blue {
          animation: ledSnakeTopBlue 4.2s ease-in-out infinite 0.3s;
        }

        .animate-led-snake-bottom-blue {
          animation: ledSnakeBottomBlue 4.2s ease-in-out infinite 0.3s;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        /* Modern Scroll Effect - sections slide up (faster) */
        section {
          position: relative;
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        section.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Add spacing between sections */
        section:not(#home) {
          margin-top: -1px; /* Remove gap between sections */
        }

        /* Fade-in animation for sections */
        section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Enhanced glow effect for CTA buttons */
        @keyframes buttonGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.5), 0 0 80px rgba(220, 38, 38, 0.3);
          }
        }

        .cta-glow:hover {
          animation: buttonGlow 1.5s ease-in-out infinite;
        }
      `}</style>

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

        {/* Removed animated stripe - cleaner look */}
      </nav>

      {/* Hero Section */}
      <section id="home" className={`relative h-screen flex items-center justify-center overflow-hidden ${visibleSections.has('home') ? 'visible' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900 to-red-900/50"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)` // Parallax effect: moves slower than scroll
          }}
        >
          <picture>
            <source srcSet={backgroundImageWebP} type="image/webp" />
            <img
              src={backgroundImageFallback}
              alt="Background"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </picture>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {/* CONCEPT with red LED effect */}
            <div className="relative inline-block mb-2">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 animate-led-glow-red">
                CONCEPT
              </div>
              {/* LED snake effect - starts as snake, then pulses */}
              <div className="absolute -inset-x-4 -top-2 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-80 blur-sm animate-led-snake-top"></div>
              <div className="absolute -inset-x-4 -bottom-2 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 blur-sm animate-led-snake-bottom"></div>
            </div>

            {/* Samochody z USA with blue LED effect */}
            <div className="relative inline-block text-4xl md:text-5xl mt-4">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 animate-led-glow-blue">
                Samochody z USA
              </div>
              {/* Blue LED strips */}
              <div className="absolute -inset-x-4 -top-1 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70 blur-sm animate-led-snake-top-blue"></div>
              <div className="absolute -inset-x-4 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 blur-sm animate-led-snake-bottom-blue"></div>
            </div>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Sprowadzamy amerykańskie marzenia prosto do Twojego garażu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('portfolio')}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg cta-glow"
            >
              Zobacz portfolio
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105"
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
      <section id="about" className={`py-20 bg-gray-800 ${visibleSections.has('about') ? 'visible' : ''}`}>
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

          {/* Specjalizacja */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-8">
              Nasza <span className="text-red-600">specjalizacja</span>
            </h3>
            <div className="bg-gray-900 rounded-xl p-8 text-center">
              <p className="text-xl text-gray-300 mb-6">
                Specjalizujemy się głównie w markach grupy <span className="text-blue-500 font-bold">Stellantis</span>
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-lg mb-8">
                <span className="bg-red-600 px-6 py-3 rounded-full font-semibold">Chrysler</span>
                <span className="bg-red-600 px-6 py-3 rounded-full font-semibold">Dodge</span>
                <span className="bg-red-600 px-6 py-3 rounded-full font-semibold">Jeep</span>
                <span className="bg-red-600 px-6 py-3 rounded-full font-semibold">Fiat</span>
                <span className="bg-red-600 px-6 py-3 rounded-full font-semibold">Alfa Romeo</span>
              </div>
              <p className="text-gray-400 text-sm">
                oraz inne marki amerykańskie jak <span className="text-white font-semibold">Ford</span> i więcej
              </p>
            </div>
          </div>

          {/* Formy zakupu */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="text-blue-500">Formy zakupu</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-8 hover:shadow-2xl hover:shadow-red-500/30 transition transform hover:scale-105">
                <div className="text-4xl mb-4">🚗✨</div>
                <h4 className="text-2xl font-bold mb-4">Auto na gotowo</h4>
                <ul className="space-y-3 text-gray-100">
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Sprowadzone z USA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Naprawione i sprawdzone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Zarejestrowane w Polsce</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Wszystkie opłaty uregulowane</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span className="font-semibold">Gotowe do jazdy!</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/30 transition transform hover:scale-105">
                <div className="text-4xl mb-4">🚚💰</div>
                <h4 className="text-2xl font-bold mb-4">Samochód pod dom</h4>
                <ul className="space-y-3 text-gray-100">
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Zakup w USA według Twoich wymagań</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Transport do Polski</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Odprawa celna w porcie Gdynia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span>Bez naprawy i rejestracji</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    <span className="font-semibold">Niższa cena - większa elastyczność!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Faktura VAT i Finansowanie */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-6">💼 Profesjonalna obsługa finansowa i logistyczna</h3>
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-white text-green-600 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Pełna faktura VAT</h4>
                  <p className="text-green-50">Na każdy sprzedany samochód wystawiamy pełną fakturę VAT. Działamy w pełni legalnie i transparentnie.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-white text-green-600 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Kredyty i leasingi</h4>
                  <p className="text-green-50">Oferujemy możliwość finansowania zakupu poprzez kredyt lub leasing. Pomożemy dobrać najlepszą opcję!</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-white text-green-600 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Port Gdynia</h4>
                  <p className="text-green-50">Wszystkie odprawy celne realizujemy wyłącznie przez port w Gdyni. Szybko, sprawnie i bezpiecznie!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className={`py-20 bg-gray-900 ${visibleSections.has('process') ? 'visible' : ''}`}>
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
              <div key={idx} className={`relative animate-slide-up-fade delay-${(idx + 1) * 100}`}>
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
      <section id="portfolio" className={`py-20 bg-gray-800 ${visibleSections.has('portfolio') ? 'visible' : ''}`}>
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

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
                  {/* Image skeleton */}
                  <div className="h-48 bg-gray-700"></div>

                  {/* Content skeleton */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>

                    {/* Meta info */}
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-700 rounded w-20"></div>
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                    </div>

                    {/* Engine info */}
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-700 rounded w-16"></div>
                      <div className="h-4 bg-gray-700 rounded w-20"></div>
                    </div>

                    {/* Price */}
                    <div className="h-8 bg-gray-700 rounded w-1/2 mt-4"></div>
                  </div>
                </div>
              ))}
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
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentCars.map((car) => {
                  const carImages = getCarImages(car);
                  const mainImage = carImages[0];

                  return (
                    <div
                      key={car.id}
                      className="bg-gray-900 rounded-xl overflow-hidden transition cursor-pointer police-lights"
                      onClick={() => openCarModal(car)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={mainImage}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover hover:scale-110 transition duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                        {carImages.length > 1 && (
                          <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm">
                            📷 {carImages.length}
                          </div>
                        )}
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
                          {car.mileage?.toLocaleString()} mil ({Math.round(car.mileage * 1.60934).toLocaleString()} km)
                        </span>
                        {car.drivetrain && (
                          <span className="flex items-center gap-1" title={getDrivetrainLabel(car.drivetrain)}>
                            {getDrivetrainIcon(car.drivetrain)}
                            {car.drivetrain.toUpperCase()}
                          </span>
                        )}
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
                      {car.status === 'available' ? (
                        <div className="text-3xl font-bold text-green-500">
                          {car.price?.toLocaleString()} PLN <span className="text-sm text-blue-400">brutto</span>
                        </div>
                      ) : (
                        <div className="relative h-12 flex items-center justify-center">
                          <div className="text-3xl font-bold text-gray-600 blur-md select-none pointer-events-none" aria-hidden="true">
                            {/* Fake price for sold cars - real price hidden */}
                            999 999 PLN
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative px-5 py-1.5 bg-gradient-to-br from-slate-700/95 via-slate-600/95 to-slate-700/95 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-full"></div>
                              <span className="relative text-white/90 font-semibold text-xs tracking-wide uppercase drop-shadow-lg">
                                Niedostępny
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Modern Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  {/* Previous Button */}
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(1, prev - 1));
                      scrollToSection('portfolio');
                    }}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition ${
                      currentPage === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-red-600 text-white'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Show first, last, current, and adjacent pages
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            scrollToSection('portfolio');
                          }}
                          className={`min-w-[40px] h-10 rounded-lg font-semibold transition ${
                            currentPage === pageNum
                              ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white scale-110'
                              : 'bg-gray-700 hover:bg-gray-600 text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <span key={pageNum} className="text-gray-500">...</span>;
                    }
                    return null;
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(totalPages, prev + 1));
                      scrollToSection('portfolio');
                    }}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition ${
                      currentPage === totalPages
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-red-600 text-white'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className={`py-20 bg-gray-900 ${visibleSections.has('order') ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Zamów <span className="text-blue-500">swoje auto</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Powiedz nam czego szukasz, a my znajdziemy idealne auto dla Ciebie
          </p>

          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Imię i nazwisko *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Jan Kowalski"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="jan@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Telefon *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="691 795 116"
                required
              />
            </div>

            {/* Honeypot field - invisible to users, catches bots */}
            <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Budżet (PLN)</label>
                <input
                  type="number"
                  inputMode="numeric"
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

            {/* RODO Consent */}
            <div className="mb-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="rodoConsent"
                  checked={formData.rodoConsent || false}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 accent-red-600"
                  required
                />
                <span className="text-sm text-gray-300">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych przez{' '}
                  <strong className="text-white">Concept Łukasz Grzenkowski</strong> w celu kontaktu
                  i prezentacji oferty importu samochodów z USA. Administratorem danych jest Concept Łukasz Grzenkowski,
                  ul. Długa 24, 84-230 Dębogórze-Wybudowanie. Więcej informacji w{' '}
                  <a href="/privacy-policy" target="_blank" className="text-blue-400 hover:text-blue-300 underline">
                    Polityce Prywatności
                  </a>.
                  Mam prawo do wycofania zgody, dostępu, sprostowania i usunięcia danych.*
                </span>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submittingForm}
              className={`w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${submittingForm ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {submittingForm ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Wysyłanie...
                </>
              ) : (
                'Wyślij zapytanie'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 bg-gray-800 ${visibleSections.has('contact') ? 'visible' : ''}`}>
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
              href="mailto:conceptusacars@gmail.com"
              className="bg-gray-900 p-8 rounded-xl text-center hover:bg-gray-700 transition transform hover:scale-105"
            >
              <Mail size={40} className="mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-400">conceptusacars@gmail.com</p>
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
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">CONCEPT - Samochody z USA</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="font-semibold text-white">Concept Łukasz Grzenkowski</p>
                <p>ul. Długa 24</p>
                <p>84-230 Dębogórze-Wybudowanie</p>
                <p className="mt-3">NIP: 5881948634</p>
                <p>REGON: 383279264</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>
                  <a href="tel:+48691795116" className="hover:text-blue-400 transition">
                    📞 +48-691-795-116
                  </a>
                </p>
                <p>
                  <a href="mailto:conceptusacars@gmail.com" className="hover:text-blue-400 transition">
                    ✉️ conceptusacars@gmail.com
                  </a>
                </p>
                <p className="mt-3 text-xs">
                  Godziny otwarcia:<br />
                  Pon-Pt: 09:00-17:00
                </p>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Informacje prawne</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <a
                  href="/terms-of-service"
                  className="block hover:text-blue-400 transition"
                >
                  📄 Regulamin świadczenia usług
                </a>
                <a
                  href="/privacy-policy"
                  className="block hover:text-blue-400 transition"
                >
                  🔒 Polityka Prywatności
                </a>
                <button
                  onClick={() => window.openCookieSettings && window.openCookieSettings()}
                  className="hover:text-orange-400 transition flex items-center gap-1"
                >
                  <Cookie size={16} />
                  Ustawienia Cookies
                </button>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-blue-400 transition mt-3"
                >
                  🇪🇺 Platforma ODR (rozstrzyganie sporów online)
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CONCEPT - Samochody z USA. Wszystkie prawa zastrzeżone.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Import samochodów z USA | Odprawa celna Gdynia | Faktura VAT | Kredyty i leasingi
            </p>
          </div>
        </div>
      </footer>

      {/* Car Detail Modal with Image Gallery */}
      {selectedCar && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeCarModal}
        >
          <div
            className="bg-gray-800 rounded-xl max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCarModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-gray-900/80 rounded-full p-2"
            >
              <X size={24} />
            </button>

            {/* Image Gallery */}
            <div className="relative mb-6 group bg-gray-950 rounded-lg">
              <img
                src={getCarImages(selectedCar)[currentImageIndex]}
                alt={`${selectedCar.brand} ${selectedCar.model} - zdjęcie ${currentImageIndex + 1}`}
                className="w-full h-96 object-contain rounded-lg"
                loading="lazy"
                decoding="async"
              />

              {/* Navigation Arrows */}
              {getCarImages(selectedCar).length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition opacity-0 group-hover:opacity-100"
                    aria-label="Poprzednie zdjęcie"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition opacity-0 group-hover:opacity-100"
                    aria-label="Następne zdjęcie"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {getCarImages(selectedCar).length}
                  </div>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {getCarImages(selectedCar).map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`w-2 h-2 rounded-full transition ${
                          index === currentImageIndex
                            ? 'bg-red-600 w-8'
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Przejdź do zdjęcia ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

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
                <p className="text-xl font-bold">
                  {selectedCar.mileage?.toLocaleString()} mil
                  <span className="text-sm text-gray-400 ml-2">
                    ({Math.round(selectedCar.mileage * 1.60934).toLocaleString()} km)
                  </span>
                </p>
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
              {selectedCar.drivetrain && (
                <div>
                  <p className="text-gray-400">Napęd</p>
                  <p className="text-xl font-bold flex items-center gap-2">
                    {getDrivetrainIcon(selectedCar.drivetrain)}
                    <span>{getDrivetrainLabel(selectedCar.drivetrain)}</span>
                  </p>
                </div>
              )}
              {selectedCar.fuel_type && (
                <div>
                  <p className="text-gray-400">Paliwo</p>
                  <p className="text-xl font-bold">{selectedCar.fuel_type}</p>
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
                {selectedCar.status === 'available' ? (
                  <p className="text-3xl font-bold text-green-500">
                    {selectedCar.price?.toLocaleString()} PLN <span className="text-sm text-blue-400">brutto</span>
                  </p>
                ) : (
                  <div className="relative inline-block min-w-[280px] h-14 flex items-center justify-center">
                    <p className="text-3xl font-bold text-gray-600 blur-lg select-none pointer-events-none" aria-hidden="true">
                      {/* Fake price for sold cars - real price hidden */}
                      999 999 PLN
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative px-8 py-2.5 bg-gradient-to-br from-slate-700/95 via-slate-600/95 to-slate-700/95 rounded-full shadow-2xl border border-white/20 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-full"></div>
                        <span className="relative text-white/90 font-semibold text-sm tracking-wide uppercase drop-shadow-lg">
                          Niedostępny
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedCar.status === 'available' ? (
              <button
                onClick={() => inquireAboutCar(selectedCar)}
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
              >
                Zapytaj o ten samochód
              </button>
            ) : (
              <button
                onClick={() => {
                  setFormData({
                    ...formData,
                    brand: selectedCar.brand || '',
                    model: '',
                    message: `Szukam samochodu podobnego do: ${selectedCar.brand} ${selectedCar.model} ${selectedCar.year}`
                  });
                  setSelectedCar(null);
                  scrollToSection('order');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Zapytaj o podobny samochód
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
