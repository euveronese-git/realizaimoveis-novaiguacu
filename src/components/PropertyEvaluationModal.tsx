import React, { useState } from 'react';
import { getWhatsAppUrl, COMPANY_NAME } from '../utils/whatsapp';
import { X, MessageCircle, CheckCircle2, Heart, ShieldCheck } from 'lucide-react';

interface PropertyEvaluationModalProps {
  onClose: () => void;
}

export const PropertyEvaluationModal: React.FC<PropertyEvaluationModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    intent: 'venda',
    propertyType: 'apartamento',
    neighborhood: 'Nova Iguaçu',
    address: '',
    expectedPrice: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `Olá, Realiza Imobiliária! Gostaria de cadastrar e avaliar meu imóvel para ${form.intent.toUpperCase()} na Realiza Imobiliária:\n\n- Nome: ${form.name}\n- WhatsApp: ${form.phone}\n- Tipo: ${form.propertyType}\n- Endereço/Bairro: ${form.address}, ${form.neighborhood}\n- Pretensão de Valor: R$ ${form.expectedPrice || 'A definir'}\n- Detalhes: ${form.notes || 'Nenhum'}`;
    
    setTimeout(() => {
      window.open(getWhatsAppUrl(msg), '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#0E3D3D]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E5EBE5] w-full max-w-xl overflow-hidden relative flex flex-col my-auto shadow-2xl">
        
        {/* Modal Header */}
        <div className="bg-[#0E3D3D] text-amber-50 px-6 py-5 flex items-center justify-between border-b border-[#3ECF47]/30">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#5EE05F] fill-current" />
            <h3 className="font-bold text-lg text-white font-heading">
              Avaliação & Cadastro de Imóvel
            </h3>
          </div>
          <button onClick={onClose} className="text-amber-200/70 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#4A4A4A]/80 leading-relaxed">
            Deseja vender seu imóvel em Nova Iguaçu com a <strong className="text-[#1A1A1A]">{COMPANY_NAME}</strong>? Preencha os dados abaixo para uma avaliação atenciosa e sem compromisso.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-xl text-emerald-950">Solicitação Enviada!</h4>
              <p className="text-xs text-emerald-800">
                Redirecionando você para o WhatsApp da Realiza Imobiliária...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Amanda Silva"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Seu WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(21) 99999-9999"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Objetivo da Avaliação</label>
                  <select
                    value={form.intent}
                    onChange={(e) => setForm({ ...form, intent: e.target.value })}
                    className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                  >
                    <option value="venda">Quero Vender meu Imóvel</option>
                    <option value="avaliacao">Solicitar Avaliação de Mercado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Tipo de Imóvel</label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                  >
                    <option value="apartamento">Apartamento</option>
                    <option value="casa">Casa em Condomínio</option>
                    <option value="terreno">Terreno</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Endereço / Bairro *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: R. José Moacir Nogueira - Nova Iguaçu, RJ"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Pretensão de Valor (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: R$ 250.000"
                  value={form.expectedPrice}
                  onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })}
                  className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                />
              </div>

              <div className="flex items-center gap-2 p-3.5 bg-[#E8F8E9] rounded-xl border border-[#3ECF47]/30 text-[11px] text-[#4A4A4A]">
                <ShieldCheck className="w-4 h-4 text-[#3ECF47] shrink-0" />
                <span>Atendimento discreto e de total confiança com a Realiza Imobiliária.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Falar com a Realiza Imobiliária no WhatsApp
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
