import React from 'react';
import { SantaHat } from './ChristmasDecor';

const BrandLogo = ({ variant = 'nav' }) => (
  <span className={`brand-lockup brand-lockup--${variant} relative`}>
    <span className="brand-lockup-copy">
      <span className="brand-wordmark relative">
        <SantaHat size="xs" className="absolute -top-3.5 -left-2 z-10 -rotate-12" />
        <span className="brand-wordmark-main">CONCEPT</span>
        <span className="brand-wordmark-usa">USA</span>
        <span className="inline-block ml-1 text-sm select-none" title="Christmas Edition" aria-label="Christmas Edition">🎄</span>
      </span>
      <span className="brand-tagline">Samochody z USA</span>
    </span>
  </span>
);

export default BrandLogo;
