import React from 'react';
import { MAIN_OFFICE, getWhatsAppUrl, DISPLAY_PRIMARY_WHATSAPP, COMPANY_NAME } from '../utils/whatsapp';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Heart, Calculator, Key, Sparkles } from 'lucide-react';

export const BranchesSection: React.FC = () => {
  return (
    <section id="filiais" className="py-20 bg-white border-b border-[#E5EBE5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3ECF47] uppercase bg-[#E8F8E9] px-3.5 py-1.5 rounded-full border border-[#3ECF47]/30">
            <Heart className="w-4 h-4 text-[#3ECF47] fill-current" />
            Atendimento Presencial em Nova Iguaçu
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1A1A1A]">
            Nosso Escritório e Passos da Consultoria
          </h2>
          <p className="text-sm text-[#4A4A4A]/80 max-w-2xl mx-auto leading-relaxed">
            Localizado no Centro de Nova Iguaçu, o escritório da {COMPANY_NAME} oferece atendimento próximo para casas, apartamentos e imóveis comerciais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-[#F5F7F5] p-6 rounded-3xl border border-[#E5EBE5] flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#3ECF47] text-[#0E3D3D] flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A]">Análise & Consultoria</h3>
              <p className="text-xs text-[#4A4A4A]/80 leading-relaxed">
                Entendemos o seu perfil e o que você busca — casa, apartamento ou imóvel comercial — sem compromisso.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EBE5] text-[11px] font-bold text-[#3ECF47] flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>Atendimento ágil</span>
            </div>
          </div>

          <div className="bg-[#F5F7F5] p-6 rounded-3xl border border-[#E5EBE5] flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#3ECF47] text-[#0E3D3D] flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A]">Seleção de Imóveis</h3>
              <p className="text-xs text-[#4A4A4A]/80 leading-relaxed">
                Apresentamos opções alinhadas ao seu sonho, com visitas e orientação clara em Nova Iguaçu e região.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EBE5] text-[11px] font-bold text-[#3ECF47] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visitas Acompanhadas</span>
            </div>
          </div>

          <div className="bg-[#F5F7F5] p-6 rounded-3xl border border-[#E5EBE5] flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0E3D3D] text-[#3ECF47] flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A]">Realização do Sonho</h3>
              <p className="text-xs text-[#4A4A4A]/80 leading-relaxed">
                Acompanhamento até a conclusão — porque você sonha em casa e realiza aqui.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EBE5] text-[11px] font-bold text-[#0E3D3D] flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#3ECF47]" />
              <span>Casa própria</span>
            </div>
          </div>

        </div>

        <div className="bg-[#0E3D3D] rounded-3xl overflow-hidden border border-[#3ECF47]/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 text-white">
          
          <div className="lg:col-span-5 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3ECF47] animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#3ECF47]">
                  Escritório Principal
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-heading">
                {MAIN_OFFICE.name}
              </h3>

              <div className="space-y-3 text-xs text-white/80">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#3ECF47] shrink-0 mt-0.5" />
                  <span>{MAIN_OFFICE.address}</span>
                </p>

                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#3ECF47] shrink-0" />
                  <a href={`https://wa.me/${MAIN_OFFICE.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-[#3ECF47] transition-colors">
                    {MAIN_OFFICE.phone}
                  </a>
                </p>

                <p className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#3ECF47] shrink-0 mt-0.5" />
                  <span>{MAIN_OFFICE.hours}</span>
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <a
                href={getWhatsAppUrl(`Olá, Realiza Imobiliária! Gostaria de agendar um atendimento no escritório de Nova Iguaçu.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Agendar no WhatsApp ({DISPLAY_PRIMARY_WHATSAPP})</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(MAIN_OFFICE.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/20"
              >
                <ExternalLink className="w-4 h-4 text-[#3ECF47]" />
                <span>Abrir Rota no Google Maps</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-80 lg:h-auto min-h-[320px] bg-[#0E3D3D] relative">
            <iframe
              title="Mapa Realiza Imobiliária Nova Iguaçu"
              src={MAIN_OFFICE.mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

        </div>

      </div>
    </section>
  );
};
