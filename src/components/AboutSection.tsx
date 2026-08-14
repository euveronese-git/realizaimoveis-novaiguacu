import React from 'react';
import { Heart, CheckCircle2, MessageCircle, Home, Building2, Store, MapPin, Key } from 'lucide-react';
import { getWhatsAppUrl, COMPANY_NAME, COMPANY_SLOGAN, COMPANY_TAGLINE, COMPANY_ADDRESS, DISPLAY_PRIMARY_WHATSAPP, COMPANY_CITY } from '../utils/whatsapp';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-[#F5F7F5] border-b border-[#E5EBE5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 relative space-y-6">
            <div className="bg-[#0E3D3D] text-white p-8 rounded-3xl shadow-xl border border-[#3ECF47]/30 relative overflow-hidden space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#3ECF47] text-[#0E3D3D] px-3 py-1 rounded-full">
                  Atendimento em Nova Iguaçu
                </span>
                <span className="text-xs font-semibold text-white/70">
                  RJ
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  {COMPANY_NAME}
                </h3>
                <p className="text-xs text-[#3ECF47] font-semibold uppercase tracking-wide">
                  {COMPANY_TAGLINE}
                </p>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                A <strong className="text-white">{COMPANY_NAME}</strong> atua com casas, apartamentos e imóveis comerciais.
                {' '}{COMPANY_SLOGAN}
              </p>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-white/80">
                <span className="block text-[11px] font-bold text-[#3ECF47] uppercase tracking-wider">
                  Escritório de Atendimento:
                </span>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#3ECF47] shrink-0 mt-0.5" />
                  <span>{COMPANY_ADDRESS}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#3ECF47] shrink-0" />
                  <span>WhatsApp: <strong>{DISPLAY_PRIMARY_WHATSAPP}</strong></span>
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/50">{COMPANY_CITY}</span>
                <Heart className="w-6 h-6 text-[#3ECF47] fill-current" />
              </div>

            </div>

            <div className="bg-[#E8F8E9] p-6 rounded-2xl border border-[#3ECF47]/30 flex items-center gap-4">
              <Heart className="w-10 h-10 text-[#3ECF47] shrink-0 fill-current" />
              <div>
                <h4 className="text-sm font-bold text-[#1A1A1A]">{COMPANY_SLOGAN}</h4>
                <p className="text-xs text-[#4A4A4A]/80">Acompanhamento próximo do primeiro contato até a realização do seu sonho.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3ECF47] uppercase bg-white px-3 py-1 rounded-full border border-[#3ECF47]/30">
                <Building2 className="w-4 h-4 text-[#3ECF47]" />
                Casas · Apartamentos · Comerciais
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1A1A1A] leading-tight">
                {COMPANY_SLOGAN}
              </h2>
            </div>

            <p className="text-sm text-[#4A4A4A]/90 leading-relaxed">
              Na <strong className="text-[#1A1A1A] font-bold">{COMPANY_NAME}</strong>, o foco é realizar o sonho da casa própria com atendimento próximo e transparente em Nova Iguaçu.
              {' '}Atuamos com <strong className="text-[#1A1A1A]">casas, apartamentos e imóveis comerciais</strong>, sempre com o compromisso: {COMPANY_TAGLINE.toLowerCase()}.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4.5 bg-white rounded-2xl border border-[#E5EBE5] space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                  <Home className="w-4 h-4 text-[#0E3D3D]" />
                  <span>Casas</span>
                </div>
                <p className="text-xs text-[#4A4A4A]/75">
                  Residências para comprar ou alugar, com suporte em toda a jornada.
                </p>
              </div>

              <div className="p-4.5 bg-white rounded-2xl border border-[#E5EBE5] space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                  <Building2 className="w-4 h-4 text-[#0E3D3D]" />
                  <span>Apartamentos</span>
                </div>
                <p className="text-xs text-[#4A4A4A]/75">
                  Do lançamento ao pronto para morar, com opções para diferentes perfis.
                </p>
              </div>

              <div className="p-4.5 bg-white rounded-2xl border border-[#E5EBE5] space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                  <Store className="w-4 h-4 text-[#0E3D3D]" />
                  <span>Imóveis Comerciais</span>
                </div>
                <p className="text-xs text-[#4A4A4A]/75">
                  Espaços comerciais para quem busca localização e oportunidade de negócio.
                </p>
              </div>

              <div className="p-4.5 bg-white rounded-2xl border border-[#E5EBE5] space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-sm text-[#1A1A1A]">
                  <Key className="w-4 h-4 text-[#0E3D3D]" />
                  <span>Sonho da Casa Própria</span>
                </div>
                <p className="text-xs text-[#4A4A4A]/75">
                  Orientação clara para você realizar o sonho de morar no seu imóvel.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href={getWhatsAppUrl(`Olá, Realiza Imobiliária! Gostaria de mais informações sobre os serviços.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Fale Conosco pelo WhatsApp</span>
              </a>

              <a
                href="#filiais"
                className="bg-[#0E3D3D] hover:bg-[#3ECF47] hover:text-[#0E3D3D] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-sm"
              >
                Conhecer Escritório em Nova Iguaçu
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
