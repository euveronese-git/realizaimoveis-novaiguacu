import React from 'react';
import { Property, PropertyFilterState, PropertyType } from '../types';
import { PropertyCard } from './PropertyCard';
import { Search, SlidersHorizontal, RotateCcw, Home, Building2, Layers, LandPlot, Sparkles, Heart } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  filters: PropertyFilterState;
  onFilterChange: (filters: Partial<PropertyFilterState>) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onResetFilters: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  filters,
  onFilterChange,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onResetFilters
}) => {
  // Filter Logic
  const filteredProperties = properties.filter((prop) => {
    if (filters.category !== 'todos') {
      if (filters.category === 'comercial') {
        if (prop.category !== 'comercial' && prop.type !== 'comercial') return false;
      } else if (prop.category !== filters.category) {
        return false;
      }
    }
    // Type (casa, apartamento, etc.)
    if (filters.type !== 'todos' && prop.type !== filters.type) {
      return false;
    }
    // Neighborhood
    if (filters.neighborhood && filters.neighborhood !== '' && !prop.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
      return false;
    }
    // Max Price
    if (prop.price > filters.maxPrice) {
      return false;
    }
    // Bedrooms
    if (filters.bedrooms !== 'todos' && prop.bedrooms < filters.bedrooms) {
      return false;
    }
    // Search Term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(term);
      const matchCode = prop.code.toLowerCase().includes(term);
      const matchAddress = prop.address.toLowerCase().includes(term);
      const matchNeigh = prop.neighborhood.toLowerCase().includes(term);
      const matchDesc = prop.description.toLowerCase().includes(term);
      if (!matchTitle && !matchCode && !matchAddress && !matchNeigh && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // Sorting logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'preco-asc') return a.price - b.price;
    if (filters.sortBy === 'preco-desc') return b.price - a.price;
    if (filters.sortBy === 'area-desc') return b.areaSqM - a.areaSqM;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const propertyTypesNav: { label: string; value: 'todos' | PropertyType; icon: React.ReactNode }[] = [
    { label: 'Todos', value: 'todos', icon: <Layers className="w-4 h-4" /> },
    { label: 'Apartamentos', value: 'apartamento', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Casas', value: 'casa', icon: <Home className="w-4 h-4" /> },
    { label: 'Comerciais', value: 'comercial', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Terrenos', value: 'terreno', icon: <LandPlot className="w-4 h-4" /> },
  ];

  return (
    <section id="imoveis" className="py-20 md:py-28 bg-[#F5F7F5] border-b border-[#E5EBE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3ECF47] uppercase bg-[#E8F8E9] px-3.5 py-1.5 rounded-full border border-[#3ECF47]/30">
            <Heart className="w-4 h-4 text-[#3ECF47] fill-current" />
            Lançamentos MCMV & Imóveis Selecionados
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1A1A1A]">
            Sua Nova Casa em Nova Iguaçu e Região
          </h2>
          <p className="text-sm text-[#4A4A4A]/80 max-w-xl mx-auto">
            Confira as melhores opções com entrada facilitada, subsídio do governo e suporte completo da Realiza Imobiliária.
          </p>
        </div>

        {/* Quick Type Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {propertyTypesNav.map((item) => (
            <button
              key={item.value}
              onClick={() => onFilterChange({ type: item.value })}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                filters.type === item.value
                  ? 'bg-[#3ECF47] text-[#0E3D3D] shadow-md'
                  : 'bg-white text-[#4A4A4A] hover:text-[#3ECF47] border border-[#E5EBE5] shadow-xs'
              }`}
            >
              <span className={filters.type === item.value ? 'text-[#0E3D3D]' : 'text-[#3ECF47]'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Search, Counter & Sort Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E5EBE5] mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          
          {/* Text Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#3ECF47] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por código (ex: STL-CG101), bairro, rua..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
              className="w-full bg-[#F5F7F5] border border-[#E5EBE5] text-[#1A1A1A] pl-10 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#3ECF47]"
            />
          </div>

          {/* Results Counter */}
          <div className="text-xs text-[#4A4A4A]/80 font-medium text-center md:text-left">
            Exibindo <span className="font-extrabold text-[#1A1A1A]">{sortedProperties.length}</span> de {properties.length} opções cadastradas
          </div>

          {/* Sort Dropdown & Reset */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#3ECF47]" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-[#F5F7F5] border border-[#E5EBE5] text-[#1A1A1A] px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#3ECF47]"
            >
              <option value="relevancia">Mais Recentes</option>
              <option value="preco-asc">Menor Valor</option>
              <option value="preco-desc">Maior Valor</option>
              <option value="area-desc">Maior Área (m²)</option>
            </select>

            <button
              onClick={onResetFilters}
              className="p-2.5 text-[#4A4A4A] hover:text-[#3ECF47] bg-[#F5F7F5] hover:bg-[#EEEEEE] border border-[#E5EBE5] rounded-xl"
              title="Redefinir Filtros"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Property Grid Container */}
        {sortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favorites.includes(prop.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white p-12 rounded-3xl text-center max-w-lg mx-auto border border-[#E5EBE5] shadow-sm space-y-4">
            <div className="w-16 h-16 bg-[#E8F8E9] text-[#3ECF47] rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-heading">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-xs text-[#4A4A4A]/80">
              Não encontramos imóveis com os filtros selecionados. Fale com a Realiza Imobiliária no WhatsApp para pesquisarmos lançamentos e opções exclusivas.
            </p>
            <button
              onClick={onResetFilters}
              className="btn-primary text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-sm"
            >
              <RotateCcw className="w-4 h-4 inline-block mr-1" />
              Redefinir Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
