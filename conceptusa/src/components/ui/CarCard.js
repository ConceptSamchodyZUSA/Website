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
      className="glass group rounded-2xl overflow-hidden cursor-pointer border border-white/5 relative"
      onClick={() => openCarModal(car)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
    >
      {/* Dynamic Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-concept-red/0 via-transparent to-concept-blue/0 group-hover:from-concept-red/10 group-hover:to-concept-blue/10 transition-colors duration-700 pointer-events-none z-10 mix-blend-screen"></div>

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
        <div className="absolute inset-0 bg-gradient-to-t from-concept-dark via-concept-dark/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700 z-10"></div>

        {/* Scanning line effect on hover */}
        <div className="absolute inset-0 w-full h-[2px] bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] z-20"></div>

        {carImages.length > 1 && (
          <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 border-white/20 text-white">
            <span className="opacity-70">📷</span> {carImages.length}
          </div>
        )}

        <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md ${car.status === 'available'
          ? 'bg-teal-500/80 border border-teal-400/50 text-white'
          : 'bg-slate-500/80 border border-slate-400/50 text-white'
          }`}>
          {car.status === 'available' ? 'Dostępny' : 'Sprzedany'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4 text-white font-heading tracking-wide group-hover:text-concept-red transition-colors">
          {car.brand} {car.model}
        </h3>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-light">
            <Calendar size={16} className="text-concept-red/70" />
            <span>{car.year}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 text-sm font-light">
            <Gauge size={16} className="text-concept-blue/70" />
            <span>{Math.round(car.mileage * 1.60934).toLocaleString()} km</span>
          </div>

          {car.engine_capacity && (
            <div className="flex items-center gap-2 text-slate-300 text-sm font-light">
              <Fuel size={16} className="text-orange-500/70" />
              <span>{car.engine_capacity}L</span>
            </div>
          )}

          {car.horsepower && (
            <div className="flex items-center gap-2 text-slate-300 text-sm font-light">
              <Zap size={16} className="text-yellow-500/70" />
              <span>{car.horsepower} KM</span>
            </div>
          )}
        </div>

        <div className="pt-5 border-t border-white/10">
          {car.status === 'available' ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-teal-400 font-heading tracking-wide">
                {car.price?.toLocaleString()}
              </span>
              <span className="text-lg text-slate-400">PLN</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest ml-auto font-medium">brutto</span>
            </div>
          ) : (
            <div className="relative h-10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative px-6 py-1.5 bg-slate-800/80 rounded-lg border border-white/5">
                  <span className="text-slate-400 font-medium text-xs tracking-widest uppercase">
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
