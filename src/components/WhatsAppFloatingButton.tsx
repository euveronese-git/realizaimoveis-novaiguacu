import React, { useState, useEffect } from 'react';
import { getWhatsAppUrl, DISPLAY_PRIMARY_WHATSAPP, COMPANY_NAME } from '../utils/whatsapp';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
      {showTooltip && (
        <div className="bg-[#0E3D3D] text-white px-3.5 py-2.5 rounded-2xl shadow-xl border border-[#3ECF47]/40 flex items-center gap-2.5 max-w-[250px]">
          <div className="text-[11px] leading-tight">
            <span className="font-bold block text-[#3ECF47] uppercase tracking-wider">{COMPANY_NAME}</span>
            <span className="text-white/80">Fale conosco pelo WhatsApp</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/50 hover:text-white p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={getWhatsAppUrl(`Olá, Realiza Imobiliária! Vim pelo site e gostaria de atendimento.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-12 h-12 sm:w-14 sm:h-14 bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(62,207,71,0.45)] transition-transform duration-300 hover:scale-110 animate-whatsapp-pulse"
        aria-label="Contato via WhatsApp"
        title={`Falar com a ${COMPANY_NAME} (${DISPLAY_PRIMARY_WHATSAPP})`}
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#0E3D3D] border-2 border-white rounded-full" />
      </a>
    </div>
  );
};
