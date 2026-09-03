import React from 'react';
import { Property } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { X, Heart, Trash2, MessageCircle } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteProperties,
  onRemoveFavorite,
  onSelectProperty
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0E3D3D]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-[#E5EBE5] flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 bg-[#0E3D3D] text-amber-50 flex items-center justify-between border-b border-[#3ECF47]/30">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#5EE05F] fill-current" />
            <h3 className="font-bold text-lg text-white font-heading">
              Imóveis Salvos ({favoriteProperties.length})
            </h3>
          </div>
          <button onClick={onClose} className="text-amber-200/70 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-[#F5F7F5]">
          {favoriteProperties.length > 0 ? (
            favoriteProperties.map((prop) => (
              <div key={prop.id} className="bg-white p-3 rounded-2xl border border-[#E5EBE5] shadow-xs flex gap-3 relative group">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  className="w-24 h-24 object-cover rounded-xl shrink-0"
                  referrerPolicy="no-referrer"
                />
                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-mono text-[#3ECF47] font-bold block">{prop.code}</span>
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="font-bold text-sm text-[#1A1A1A] truncate cursor-pointer hover:text-[#3ECF47] font-heading"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-xs font-extrabold text-[#3ECF47] mt-0.5">
                      {formatCurrencyBRL(prop.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E5EBE5] mt-1">
                    <button
                      onClick={() => onRemoveFavorite(prop.id)}
                      className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </button>

                    <a
                      href={getPropertyWhatsAppUrl(prop.title, prop.code, prop.price, prop.neighborhood)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] bg-[#3ECF47] text-[#0E3D3D] px-2.5 py-1 font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      Contato
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-[#4A4A4A]/70 space-y-3">
              <Heart className="w-12 h-12 text-[#E5EBE5] mx-auto" />
              <p className="text-sm font-bold text-[#1A1A1A] font-heading">Nenhum imóvel salvo nos favoritos.</p>
              <p className="text-xs text-[#4A4A4A]/70 max-w-xs mx-auto">Clique no ícone de coração nos cards de imóveis para salvá-los nesta lista.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E5EBE5]">
            <a
              href={getPropertyWhatsAppUrl(`Lista de ${favoriteProperties.length} imóveis salvos nos meus favoritos`, 'FAVORITOS', 0, 'Nova Iguaçu / RJ')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Enviar Lista para Realiza Imobiliária no WhatsApp
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
