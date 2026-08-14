import React from 'react';
import { Home, Building2, Store } from 'lucide-react';
import { COMPANY_SLOGAN, COMPANY_TAGLINE } from '../utils/whatsapp';

const highlights = [
  {
    icon: Home,
    title: 'Casas',
    description: 'Opções para moradia e investimento',
  },
  {
    icon: Building2,
    title: 'Apartamentos',
    description: 'Do lançamento ao pronto para morar',
  },
  {
    icon: Store,
    title: 'Imóveis Comerciais',
    description: 'Espaços para o seu negócio crescer',
  },
];

export const BrandHighlightStrip: React.FC = () => {
  return (
    <section className="relative bg-[#F5F7F5] border-b border-[#E5EBE5] py-10 sm:py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E3D3D]/5 via-transparent to-[#3ECF47]/10 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <p className="text-sm sm:text-base font-heading font-extrabold text-[#0E3D3D]">
            {COMPANY_SLOGAN}
          </p>
          <p className="text-xs uppercase tracking-widest text-[#3ECF47] font-bold">
            {COMPANY_TAGLINE}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-[#E5EBE5] shadow-sm p-5 sm:p-6 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0E3D3D] text-[#3ECF47] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[#1A1A1A] text-sm sm:text-base">
                  {title}
                </h3>
                <p className="text-xs text-[#4A4A4A]/80 mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
