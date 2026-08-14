import React from 'react';
import { PropertyFilterState, FilterCategory } from '../types';
import { NEIGHBORHOODS_RIO } from '../data/properties';
import { Search, Home, MapPin, DollarSign, BedDouble, ArrowRight, Heart, FileText, BadgePercent, Building2 } from 'lucide-react';
import { COMPANY_NAME, COMPANY_SLOGAN, COMPANY_CITY, INSTAGRAM_QUOTES } from '../utils/whatsapp';

interface HeroProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  onSearchSubmit: () => void;
}

const CATEGORY_TABS: { value: FilterCategory; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'lancamento_mcmv', label: 'Lançamento MCMV' },
  { value: 'pronto_mcmv', label: 'Pronto para morar MCMV' },
  { value: 'alto_padrao', label: 'Médio / Alto Padrão' },
  { value: 'comercial', label: 'Imóveis comerciais' },
];

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
}) => {
  const handleCategoryClick = (category: FilterCategory) => {
    onFilterChange({ category });
  };

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
    const section = document.getElementById('imoveis');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden min-h-[90vh] flex items-center bg-[#F5F7F5]">
      
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt="Realiza Imobiliária - Nova Iguaçu"
          className="w-full h-full object-cover object-center opacity-15 filter contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7F5] via-[#F5F7F5]/90 to-[#F5F7F5]" />
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 opacity-[0.04] pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 70 L50 20 L50 70 Z" fill="#0E3D3D"/>
          <path d="M50 20 L90 70 L50 70 Z" fill="#3ECF47"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="max-w-3xl mb-10">
          
          <div className="inline-flex items-center gap-2.5 bg-[#E8F8E9] border border-[#3ECF47]/30 px-4 py-2 rounded-full text-[#3ECF47] text-xs sm:text-sm font-bold mb-6 shadow-sm">
            <Heart className="w-4 h-4 text-[#3ECF47] fill-current" />
            <span>{COMPANY_NAME} • {COMPANY_CITY}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-[#1A1A1A] leading-[1.08] mb-6 tracking-tight flex flex-wrap items-center gap-3 sm:gap-4">
            <img
              src="/assets/realiza-logo-horizontal.png"
              alt="Realiza"
              className="h-10 sm:h-14 lg:h-16 w-auto object-contain shrink-0"
            />
            <span>
              Pare de sonhar e comece a <span className="text-[#3ECF47]">realizar</span>.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-[#3ECF47] font-bold mb-4">
            {COMPANY_SLOGAN}
          </p>

          <p className="text-sm sm:text-base text-[#4A4A4A]/80 font-normal leading-relaxed mb-8 max-w-2xl">
            Casas, apartamentos e imóveis comerciais em Nova Iguaçu. Especialista em financiamento <strong className="text-[#1A1A1A]">Minha Casa Minha Vida</strong>, uso do FGTS e análise do seu perfil de crédito.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
            {INSTAGRAM_QUOTES.map((quote, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1.5 bg-white text-[#1A1A1A] text-xs font-semibold px-3.5 py-2 rounded-full border border-[#E5EBE5] shadow-xs"
              >
                {quote}
              </span>
            ))}
          </div>

        </div>

        <div className="bg-white rounded-3xl border border-[#E5EBE5] p-6 sm:p-8 max-w-5xl shadow-[0_20px_50px_rgba(62,207,71,0.08)]">
          
          <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E5EBE5] pb-4">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleCategoryClick(tab.value)}
                className={`px-3.5 sm:px-4 py-2.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase rounded-xl transition-all ${
                  filters.category === tab.value
                    ? 'bg-[#3ECF47] text-[#0E3D3D] shadow-sm'
                    : 'text-[#4A4A4A] hover:text-[#3ECF47] hover:bg-[#E8F8E9]'
                }`}
              >
                {tab.value !== 'todos' ? `✅ ${tab.label}` : tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#3ECF47]" />
                Tipo de Imóvel
              </label>
              <select
                value={filters.type}
                onChange={(e) => onFilterChange({ type: e.target.value as any })}
                className="w-full bg-[#F5F7F5] border border-[#E5EBE5] text-[#1A1A1A] rounded-xl px-3.5 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#3ECF47]"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="apartamento">Apartamentos</option>
                <option value="casa">Casas</option>
                <option value="comercial">Comerciais</option>
                <option value="cobertura">Coberturas</option>
                <option value="terreno">Terrenos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3ECF47]" />
                Bairro / Região
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
                className="w-full bg-[#F5F7F5] border border-[#E5EBE5] text-[#1A1A1A] rounded-xl px-3.5 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#3ECF47]"
              >
                {NEIGHBORHOODS_RIO.map((nb) => (
                  <option key={nb} value={nb === 'Todos os Bairros' ? '' : nb}>
                    {nb}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-[#3ECF47]" />
                Dormitórios
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ bedrooms: e.target.value === 'todos' ? 'todos' : Number(e.target.value) })}
                className="w-full bg-[#F5F7F5] border border-[#E5EBE5] text-[#1A1A1A] rounded-xl px-3.5 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#3ECF47]"
              >
                <option value="todos">Qualquer quantidade</option>
                <option value="1">1+ Quarto</option>
                <option value="2">2+ Quartos</option>
                <option value="3">3+ Quartos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#3ECF47]" />
                Valor Máximo
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                className="w-full bg-[#F5F7F5] border border-[#E5EBE5] text-[#1A1A1A] rounded-xl px-3.5 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#3ECF47]"
              >
                <option value={20000000}>Sem limite</option>
                <option value={220000}>Até R$ 220.000 (MCMV)</option>
                <option value={350000}>Até R$ 350.000</option>
                <option value={500000}>Até R$ 500.000</option>
                <option value={1000000}>Até R$ 1.000.000</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 mt-2">
              <button
                type="submit"
                className="w-full btn-primary text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Buscar Opções de Imóveis & Lançamentos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl text-[#1A1A1A]">
          <div className="bg-white p-4.5 rounded-2xl border border-[#E5EBE5] text-center shadow-xs">
            <BadgePercent className="w-6 h-6 text-[#3ECF47] mx-auto mb-1.5" />
            <span className="block text-base font-bold text-[#1A1A1A]">Entrada Baixa</span>
            <span className="text-[11px] text-[#4A4A4A]/70 uppercase font-semibold">FGTS + Subsídio</span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E5EBE5] text-center shadow-xs">
            <FileText className="w-6 h-6 text-[#3ECF47] mx-auto mb-1.5" />
            <span className="block text-base font-bold text-[#1A1A1A]">Análise Gratuita</span>
            <span className="text-[11px] text-[#4A4A4A]/70 uppercase font-semibold">Aprovação de Crédito</span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E5EBE5] text-center shadow-xs">
            <MapPin className="w-6 h-6 text-[#3ECF47] mx-auto mb-1.5" />
            <span className="block text-base font-bold text-[#1A1A1A]">Nova Iguaçu</span>
            <span className="text-[11px] text-[#4A4A4A]/70 uppercase font-semibold">Centro · RJ</span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E5EBE5] text-center shadow-xs">
            <Building2 className="w-6 h-6 text-[#3ECF47] mx-auto mb-1.5" />
            <span className="block text-base font-bold text-[#1A1A1A]">Casas & Aptos</span>
            <span className="text-[11px] text-[#4A4A4A]/70 uppercase font-semibold">+ Comerciais</span>
          </div>
        </div>

      </div>
    </section>
  );
};
