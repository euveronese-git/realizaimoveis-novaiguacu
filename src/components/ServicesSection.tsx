import React from 'react';
import {
  Building2,
  Tag,
  Key,
  FileText,
  Scale,
  ClipboardCheck,
  ClipboardList,
} from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Administração de Imóveis e Condomínios',
  },
  {
    icon: Tag,
    title: 'Venda',
  },
  {
    icon: Key,
    title: 'Locação',
  },
  {
    icon: FileText,
    title: 'Escritura',
  },
  {
    icon: Scale,
    title: 'Legalização',
  },
  {
    icon: ClipboardCheck,
    title: 'Avaliação de Imóveis',
  },
  {
    icon: ClipboardList,
    title: 'Laudo de Vistoria Predial',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicos" className="py-16 md:py-24 bg-[#F5F7F5] border-b border-[#E5EBE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3ECF47] uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#3ECF47]/30">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A1A1A]">
            Soluções completas em administração imobiliária
          </h2>
          <p className="text-sm text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
            Da administração de condomínios à venda e locação, oferecemos serviços integrados com transparência e profissionalismo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5EBE5] hover:shadow-md hover:border-[#3ECF47]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3ECF47]/10 flex items-center justify-center mb-4 group-hover:bg-[#3ECF47]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#3ECF47]" />
                </div>
                <h3 className="font-heading font-semibold text-[#1A1A1A] text-sm leading-snug">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
