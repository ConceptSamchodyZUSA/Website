import React from 'react';
import { Calendar, Gauge, Fuel, Zap } from 'lucide-react';
import { useTilt } from '../../hooks/useAnimations';

const CarCard = ({
  car,
  getCarImages,
  handleImageLoad,
  loadedImages,
  openCarModal,
  getDrivetrainIcon,
  getDrivetrainLabel
}) => {
  const carImages = getCarImages(car);
  const mainImage = carImages[0];
  const { ref: tiltRef, style: tiltStyle, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <div
      ref={tiltRef}
      className="card-matte group rounded-lg overflow-hidden cursor-pointer relative border-b-2 border-b-concept-red/0 hover:border-b-concept-red/60 transition-all duration-500"
      onClick={() => openCarModal(car)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
    >
      {/* Dynamic Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-concept-red/0 via-transparent to-concept-gold/0 group-hover:from-concept-red/10 group-hover:to-concept-gold/5 transition-colors duration-700 pointer-events-none z-10 mix-blend-screen"></div>

      <div className="relative h-56 overflow-hidden bg-black/50">
        <img
          src={mainImage}
          alt={`${car.brand} ${car.model}`}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!loadedImages.has(mainImage) ? 'blur-md grayscale' : ''
            }`}
          loading="lazy"
          decoding="async"
          onLoad={() => handleImageLoad(mainImage)}
        />

        {/* Absolute Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700 z-10"></div>

        {/* Scanning line effect on hover */}
        <div className="absolute inset-0 w-full h-[2px] bg-concept-red/40 shadow-[0_0_15px_rgba(227,24,55,0.6)] -translate-y-full group-hover:animate-[scan_2.5s_ease-in-out_infinite] z-20"></div>

        {carImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-accent font-medium tracking-wide flex items-center gap-2 border border-white/10 text-white">
            <span className="opacity-70">📷</span> {carImages.length}
          </div>
        )}

        <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md font-accent ${car.status === 'available'
          ? 'bg-gradient-to-r from-teal-600/80 to-teal-500/80 border border-teal-400/30 text-white'
          : 'bg-gradient-to-r from-slate-600/80 to-slate-500/80 border border-slate-400/30 text-white'
          }`}>
          {car.status === 'available' ? 'Dostępny' : 'Sprzedany'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-white font-heading tracking-wider group-hover:text-concept-red transition-colors">
          {car.brand} {car.model}
        </h3>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-light font-accent">
            <Calendar size={16} className="text-concept-red/70" />
            <span>{car.year}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 text-sm font-light font-accent">
            <Gauge size={16} className="text-concept-chrome/70" />
            <span>{Math.round(car.mileage * 1.60934).toLocaleString()} km</span>
          </div>

          {car.engine_capacity && (
            <div className="flex items-center gap-2 text-slate-300 text-sm font-light font-accent">
              <Fuel size={16} className="text-concept-gold/70" />
              <span>{car.engine_capacity}L</span>
            </div>
          )}

          {car.horsepower && (
            <div className="flex items-center gap-2 text-slate-300 text-sm font-light font-accent">
              <Zap size={16} className="text-concept-red-light/70" />
              <span>{car.horsepower} KM</span>
            </div>
          )}
        </div>

        <div className="pt-5 border-t border-white/10">
          {car.status === 'available' ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-teal-400 font-heading tracking-wider">
                {car.price?.toLocaleString()}
              </span>
              <span className="text-lg text-slate-400 font-accent">PLN</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest ml-auto font-accent font-medium">brutto</span>
            </div>
          ) : (
            <div className="relative h-10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative px-6 py-1.5 bg-slate-800/80 rounded-lg border border-white/5">
                  <span className="text-slate-400 font-accent font-medium text-xs tracking-widest uppercase">
                    Niedostępny
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
