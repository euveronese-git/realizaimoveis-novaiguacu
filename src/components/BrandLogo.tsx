import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  lightVersion?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  lightVersion = false,
}) => {
  const sizeClasses = {
    sm: 'h-12',
    md: 'h-14 sm:h-16 lg:h-16 xl:h-[4.25rem]',
    lg: 'h-20 sm:h-24',
    xl: 'h-28 sm:h-32',
  };

  const footerSizeClasses = 'h-14 sm:h-16';

  const logoSrc = '/assets/realizaimoveis-logo.png';

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="Realiza Imobiliária - Realizando o seu sonho da casa própria"
        className={`${lightVersion ? footerSizeClasses : sizeClasses[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
};
