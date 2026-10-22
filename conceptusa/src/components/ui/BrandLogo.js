import React from 'react';

const BrandLogo = ({ variant = 'nav' }) => (
  <span className={`brand-lockup brand-lockup--${variant} relative`}>
    <span className="brand-lockup-copy">
      <span className="brand-wordmark relative">
        <span className="brand-wordmark-main">CONCEPT</span>
        <span className="brand-wordmark-usa">USA</span>
      </span>
      <span className="brand-tagline">Samochody z USA</span>
    </span>
  </span>
);

export default BrandLogo;
