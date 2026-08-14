import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { FacebookIcon } from './FacebookIcon';
import { 
  getWhatsAppUrl, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL,
  FACEBOOK_URL,
  DISPLAY_PRIMARY_WHATSAPP,
  COMPANY_CITY,
  COMPANY_NAME,
} from '../utils/whatsapp';
import { 
  Phone, 
  Instagram, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Menu, 
  X, 
  Calculator,
  FileCheck2
} from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenEvaluation: () => void;
  onOpenMortgage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenEvaluation,
  onOpenMortgage
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', shortName: 'Início', href: '#inicio' },
    { name: 'Serviços', shortName: 'Serviços', href: '#servicos' },
    { name: 'Lançamentos & Imóveis', shortName: 'Imóveis', href: '#imoveis' },
    { name: 'Simular Financiamento', shortName: 'Simular', href: '#simulador' },
    { name: 'Cadastrar / Encontrar Imóvel', shortName: 'Cadastrar', href: '#captacao' },
    { name: 'Sobre', shortName: 'Sobre', href: '#sobre' },
    { name: 'Contato', shortName: 'Contato', href: '#contato' },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-40 transition-all duration-300">
      
      {/* Top Utility Bar */}
      <div className="bg-[#0E3D3D] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="text-[#3ECF47]">{COMPANY_NAME}</span>
            </span>

            <span className="hidden md:flex items-center gap-1 text-white/80 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#3ECF47]" />
              <span>{COMPANY_CITY}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={INSTAGRAM_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/90 hover:text-[#3ECF47] transition-colors"
              title={`Siga no Instagram ${INSTAGRAM_HANDLE}`}
            >
              <Instagram className="w-3.5 h-3.5 text-[#3ECF47]" />
              <span className="hidden sm:inline text-[11px] font-medium">{INSTAGRAM_HANDLE}</span>
            </a>

            <a 
              href={FACEBOOK_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/90 hover:text-[#3ECF47] transition-colors"
              title="Siga no Facebook"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-3.5 h-3.5 text-[#3ECF47]" />
              <span className="hidden sm:inline text-[11px] font-medium">Facebook</span>
            </a>

            <span className="text-white/20 hidden sm:inline">•</span>

            <a 
              href={getWhatsAppUrl("Olá, Realiza Imobiliária! Gostaria de atendimento via WhatsApp.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-bold text-white hover:text-[#3ECF47] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#3ECF47]" />
              <span>{DISPLAY_PRIMARY_WHATSAPP}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 lg:py-4 border-b border-[#E5EBE5]' 
            : 'bg-white py-3.5 lg:py-5 border-b border-[#E5EBE5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-4 xl:gap-6">
          
          {/* Logo — coluna esquerda no desktop */}
          <a href="#inicio" className="flex items-center shrink-0 group pr-2 lg:pr-3">
            <BrandLogo size="md" />
          </a>

          {/* Nav — coluna central no desktop (só labels curtos) */}
          <nav className="hidden lg:flex items-center justify-center flex-nowrap gap-2 xl:gap-3 min-w-0 overflow-hidden text-[#1A1A1A] font-semibold text-[11px] xl:text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                title={link.name}
                className="hover:text-[#3ECF47] transition-colors py-1 relative group whitespace-nowrap"
              >
                {link.shortName}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3ECF47] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTAs + menu mobile — coluna direita no desktop */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10 lg:justify-self-end">
            <button
              onClick={onOpenMortgage}
              className="hidden lg:inline-flex items-center gap-1.5 text-[10px] xl:text-[11px] font-bold text-[#0E3D3D] bg-[#3ECF47]/15 hover:bg-[#3ECF47] px-2.5 xl:px-3 py-1.5 rounded-xl transition-all border border-[#3ECF47]/40 whitespace-nowrap"
            >
              <Calculator className="w-3.5 h-3.5 shrink-0" />
              <span>Simular MCMV</span>
            </button>

            <button
              onClick={onOpenFavorites}
              className="relative hidden sm:inline-flex p-2.5 rounded-full text-[#1A1A1A] hover:text-[#3ECF47] hover:bg-[#F5F7F5] transition-colors border border-[#E5EBE5]"
              title="Imóveis Salvos"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3ECF47] text-[#0E3D3D] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {favoritesCount}
                </span>
              )}
            </button>

            <a
              href={getWhatsAppUrl(`Olá, Realiza Imobiliária! Gostaria de mais informações sobre os serviços.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 btn-primary text-xs font-bold uppercase tracking-wider px-3.5 xl:px-4 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Fale Conosco</span>
            </a>

            <button
              onClick={onOpenFavorites}
              className="relative sm:hidden p-2 rounded-full text-[#1A1A1A] hover:bg-[#F5F7F5]"
              title="Imóveis Salvos"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3ECF47] text-[#0E3D3D] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1A1A] focus:outline-none"
              aria-label="Alternar Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#3ECF47]" /> : <Menu className="w-6 h-6 text-[#1A1A1A]" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5EBE5] px-5 pt-4 pb-6 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#1A1A1A] hover:text-[#3ECF47] font-bold text-sm uppercase tracking-wider py-2 border-b border-[#E5EBE5]"
              >
                {link.name}
              </a>
            ))}

            <div className="flex flex-col gap-2 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMortgage();
                }}
                className="flex items-center justify-center gap-2 bg-[#3ECF47] text-[#0E3D3D] font-bold text-xs py-3 rounded-xl shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                Simulador Minha Casa Minha Vida
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEvaluation();
                }}
                className="flex items-center justify-center gap-2 bg-[#F5F7F5] text-[#0E3D3D] font-bold text-xs py-3 rounded-xl border border-[#3ECF47]/30"
              >
                <FileCheck2 className="w-4 h-4 text-[#3ECF47]" />
                Solicitar Avaliação de Imóvel
              </button>

              <a
                href={getWhatsAppUrl(`Olá, Realiza Imobiliária! Gostaria de atendimento no WhatsApp.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0E3D3D] hover:bg-[#3ECF47] hover:text-[#0E3D3D] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                WhatsApp ({DISPLAY_PRIMARY_WHATSAPP})
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
