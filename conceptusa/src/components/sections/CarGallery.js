import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarCard from '../ui/CarCard';

const CarGallery = ({
  isVisible,
  activeFilter,
  setActiveFilter,
  loading,
  filteredCars,
  currentCars,
  getCarImages,
  handleImageLoad,
  loadedImages,
  openCarModal,
  getDrivetrainIcon,
  getDrivetrainLabel,
  totalPages,
  currentPage,
  setCurrentPage,
  scrollToSection
}) => {
  return (
    <section id="portfolio" className={`py-24 bg-concept-dark relative z-10 ${isVisible ? 'visible' : ''}`}>
      {/* Top divider shimmer */}
      <div className="absolute top-0 left-0 right-0 divider-shimmer"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-concept-gray/40 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 font-heading tracking-wider">
          Nasze <span className="text-concept-red">Portfolio</span>
        </h2>
        <p className="text-center text-slate-400 mb-12 text-lg font-light tracking-wide font-accent">
          Sprowadzone samochody, które czekają na nowych właścicieli
        </p>

        {/* Tab-style Filters */}
        <div className="flex justify-center gap-2 mb-16 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`relative px-8 py-2.5 rounded-lg text-sm font-accent font-semibold tracking-wider transition-all duration-500 overflow-hidden group ${activeFilter === 'all'
              ? 'bg-concept-red text-white shadow-[0_0_20px_rgba(227,24,55,0.4)] border border-concept-red/50'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
              }`}
          >
            {activeFilter === 'all' && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-scan"></div>
            )}
            <span className="relative z-10">Wszystkie</span>
          </button>

          <button
            onClick={() => setActiveFilter('available')}
            className={`relative px-8 py-2.5 rounded-lg text-sm font-accent font-semibold tracking-wider transition-all duration-500 overflow-hidden group ${activeFilter === 'available'
              ? 'bg-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)] border border-teal-400/50'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
              }`}
          >
            {activeFilter === 'available' && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-scan"></div>
            )}
            <span className="relative z-10">Dostępne</span>
          </button>

          <button
            onClick={() => setActiveFilter('sold')}
            className={`relative px-8 py-2.5 rounded-lg text-sm font-accent font-semibold tracking-wider transition-all duration-500 overflow-hidden group ${activeFilter === 'sold'
              ? 'bg-slate-600 text-white shadow-[0_0_20px_rgba(100,116,139,0.4)] border border-slate-400/50'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
              }`}
          >
            {activeFilter === 'sold' && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-scan"></div>
            )}
            <span className="relative z-10">Sprzedane</span>
          </button>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-label="Ładowanie samochodów">
            <span className="sr-only">Ładowanie listy samochodów...</span>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-matte rounded-lg overflow-hidden" aria-hidden="true">
                <div className="h-56 animate-[shimmer_2s_infinite] bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:400%_100%]"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 animate-[shimmer_2s_infinite] bg-white/10 rounded w-3/4"></div>
                  <div className="flex gap-4">
                    <div className="h-4 animate-[shimmer_2s_infinite] bg-white/10 rounded w-20"></div>
                    <div className="h-4 animate-[shimmer_2s_infinite] bg-white/10 rounded w-24"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 animate-[shimmer_2s_infinite] bg-white/10 rounded w-16"></div>
                    <div className="h-4 animate-[shimmer_2s_infinite] bg-white/10 rounded w-20"></div>
                  </div>
                  <div className="h-10 animate-[shimmer_2s_infinite] bg-white/10 rounded w-1/2 mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No cars message */}
        {!loading && filteredCars.length === 0 && (
          <div className="text-center py-24 card-matte rounded-xl">
            <p className="text-2xl text-slate-300 font-light tracking-wide font-heading">Brak samochodów w tej kategorii</p>
            <p className="text-slate-500 mt-4 font-accent">Spróbuj zmienić filtry lub wróć później.</p>
          </div>
        )}

        {/* Cars Grid */}
        {!loading && filteredCars.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                getCarImages={getCarImages}
                handleImageLoad={handleImageLoad}
                loadedImages={loadedImages}
                openCarModal={openCarModal}
                getDrivetrainIcon={getDrivetrainIcon}
                getDrivetrainLabel={getDrivetrainLabel}
              />
            ))}
          </div>
        )}

        {/* Modern Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => {
                setCurrentPage(prev => Math.max(1, prev - 1));
                scrollToSection('portfolio');
              }}
              disabled={currentPage === 1}
              className={`p-3 rounded-lg transition-all duration-300 ${currentPage === 1
                ? 'bg-white/5 opacity-50 cursor-not-allowed text-slate-500'
                : 'bg-white/10 hover:bg-concept-red text-white'
                }`}
            >
              <ChevronLeft size={20} />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
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
                    className={`min-w-[44px] h-[44px] rounded-lg font-accent font-semibold transition-all duration-300 ${currentPage === pageNum
                      ? 'bg-concept-red text-white shadow-[0_0_15px_rgba(227,24,55,0.4)] scale-110'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return <span key={pageNum} className="text-slate-500 px-2">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => {
                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                scrollToSection('portfolio');
              }}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-lg transition-all duration-300 ${currentPage === totalPages
                ? 'bg-white/5 opacity-50 cursor-not-allowed text-slate-500'
                : 'bg-white/10 hover:bg-concept-red text-white'
                }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarGallery;
