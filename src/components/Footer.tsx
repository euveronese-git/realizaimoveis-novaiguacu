import React from 'react';
import { BrandLogo } from './BrandLogo';
import { FacebookIcon } from './FacebookIcon';
import { 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL,
  FACEBOOK_URL,
  getWhatsAppUrl,
  COMPANY_NAME,
  COMPANY_SLOGAN,
  COMPANY_TAGLINE,
  MAIN_OFFICE,
  COMPANY_CITY,
} from '../utils/whatsapp';
import { MapPin, Phone, MessageCircle, Instagram, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0E3D3D] text-gray-300 pt-16 pb-12 relative overflow-hidden border-t border-[#3ECF47]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          <div className="space-y-4">
            <BrandLogo lightVersion={true} size="md" />
            <p className="text-xs text-white/70 leading-relaxed">
              {COMPANY_SLOGAN}
            </p>
            <p className="text-[11px] text-[#3ECF47] font-semibold tracking-wide uppercase">
              {COMPANY_TAGLINE}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-[#3ECF47]/40 pb-2 inline-block">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-[#3ECF47] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#3ECF47]" />
                  Início
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#3ECF47] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#3ECF47]" />
                  Serviços
                </a>
              </li>
              <li>
                <a href="#imoveis" className="hover:text-[#3ECF47] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#3ECF47]" />
                  Lançamentos & Imóveis
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-[#3ECF47] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#3ECF47]" />
                  Simular Financiamento
                </a>
              </li>
              <li>
                <a href="#captacao" className="hover:text-[#3ECF47] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#3ECF47]" />
                  Cadastrar meu Imóvel
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#3ECF47] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#3ECF47]" />
                  Sobre a Realiza
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#3ECF47] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#3ECF47]" />
                  Escritório & Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-[#3ECF47]/40 pb-2 inline-block">
              Escritório Presencial
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <span className="font-bold text-white block">{MAIN_OFFICE.name}</span>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#3ECF47] shrink-0 mt-0.5" />
                <span>{MAIN_OFFICE.address}</span>
              </p>
              <p className="flex items-center gap-1.5 pt-1">
                <Phone className="w-4 h-4 text-[#3ECF47] shrink-0" />
                <a href={`https://wa.me/${MAIN_OFFICE.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#3ECF47] transition-colors">
                  {MAIN_OFFICE.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-[#3ECF47]/40 pb-2 inline-block">
              Redes & WhatsApp
            </h4>
            <div className="space-y-3 text-xs">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#3ECF47] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#3ECF47]" />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>

              <a 
                href={FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#3ECF47] transition-colors"
              >
                <FacebookIcon className="w-4 h-4 text-[#3ECF47]" />
                <span>Facebook</span>
              </a>

              <a
                href={getWhatsAppUrl(`Olá, Realiza Imobiliária! Gostaria de consultoria no WhatsApp.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] font-extrabold text-xs uppercase px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.
          </p>
          <p>
            {COMPANY_CITY}
          </p>
        </div>

      </div>
    </footer>
  );
};
