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
      <div className="absolute inset-0 bg-gradient-to-b from-concept-dark/40 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-concept-red">Nasza oferta</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Auta z <span className="text-slate-400">charakterem.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Sprawdzone samochody z USA, gotowe na kolejnego właściciela.
            </p>
          </div>

          <div className="inline-flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.04] p-1">
            {[
              { id: 'all', label: 'Wszystkie' },
              { id: 'available', label: 'Dostępne' },
              { id: 'sold', label: 'Sprzedane' }
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${activeFilter === filter.id
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-label="Ładowanie samochodów">
            <span className="sr-only">Ładowanie listy samochodów...</span>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden border border-white/5" aria-hidden="true">
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
          <div className="text-center py-24 glass-panel rounded-3xl">
            <p className="text-2xl text-slate-300 font-light tracking-wide">Brak samochodów w tej kategorii</p>
            <p className="text-slate-500 mt-4">Spróbuj zmienić filtry lub wróć później.</p>
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
              className={`p-3 rounded-xl transition-all duration-300 ${currentPage === 1
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
                    className={`min-w-[44px] h-[44px] rounded-xl font-semibold transition-all duration-300 ${currentPage === pageNum
                      ? 'bg-concept-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] scale-110'
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
              className={`p-3 rounded-xl transition-all duration-300 ${currentPage === totalPages
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
