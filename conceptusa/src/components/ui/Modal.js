import React from 'react';
import { X, ChevronLeft, ChevronRight, Mail } from 'lucide-react';

const Modal = ({
  selectedCar,
  closeCarModal,
  getCarImages,
  currentImageIndex,
  handleImageLoad,
  loadedImages,
  prevImage,
  nextImage,
  setCurrentImageIndex,
  getDrivetrainIcon,
  getDrivetrainLabel,
  inquireAboutCar,
  setFormData,
  formData,
  scrollToSection,
  setSelectedCar
}) => {
  if (!selectedCar) return null;

  return (
    <div
      className="fixed inset-0 bg-concept-dark/95 backdrop-blur-xl z-[200] flex items-center justify-center p-4 sm:p-6"
      onClick={closeCarModal}
    >
      <div
        className="card-matte rounded-xl max-w-5xl w-full relative max-h-[90vh] overflow-y-auto overflow-x-hidden border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeCarModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 bg-white/5 hover:bg-concept-red rounded-full p-2.5 transition-all duration-300 backdrop-blur-md"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          {/* Image Gallery */}
          <div className="relative mb-6 group bg-black/40 rounded-xl overflow-hidden shadow-inner border border-white/5">
            <img
              src={getCarImages(selectedCar)[currentImageIndex]}
              alt={`${selectedCar.brand} ${selectedCar.model}`}
              className={`w-full h-[400px] md:h-[500px] object-contain transition duration-700 ${!loadedImages.has(getCarImages(selectedCar)[currentImageIndex]) ? 'blur-md grayscale' : ''}`}
              loading="lazy"
              decoding="async"
              onLoad={() => handleImageLoad(getCarImages(selectedCar)[currentImageIndex])}
            />

            {getCarImages(selectedCar).length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-concept-red text-white p-3 md:p-4 rounded-xl transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:scale-105"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-concept-red text-white p-3 md:p-4 rounded-xl transition-all duration-300 backdrop-blur-md opacity-0 group-hover:opacity-100 hover:scale-105"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-accent font-medium tracking-widest text-white/90 border border-white/10 shadow-lg">
                  {currentImageIndex + 1} / {getCarImages(selectedCar).length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {getCarImages(selectedCar).length > 1 && (
            <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              {getCarImages(selectedCar).map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-18 rounded-xl overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex
                    ? 'border-concept-red shadow-[0_0_15px_rgba(227,24,55,0.4)] scale-105'
                    : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                    }`}
                >
                  <img
                    src={imgSrc}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-white tracking-wider">
                {selectedCar.brand} {selectedCar.model}
              </h3>

              {selectedCar.description && (
                <p className="text-slate-300 font-light leading-relaxed mb-8 font-accent">{selectedCar.description}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Rok produkcji</p>
                  <p className="text-white text-xl font-bold font-heading">{selectedCar.year}</p>
                </div>
                <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                  <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Przebieg</p>
                  <p className="text-white text-xl font-bold font-heading">
                    {selectedCar.mileage?.toLocaleString()} <span className="text-sm font-normal text-slate-400 font-accent">mil</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-accent">({Math.round(selectedCar.mileage * 1.60934).toLocaleString()} km)</p>
                </div>
                {selectedCar.engine_capacity && (
                  <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Silnik</p>
                    <p className="text-white text-xl font-bold font-heading">{selectedCar.engine_capacity}L</p>
                  </div>
                )}
                {selectedCar.horsepower && (
                  <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Moc</p>
                    <p className="text-white text-xl font-bold font-heading">{selectedCar.horsepower} <span className="text-sm font-normal text-slate-400 font-accent">KM</span></p>
                  </div>
                )}
                {selectedCar.transmission && (
                  <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Skrzynia</p>
                    <p className="text-white text-xl font-bold capitalize font-heading">{selectedCar.transmission}</p>
                  </div>
                )}
                {selectedCar.drivetrain && (
                  <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Napęd</p>
                    <p className="text-white text-xl font-bold flex items-center gap-2 font-heading">
                      {getDrivetrainIcon(selectedCar.drivetrain)}
                      <span>{getDrivetrainLabel(selectedCar.drivetrain)}</span>
                    </p>
                  </div>
                )}
                {selectedCar.fuel_type && (
                  <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Paliwo</p>
                    <p className="text-white text-xl font-bold capitalize font-heading">{selectedCar.fuel_type}</p>
                  </div>
                )}
                {selectedCar.color && (
                  <div className="card-matte p-4 rounded-xl group/spec hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                    <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1 font-accent">Kolor</p>
                    <p className="text-white text-xl font-bold capitalize font-heading">{selectedCar.color}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <div className="card-matte p-8 rounded-xl border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full"></div>

                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-2 font-accent">Cena i status</p>

                <div className="mb-8">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 font-accent ${selectedCar.status === 'available' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                    {selectedCar.status === 'available' ? 'Dostępny' : 'Sprzedany'}
                  </div>

                  {selectedCar.status === 'available' ? (
                    <div>
                      <p className="text-5xl font-bold text-teal-400 font-heading tracking-wider mb-1">
                        {selectedCar.price?.toLocaleString()} <span className="text-3xl">PLN</span>
                      </p>
                      <p className="text-sm text-slate-400 uppercase tracking-widest font-accent font-medium">Cena brutto</p>
                    </div>
                  ) : (
                    <div className="relative inline-block w-full h-16 flex items-center justify-start mt-2">
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <div className="relative px-8 py-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                          <span className="text-slate-300 font-bold text-sm tracking-widest uppercase font-accent">
                            Niedostępny
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {selectedCar.status === 'available' ? (
                  <button
                    onClick={() => inquireAboutCar(selectedCar)}
                    className="w-full bg-concept-red hover:bg-concept-red-dark text-white py-4 rounded-xl font-bold tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(227,24,55,0.4)] hover:-translate-y-1 font-accent"
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
                    className="w-full bg-concept-blue hover:bg-concept-blue-dark text-white py-4 rounded-xl font-bold tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(91,123,154,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 font-accent"
                  >
                    <Mail size={20} />
                    Zapytaj o podobny
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
