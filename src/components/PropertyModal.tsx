import React, { useState, useEffect } from 'react';
import { Property, CATEGORY_LABELS } from '../types';
import { getPropertyWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { isVideoUrl, videoPosterUrl } from '../utils/media';
import { 
  X, 
  BedDouble, 
  Bath, 
  Car, 
  Maximize2, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  Heart, 
  Calendar, 
  Calculator, 
  Building2,
  Share2,
  Check,
  ShieldCheck,
  Sparkles,
  Play
} from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenMortgage: (price: number) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenMortgage
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [visitForm, setVisitForm] = useState({ name: '', phone: '', date: '', notes: '' });
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [property?.id]);

  if (!property) return null;

  const gallery = [...property.images, ...(property.videos ?? [])];
  const activeMedia = gallery[Math.min(activeImageIndex, Math.max(gallery.length - 1, 0))] || '';
  const activeIsVideo = isVideoUrl(activeMedia);

  const whatsappUrl = getPropertyWhatsAppUrl(property.title, property.code, property.price, property.neighborhood);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmitted(true);
    const visitMsg = `Olá, Realiza Imobiliária! Gostaria de agendar uma visita presencial para o imóvel "${property.title}" (Ref: ${property.code}).\n\n- Nome: ${visitForm.name}\n- WhatsApp: ${visitForm.phone}\n- Data sugerida: ${visitForm.date}`;
    
    setTimeout(() => {
      window.open(getPropertyWhatsAppUrl(property.title, property.code, property.price, property.neighborhood) + encodeURIComponent(`\n\nAgendamento de Visita: ${visitForm.date}`), '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#0E3D3D]/80 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Card */}
      <div className="bg-white rounded-3xl border border-[#E5EBE5] w-full max-w-5xl max-h-[92vh] overflow-y-auto relative flex flex-col my-auto shadow-2xl">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-[#E5EBE5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-[#3ECF47] text-[#0E3D3D] font-mono text-xs px-3 py-1 rounded-full font-bold">
              {property.code}
            </span>
            <span className="text-xs font-bold text-[#4A4A4A] uppercase tracking-wider hidden sm:inline">
              {property.type} • {CATEGORY_LABELS[property.category] || property.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#4A4A4A] hover:text-[#3ECF47] transition-colors rounded-xl hover:bg-[#F5F7F5]"
              title="Copiar Link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 transition-colors rounded-xl hover:bg-[#F5F7F5] ${
                isFavorite ? 'text-[#3ECF47]' : 'text-[#4A4A4A] hover:text-[#3ECF47]'
              }`}
              title="Favoritar"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#4A4A4A] hover:text-[#3ECF47] transition-colors rounded-xl hover:bg-[#F5F7F5]"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] bg-[#0E3D3D] rounded-3xl overflow-hidden shadow-md">
              {activeIsVideo ? (
                <video
                  key={activeMedia}
                  src={activeMedia}
                  controls
                  playsInline
                  poster={videoPosterUrl(activeMedia)}
                  className="w-full h-full object-cover"
                >
                  Seu navegador não reproduz este vídeo.
                </video>
              ) : (
                <img
                  src={activeMedia}
                  alt={property.title}
                  className="w-full h-full object-contain transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute bottom-3 right-3 bg-black/70 text-amber-100 text-xs px-3.5 py-1 rounded-full backdrop-blur-md">
                {activeIsVideo ? 'Vídeo' : 'Foto'} {gallery.length ? activeImageIndex + 1 : 0} de {gallery.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {gallery.map((item, idx) => {
                  const itemIsVideo = isVideoUrl(item);
                  const thumbSrc = itemIsVideo ? videoPosterUrl(item) || item : item;
                  return (
                    <button
                      key={`${item}-${idx}`}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                        activeImageIndex === idx ? 'border-[#3ECF47] scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {itemIsVideo && !videoPosterUrl(item) ? (
                        <span className="w-full h-full bg-[#0E3D3D] flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-current" />
                        </span>
                      ) : (
                        <img src={thumbSrc} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      )}
                      {itemIsVideo && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-5 h-5 text-white fill-current" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Title & Price Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5EBE5]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3ECF47] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#3ECF47]" />
                <span>{property.address} - {property.neighborhood}, {property.city} - {property.state}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1A1A1A] leading-snug">
                {property.title}
              </h2>
            </div>

            <div className="bg-[#F5F7F5] p-5 rounded-3xl border border-[#E5EBE5] min-w-[240px]">
              <span className="text-[10px] text-[#4A4A4A]/70 uppercase tracking-widest font-bold block">
                {property.category === 'aluguel' ? 'Valor de Locação' : 'Valor Estimado'}
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] font-heading">
                {formatCurrencyBRL(property.price)}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-[#4A4A4A] mt-1 pt-1 border-t border-[#E5EBE5]">
                {property.condoFee && <span>Cond: R$ {property.condoFee.toLocaleString('pt-BR')}</span>}
                {property.iptuAnnual && <span>IPTU: R$ {property.iptuAnnual.toLocaleString('pt-BR')}/ano</span>}
              </div>
            </div>
          </div>

          {/* Metrics Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F5F7F5] p-4 rounded-3xl border border-[#E5EBE5]">
            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-[#E5EBE5] text-[#3ECF47]">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#4A4A4A]/70 block font-bold">Quartos</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{property.bedrooms} ({property.suites} suítes)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-[#E5EBE5] text-[#3ECF47]">
                <Bath className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#4A4A4A]/70 block font-bold">Banheiros</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{property.bathrooms} banheiros</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-[#E5EBE5] text-[#3ECF47]">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#4A4A4A]/70 block font-bold">Vagas</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{property.parkingSpaces} vagas</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="p-3 bg-white rounded-2xl border border-[#E5EBE5] text-[#3ECF47]">
                <Maximize2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#4A4A4A]/70 block font-bold">Área Útil</span>
                <span className="text-sm font-bold text-[#1A1A1A]">{property.areaSqM} m²</span>
              </div>
            </div>
          </div>

          {/* Grid Details vs WhatsApp Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Details & Features */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Description */}
              <div className="bg-white p-6 rounded-3xl border border-[#E5EBE5] space-y-3">
                <h3 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2 font-heading">
                  <Building2 className="w-5 h-5 text-[#3ECF47]" />
                  Descrição do Imóvel
                </h3>
                <p className="text-sm text-[#4A4A4A]/90 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Features Checklist */}
              <div className="bg-white p-6 rounded-3xl border border-[#E5EBE5] space-y-4">
                <h3 className="text-lg font-bold text-[#1A1A1A] font-heading">
                  Diferenciais & Infraestrutura
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#4A4A4A]">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 bg-[#F5F7F5] rounded-xl border border-[#E5EBE5]">
                      <CheckCircle2 className="w-4 h-4 text-[#3ECF47] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner: Mortgage Calculator trigger */}
              <div className="bg-[#0E3D3D] text-amber-50 p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#3ECF47]/30">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-lg text-white flex items-center justify-center sm:justify-start gap-2 font-heading">
                    <Calculator className="w-5 h-5 text-[#5EE05F]" />
                    Simular Financiamento Minha Casa Minha Vida
                  </h4>
                  <p className="text-xs text-amber-100/80">
                    Calcule parcelas e subsídio estimado Caixa para este imóvel.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenMortgage(property.price);
                  }}
                  className="btn-primary text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all shrink-0 shadow-sm"
                >
                  Simular Agora
                </button>
              </div>

            </div>

            {/* Right Col: WhatsApp CTA & Visit Form */}
            <div className="space-y-6">
              
              {/* WhatsApp Callout */}
              <div className="bg-[#E8F8E9] text-[#1A1A1A] p-6 rounded-3xl border border-[#3ECF47]/30 shadow-sm text-center space-y-4">
                <div className="inline-flex p-3 bg-[#3ECF47] text-[#0E3D3D] rounded-full shadow-md">
                  <MessageCircle className="w-8 h-8 fill-current" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-[#1A1A1A] font-heading">
                    Falar com a Realiza Imobiliária
                  </h4>
                  <p className="text-xs text-[#4A4A4A]/80">
                    Tire suas dúvidas diretamente no WhatsApp e agende sua visita.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Chamar no WhatsApp
                </a>
              </div>

              {/* Schedule Visit Form */}
              <div className="bg-white p-6 rounded-3xl border border-[#E5EBE5] shadow-sm space-y-4">
                <h4 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2 font-heading">
                  <Calendar className="w-4 h-4 text-[#3ECF47]" />
                  Agendar Visita
                </h4>

                {visitSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-emerald-950">Solicitação Enviada!</p>
                    <p className="text-[11px] text-emerald-800">
                      Abrindo WhatsApp para agendar sua visita presencial.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleVisitSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Seu Nome *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Amanda Silva"
                        value={visitForm.name}
                        onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                        className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Seu WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(21) 99999-9999"
                        value={visitForm.phone}
                        onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                        className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Data Desejada *</label>
                      <input
                        type="date"
                        required
                        value={visitForm.date}
                        onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                        className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all"
                    >
                      Solicitar Agendamento
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
