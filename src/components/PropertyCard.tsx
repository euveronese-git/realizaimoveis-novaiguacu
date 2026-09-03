import React from 'react';
import { Property, CATEGORY_LABELS } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { Heart, BedDouble, Bath, Car, Maximize2, MessageCircle, Eye, MapPin, Building2, Sparkles } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const whatsappUrl = getPropertyWhatsAppUrl(property.title, property.code, property.price, property.neighborhood);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E5EBE5] flex flex-col group">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0E3D3D]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Category & Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-[#3ECF47] text-[#0E3D3D] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {CATEGORY_LABELS[property.category] || property.category}
          </span>

          {property.featuredBadge && (
            <span className="bg-[#3ECF47] text-[#0E3D3D] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {property.featuredBadge}
            </span>
          )}
        </div>

        {/* Property Code */}
        <span className="absolute top-3 right-12 bg-black/70 backdrop-blur-md text-amber-100 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/20">
          {property.code}
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all z-10 ${
            isFavorite 
              ? 'bg-[#3ECF47] text-[#0E3D3D] shadow-md scale-110' 
              : 'bg-black/50 backdrop-blur-md text-amber-50 hover:text-white hover:bg-black/70'
          }`}
          title={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div>
            <span className="text-[10px] text-amber-100 uppercase font-semibold tracking-widest block">
              {property.category === 'aluguel' ? 'Valor Locação' : 'Valor Estimado'}
            </span>
            <p className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-sm font-heading">
              {formatCurrencyBRL(property.price)}
              {property.category === 'aluguel' && <span className="text-xs font-normal text-amber-100"> /mês</span>}
            </p>
          </div>

          {property.condoFee ? (
            <span className="text-[10px] bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-amber-100 font-medium">
              Cond: R$ {property.condoFee.toLocaleString('pt-BR')}
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Location Badge */}
          <div className="flex items-center gap-1.5 text-xs text-[#3ECF47] mb-1.5 font-bold tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#3ECF47] shrink-0" />
            <span className="truncate">{property.neighborhood}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="font-bold text-base text-[#1A1A1A] hover:text-[#3ECF47] transition-colors cursor-pointer line-clamp-2 mb-3 leading-snug font-heading"
          >
            {property.title}
          </h3>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#E5EBE5] my-3 text-xs text-[#4A4A4A]">
            <div className="flex flex-col items-center justify-center p-2 bg-[#F5F7F5] rounded-xl">
              <span className="flex items-center gap-1 font-bold text-[#1A1A1A]">
                <BedDouble className="w-3.5 h-3.5 text-[#0E3D3D]" />
                {property.bedrooms}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#4A4A4A]/70">Quartos</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-[#F5F7F5] rounded-xl">
              <span className="flex items-center gap-1 font-bold text-[#1A1A1A]">
                <Bath className="w-3.5 h-3.5 text-[#0E3D3D]" />
                {property.bathrooms}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#4A4A4A]/70">Banheiros</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-[#F5F7F5] rounded-xl">
              <span className="flex items-center gap-1 font-bold text-[#1A1A1A]">
                <Car className="w-3.5 h-3.5 text-[#0E3D3D]" />
                {property.parkingSpaces}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#4A4A4A]/70">Vagas</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 bg-[#F5F7F5] rounded-xl">
              <span className="flex items-center gap-1 font-bold text-[#1A1A1A]">
                <Maximize2 className="w-3.5 h-3.5 text-[#0E3D3D]" />
                {property.areaSqM}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#4A4A4A]/70">m² útil</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2 pt-1">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex items-center justify-center gap-1.5 bg-[#F5F7F5] hover:bg-[#EEEEEE] text-[#1A1A1A] font-bold text-xs py-2.5 px-3 rounded-xl border border-[#E5EBE5] transition-colors uppercase tracking-wider"
          >
            <Eye className="w-3.5 h-3.5 text-[#3ECF47]" />
            Ver Detalhes
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] font-bold text-xs py-2.5 px-3 rounded-xl uppercase tracking-wider shadow-sm transition-all duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
};
