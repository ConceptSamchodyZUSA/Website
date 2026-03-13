import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Settings, ArrowUp, ArrowDown } from 'lucide-react';
import { carService, inquiryService } from './services';
import emailjs from '@emailjs/browser';
import CookieConsentBanner from './CookieConsent';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import VehicleProcess from './components/sections/VehicleProcess';
import CarGallery from './components/sections/CarGallery';
import InquiryForm from './components/sections/InquiryForm';
import Contact from './components/sections/Contact';
import Modal from './components/ui/Modal';

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
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9; // 3x3 grid
  const [submittingForm, setSubmittingForm] = useState(false);
  const [formLoadTime] = useState(Date.now()); // Track when form was loaded

  // Image loading state for blur effect
  const [loadedImages, setLoadedImages] = useState(new Set());

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
    if (process.env.NODE_ENV === 'production') {
      console.log('%c🚗 CONCEPT USA CARS 🚗', 'font-size: 20px; font-weight: bold; color: #10b981;');
      console.log('%c⚠️ STOP! ⚠️', 'font-size: 16px; font-weight: bold; color: #ef4444;');
      console.log('%cJeśli ktoś kazał Ci tutaj coś wkleić, to próbuje Cię oszukać! 🚫', 'font-size: 14px; color: #f59e0b;');
      console.log('%c\nPróbujesz podejrzeć ceny sprzedanych aut? 🕵️', 'font-size: 14px; font-weight: bold; color: #8b5cf6;');
      console.log('%cNiestety, te dane są zaszyfrowane po stronie serwera 🔐', 'font-size: 12px; color: #6b7280;');
      console.log('%cJeśli jesteś zainteresowany podobnym autem, skontaktuj się z nami! 📞', 'font-size: 12px; color: #3b82f6;');
      console.log('%c\n💡 Szukasz pracy? Jesteśmy otwarci na współpracę!', 'font-size: 12px; color: #10b981;');
      console.log('%cNapisz do nas: kontakt@conceptusa.pl', 'font-size: 12px; font-style: italic; color: #6b7280;');
    }
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
    }; const observer = new IntersectionObserver(observerCallback, observerOptions);

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

  // Handle image load for blur effect
  const handleImageLoad = (src) => {
    setLoadedImages(prev => new Set([...prev, src]));
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
    <div className="min-h-screen bg-concept-dark text-white font-sans selection:bg-concept-red selection:text-white">
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-concept-red focus:text-white rounded-br-lg font-bold shadow-xl">
        Przejdź do głównej treści
      </a>

      <Helmet>
        <title>CONCEPT - Samochody z USA | Import Dodge, Ford, Jeep z Ameryki</title>
        <meta name="description" content="Sprowadzamy samochody z USA. Muscle cars, pickupy, SUVy. Pełna obsługa: faktura VAT, kredyty, leasingi. Odprawa celna port Gdynia." />
        <link rel="canonical" href="https://conceptusa.pl/" />
        <meta property="og:title" content="CONCEPT - Samochody z USA | Import aut z Ameryki" />
        <meta property="og:description" content="Sprowadzamy samochody z USA. Muscle cars, pickupy, SUVy. Faktura VAT, kredyty, leasingi. Port Gdynia." />
        <meta property="og:url" content="https://conceptusa.pl/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://conceptusa.pl/facebook-cover.png" />
        <meta property="og:image:width" content="1702" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CONCEPT - Samochody z USA" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CONCEPT - Samochody z USA",
            "url": "https://conceptusa.pl",
            "logo": "https://conceptusa.pl/logo-facebook.png",
            "image": "https://conceptusa.pl/logo-facebook.png",
            "description": "Import samochodów z USA. Muscle cars, pickupy, SUVy. Pełna obsługa od zakupu do rejestracji.",
            "sameAs": [
              "https://www.facebook.com/conceptsamochodyzusa",
              "https://www.instagram.com/concept_samochody_z_usa"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+48-691-795-116",
              "contactType": "customer service",
              "areaServed": "PL",
              "availableLanguage": "Polish"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ul. Długa 24",
              "addressLocality": "Dębogórze-Wybudowanie",
              "postalCode": "84-230",
              "addressCountry": "PL"
            }
          })}
        </script>
      </Helmet>

      <CookieConsentBanner />

      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} scrollToSection={scrollToSection} />

      <div className="pt-20">
        <Hero isVisible={visibleSections.has('home')} scrollToSection={scrollToSection} backgroundImageFallback={backgroundImageFallback} backgroundImageWebP={backgroundImageWebP} />

        <About isVisible={visibleSections.has('about')} />

        <VehicleProcess isVisible={visibleSections.has('process')} />

        <CarGallery
          isVisible={visibleSections.has('portfolio')}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          loading={loading}
          filteredCars={filteredCars}
          currentCars={currentCars}
          getCarImages={getCarImages}
          handleImageLoad={handleImageLoad}
          loadedImages={loadedImages}
          openCarModal={openCarModal}
          getDrivetrainIcon={getDrivetrainIcon}
          getDrivetrainLabel={getDrivetrainLabel}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          scrollToSection={scrollToSection}
        />

        <InquiryForm
          isVisible={visibleSections.has('order')}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          submittingForm={submittingForm}
        />

        <Contact isVisible={visibleSections.has('contact')} />
      </div>

      <Footer />

      {/* Sticky Mobile CTA */}
      {isScrolled && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
          <button
            onClick={() => scrollToSection('order')}
            className="bg-gradient-to-r from-concept-red to-red-700 text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-red-500/50 flex items-center gap-2 animate-pulse-slow"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Zamów auto
          </button>
        </div>
      )}

      <Modal
        selectedCar={selectedCar}
        closeCarModal={closeCarModal}
        getCarImages={getCarImages}
        currentImageIndex={currentImageIndex}
        handleImageLoad={handleImageLoad}
        loadedImages={loadedImages}
        prevImage={prevImage}
        nextImage={nextImage}
        setCurrentImageIndex={setCurrentImageIndex}
        getDrivetrainIcon={getDrivetrainIcon}
        getDrivetrainLabel={getDrivetrainLabel}
        inquireAboutCar={inquireAboutCar}
        setFormData={setFormData}
        formData={formData}
        scrollToSection={scrollToSection}
        setSelectedCar={setSelectedCar}
      />
    </div>
  );
};

export default ConceptUSACars;
