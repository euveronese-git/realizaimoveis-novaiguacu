import React, { useState } from 'react';
import { getWhatsAppUrl, formatCurrencyBRL } from '../utils/whatsapp';
import { X, Calculator, MessageCircle, Info, Sparkles, Heart } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  onClose: () => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 220000,
  onClose
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(30);
  const [annualRate, setAnnualRate] = useState<number>(8.16);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const totalMonths = termYears * 12;

  const monthlyInstallment = totalMonths > 0 && monthlyRate > 0
    ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  const handleSendWhatsAppSimulation = () => {
    const msg = `Olá, Realiza Imobiliária! Fiz uma simulação no site da Realiza Imobiliária:\n\n` +
      `- Valor do Imóvel: ${formatCurrencyBRL(propertyPrice)}\n` +
      `- Entrada (${downPaymentPercent}%): ${formatCurrencyBRL(downPaymentAmount)}\n` +
      `- Valor a Financiar: ${formatCurrencyBRL(loanAmount)}\n` +
      `- Prazo: ${termYears} anos (${totalMonths} parcelas)\n` +
      `- Parcela Estimada: ~${formatCurrencyBRL(monthlyInstallment)}/mês\n\n` +
      `Gostaria de solicitar minha análise de crédito e simular meu subsídio Minha Casa Minha Vida!`;
    
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#0E3D3D]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E5EBE5] w-full max-w-2xl overflow-hidden relative flex flex-col my-auto shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#0E3D3D] text-amber-50 px-6 py-5 flex items-center justify-between border-b border-[#3ECF47]/30">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-[#5EE05F]" />
            <h3 className="font-bold text-lg text-white font-heading">
              Simulador de Financiamento Realiza Imobiliária
            </h3>
          </div>
          <button onClick={onClose} className="text-amber-200/70 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="p-6 space-y-6">
          
          {/* Property Price */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
              <span>Valor do Imóvel</span>
              <span className="text-[#3ECF47] text-base font-extrabold">{formatCurrencyBRL(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={120000}
              max={1200000}
              step={10000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#3ECF47]"
            />
          </div>

          {/* Down Payment Percent */}
          <div>
            <div className="flex justify-between text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
              <span>Entrada Facilitada / FGTS ({downPaymentPercent}%)</span>
              <span className="text-[#4A4A4A] text-sm font-bold">{formatCurrencyBRL(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#3ECF47]"
            />
          </div>

          {/* Term Years & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Prazo de Financiamento</label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
              >
                <option value={15}>15 Anos (180 parcelas)</option>
                <option value={20}>20 Anos (240 parcelas)</option>
                <option value={25}>25 Anos (300 parcelas)</option>
                <option value={30}>30 Anos (360 parcelas)</option>
                <option value={35}>35 Anos (420 parcelas)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">Modalidade / Taxa de Juros</label>
              <select
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
              >
                <option value={4.25}>4.25% a.a. (MCMV Faixa 1 - Com Subsídio)</option>
                <option value={8.16}>8.16% a.a. (MCMV Faixa 2 e 3 / Pró-Cotista)</option>
                <option value={10.2}>10.2% a.a. (SBPE / Bancos Privados)</option>
              </select>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-[#F5F7F5] p-5 rounded-3xl border border-[#E5EBE5] space-y-3">
            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#3ECF47]" />
              Resultado Estimado do Financiamento
            </h4>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-2xl border border-[#E5EBE5]">
                <span className="text-[10px] text-[#4A4A4A]/70 block uppercase font-bold">Valor Financiado</span>
                <span className="text-base font-bold text-[#1A1A1A]">{formatCurrencyBRL(loanAmount)}</span>
              </div>
              <div className="bg-[#3ECF47] text-[#0E3D3D] p-3 rounded-2xl shadow-sm">
                <span className="text-[10px] text-amber-100 block uppercase font-bold">1ª Parcela Estimada</span>
                <span className="text-lg font-extrabold text-white">{formatCurrencyBRL(monthlyInstallment)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#4A4A4A]/80 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#3ECF47] shrink-0" />
              Simulação estimada. A aprovação de crédito e valor exato de subsídio dependem da avaliação oficial da Caixa Econômica Federal.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSendWhatsAppSimulation}
            className="w-full bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Enviar Simulação para a Realiza Imobiliária no WhatsApp
          </button>

        </div>
      </div>
    </div>
  );
};
