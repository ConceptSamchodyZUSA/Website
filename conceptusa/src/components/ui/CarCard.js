import React, { useState } from 'react';
import { ArrowUpRight, Calendar, Gauge, Fuel, Zap } from 'lucide-react';

const CarCard = ({
  car,
  getCarImages,
  openCarModal,
  getDrivetrainIcon,
  getDrivetrainLabel
}) => {
  const carImages = getCarImages(car);
  const mainImage = carImages[0];
  const [loadedImageSrc, setLoadedImageSrc] = useState(null);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Zobacz szczegóły: ${car.brand} ${car.model}`}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 text-left shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-concept-red"
      onClick={() => openCarModal(car)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCarModal(car);
        }
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={mainImage}
          alt={`${car.brand} ${car.model}`}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.04] ${loadedImageSrc !== mainImage ? 'blur-sm grayscale' : ''
            }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoadedImageSrc(mainImage)}
        />

        {carImages.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            {carImages.length} zdjęć
          </div>
        )}

        <div className={`absolute left-3 top-3 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide backdrop-blur-md ${car.status === 'available'
          ? 'border-emerald-300/25 bg-emerald-950/75 text-emerald-200'
          : 'border-white/15 bg-slate-900/75 text-slate-300'
          }`}>
          {car.status === 'available' ? 'Dostępny' : 'Sprzedany'}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{car.year || 'USA'}</p>
            <h3 className="font-heading text-xl font-bold tracking-tight text-white transition-colors group-hover:text-red-300 sm:text-2xl">
              {car.brand} {car.model}
            </h3>
          </div>
          <ArrowUpRight size={19} className="mt-1 shrink-0 text-slate-500 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>

        <div className="mb-5 grid grid-cols-2 gap-x-3 gap-y-3 border-y border-white/[0.08] py-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar size={15} className="text-slate-500" />
            <span>{car.year}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Gauge size={15} className="text-slate-500" />
            <span>{Math.round(car.mileage * 1.60934).toLocaleString()} km</span>
          </div>

          {car.engine_capacity && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Fuel size={15} className="text-slate-500" />
              <span>{car.engine_capacity}L</span>
            </div>
          )}

          {car.horsepower && (
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Zap size={15} className="text-slate-500" />
              <span>{car.horsepower} KM</span>
            </div>
          )}
        </div>

        <div>
          {car.status === 'available' ? (
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {car.price?.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-slate-400">PLN</span>
              <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">brutto</span>
            </div>
          ) : (
            <div className="flex h-9 items-center">
              <span className="text-sm font-medium text-slate-400">Pojazd sprzedany</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
