import React, { useState } from 'react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { SellOrRentFormData, BuyOrFindFormData, PropertyType } from '../types';
import { 
  Home, 
  CheckSquare, 
  Square, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  DollarSign, 
  Key, 
  Search,
  Sparkles,
  Heart,
  BadgePercent,
  Calculator
} from 'lucide-react';

export const InteractiveFormsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vender' | 'comprar'>('comprar');

  // Form 1 State: Cadastrar / Vender Imóvel
  const [sellForm, setSellForm] = useState<SellOrRentFormData>({
    intentions: { vender: true, alugar: false },
    name: '',
    email: '',
    mobile: '',
    phone: '',
    address: '',
    neighborhood: 'Nova Iguaçu',
    city: 'Rio de Janeiro',
    uf: 'RJ',
    notes: ''
  });

  // Form 2 State: Simulação MCMV & Encontrar Imóvel
  const [buyForm, setBuyForm] = useState<BuyOrFindFormData>({
    intentions: { comprar: true, alugar: false },
    subType: 'mcmv',
    name: '',
    email: '',
    mobile: '',
    grossIncome: '3500',
    hasFgts: true,
    propertyType: 'apartamento',
    city: 'Rio de Janeiro',
    neighborhood: 'Nova Iguaçu',
    bedrooms: '2',
    maxPrice: '250000',
    paymentMethod: 'mcmv',
    notes: ''
  });

  const [sellSubmitted, setSellSubmitted] = useState(false);
  const [buySubmitted, setBuySubmitted] = useState(false);

  // Submit Handler: Cadastrar Imóvel
  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSellSubmitted(true);

    const msg = `Olá, Realiza Imobiliária!\nGostaria de cadastrar meu imóvel para VENDA/AVALIAÇÃO com a Realiza Imobiliária:\n\n` +
      `👤 *Proprietário:* ${sellForm.name}\n` +
      `📧 *E-mail:* ${sellForm.email || 'Não informado'}\n` +
      `📱 *WhatsApp:* ${sellForm.mobile}\n` +
      `📞 *Telefone Fix:* ${sellForm.phone || 'N/A'}\n\n` +
      `📍 *Endereço do Imóvel:* ${sellForm.address}\n` +
      `🏙️ *Bairro/Cidade:* ${sellForm.neighborhood}, ${sellForm.city} - ${sellForm.uf}\n` +
      `📝 *Observações:* ${sellForm.notes || 'Nenhuma'}\n\n` +
      `Aguardando contato para avaliação sem compromisso!`;

    setTimeout(() => {
      window.open(getWhatsAppUrl(msg), '_blank');
    }, 600);
  };

  // Submit Handler: Simulação e Busca MCMV
  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBuySubmitted(true);

    const subTypeLabel = buyForm.subType === 'mcmv' 
      ? 'Minha Casa Minha Vida (Lançamento)' 
      : buyForm.subType === 'pronto' 
      ? 'Imóvel Pronto p/ Morar' 
      : 'Geral / Outros';

    const msg = `Olá, Realiza Imobiliária! Gostaria de uma CONSULTORIA & SIMULAÇÃO GRATUITA no site da Realiza Imobiliária:\n\n` +
      `👤 *Cliente:* ${buyForm.name}\n` +
      `📧 *E-mail:* ${buyForm.email || 'Não informado'}\n` +
      `📱 *WhatsApp:* ${buyForm.mobile}\n` +
      `💰 *Renda Familiar Estimada:* R$ ${Number(buyForm.grossIncome || 0).toLocaleString('pt-BR')}\n` +
      `🏦 *Possui FGTS:* ${buyForm.hasFgts ? 'SIM' : 'NÃO'}\n\n` +
      `🏠 *Interesse do Imóvel:*\n` +
      `- Perfil: ${subTypeLabel}\n` +
      `- Tipo: ${buyForm.propertyType.toUpperCase()}\n` +
      `- Localização de Preferência: ${buyForm.neighborhood}, ${buyForm.city}\n` +
      `- Mínimo Dormitórios: ${buyForm.bedrooms}\n` +
      `- Valor Estimado: até R$ ${Number(buyForm.maxPrice || 0).toLocaleString('pt-BR')}\n` +
      `- Observações: ${buyForm.notes || 'Nenhuma'}\n\n` +
      `Aguardo sua análise para verificar meu subsídio e valor de entrada!`;

    setTimeout(() => {
      window.open(getWhatsAppUrl(msg), '_blank');
    }, 600);
  };

  return (
    <section id="captacao" className="py-20 bg-[#F5F7F5] border-y border-[#E5EBE5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3ECF47] uppercase bg-[#E8F8E9] px-3.5 py-1.5 rounded-full border border-[#3ECF47]/30">
            <Heart className="w-4 h-4 text-[#3ECF47] fill-current" />
            Atendimento Personalizado & Análise de Crédito
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1A1A1A]">
            Simule seu Financiamento ou Anuncie seu Imóvel
          </h2>
          <p className="text-sm text-[#4A4A4A]/80 max-w-2xl mx-auto leading-relaxed">
            Seja para encontrar o lançamento Minha Casa Minha Vida ideal ou cadastrar seu imóvel para venda com a Realiza Imobiliária, oferecemos orientação transparente do início ao fim.
          </p>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-[#E5EBE5] shadow-sm flex max-w-lg w-full">
            <button
              onClick={() => {
                setActiveTab('comprar');
                setBuySubmitted(false);
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'comprar'
                  ? 'bg-[#3ECF47] text-[#0E3D3D] shadow-md'
                  : 'text-[#4A4A4A] hover:text-[#3ECF47] hover:bg-[#F5F7F5]'
              }`}
            >
              <Calculator className="w-4 h-4" />
              1. Simular / Encontrar Imóvel
            </button>

            <button
              onClick={() => {
                setActiveTab('vender');
                setSellSubmitted(false);
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'vender'
                  ? 'bg-[#3ECF47] text-[#0E3D3D] shadow-md'
                  : 'text-[#4A4A4A] hover:text-[#3ECF47] hover:bg-[#F5F7F5]'
              }`}
            >
              <Key className="w-4 h-4" />
              2. Cadastrar / Vender Imóvel
            </button>
          </div>
        </div>

        {/* Main Form Container Card */}
        <div className="bg-white rounded-3xl border border-[#E5EBE5] shadow-xl overflow-hidden max-w-4xl mx-auto">
          
          {/* TAB 1: SIMULAÇÃO & BUSCA DE IMÓVEL */}
          {activeTab === 'comprar' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div className="border-b border-[#E5EBE5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2 font-heading">
                    <Search className="w-5 h-5 text-[#3ECF47]" />
                    Formulário: Análise Gratuita de Crédito & Financiamento
                  </h3>
                  <p className="text-xs text-[#4A4A4A]/70 mt-1">
                    Defina seu perfil para a Realiza Imobiliária simular seu subsídio e valor de entrada.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#3ECF47] bg-[#E8F8E9] px-3 py-1 rounded-full border border-[#3ECF47]/30 self-start sm:self-auto">
                  Sem Compromisso
                </span>
              </div>

              {buySubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-950">Solicitação Enviada!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Redirecionando para o WhatsApp oficial da Realiza Imobiliária...
                  </p>
                  <button
                    onClick={() => setBuySubmitted(false)}
                    className="mt-4 bg-[#3ECF47] text-[#0E3D3D] font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl hover:bg-[#0E3D3D]"
                  >
                    Enviar Outra Simulação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBuySubmit} className="space-y-6">
                  
                  {/* Subtype Profile */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                      1. Qual seu objetivo principal? *
                    </label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
                      <label 
                        onClick={() => setBuyForm({ ...buyForm, subType: 'mcmv' })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                          buyForm.subType === 'mcmv' 
                            ? 'bg-[#E8F8E9] text-[#3ECF47] border-[#3ECF47] ring-2 ring-[#3ECF47]/20' 
                            : 'bg-[#F5F7F5] text-[#4A4A4A] border-[#E5EBE5]'
                        }`}
                      >
                        <BadgePercent className="w-4 h-4 text-[#3ECF47]" />
                        <span>Lançamento Minha Casa Minha Vida</span>
                      </label>

                      <label 
                        onClick={() => setBuyForm({ ...buyForm, subType: 'pronto' })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                          buyForm.subType === 'pronto' 
                            ? 'bg-[#F5F7F5] text-[#3ECF47] border-[#3ECF47] ring-2 ring-[#3ECF47]/20' 
                            : 'bg-[#F5F7F5] text-[#4A4A4A] border-[#E5EBE5]'
                        }`}
                      >
                        <Home className="w-4 h-4 text-[#3ECF47]" />
                        <span>Imóvel Pronto para Morar</span>
                      </label>

                      <label 
                        onClick={() => setBuyForm({ ...buyForm, subType: 'ambos' })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                          buyForm.subType === 'ambos' 
                            ? 'bg-amber-100/50 text-[#4A4A4A] border-[#4A4A4A]' 
                            : 'bg-[#F5F7F5] text-[#4A4A4A] border-[#E5EBE5]'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-[#3ECF47]" />
                        <span>Quero Ver Ambas as Opções</span>
                      </label>
                    </div>
                  </div>

                  {/* Income and FGTS Bar */}
                  <div className="p-4 bg-[#F5F7F5] rounded-2xl border border-[#E5EBE5] space-y-3">
                    <span className="block text-xs font-bold text-[#1A1A1A] uppercase">
                      2. Dados para Cálculo de Subsídio e Financiamento
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Renda Familiar Bruta Estimada (R$)</label>
                        <input
                          type="number"
                          step={500}
                          placeholder="Ex: 3500"
                          value={buyForm.grossIncome}
                          onChange={(e) => setBuyForm({ ...buyForm, grossIncome: e.target.value })}
                          className="w-full bg-white border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-4">
                        <label className="text-xs font-semibold text-[#4A4A4A] cursor-pointer flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={buyForm.hasFgts}
                            onChange={(e) => setBuyForm({ ...buyForm, hasFgts: e.target.checked })}
                            className="w-4 h-4 accent-[#3ECF47] rounded"
                          />
                          <span>Possuo mais de 3 anos de trabalho com saldo de FGTS</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Personal Contact Info */}
                  <div className="space-y-3 pt-2 border-t border-[#E5EBE5]">
                    <h4 className="text-xs font-bold text-[#3ECF47] uppercase tracking-wider">
                      3. Seus Dados de Contato
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Juliana Santos"
                          value={buyForm.name}
                          onChange={(e) => setBuyForm({ ...buyForm, name: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Celular / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="(21) 99999-9999"
                          value={buyForm.mobile}
                          onChange={(e) => setBuyForm({ ...buyForm, mobile: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">E-mail (Opcional)</label>
                        <input
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={buyForm.email}
                          onChange={(e) => setBuyForm({ ...buyForm, email: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Preferences */}
                  <div className="space-y-3 pt-2 border-t border-[#E5EBE5]">
                    <h4 className="text-xs font-bold text-[#3ECF47] uppercase tracking-wider">
                      4. Preferência de Região e Imóvel
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Tipo de Imóvel</label>
                        <select
                          value={buyForm.propertyType}
                          onChange={(e) => setBuyForm({ ...buyForm, propertyType: e.target.value as any })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        >
                          <option value="apartamento">Apartamento</option>
                          <option value="casa">Casa em Condomínio</option>
                          <option value="terreno">Terreno</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Bairro(s) de Preferência</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Centro, Nova Iguaçu..."
                          value={buyForm.neighborhood}
                          onChange={(e) => setBuyForm({ ...buyForm, neighborhood: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Valor Máximo Estimado</label>
                        <select
                          value={buyForm.maxPrice}
                          onChange={(e) => setBuyForm({ ...buyForm, maxPrice: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        >
                          <option value="200000">Até R$ 200.000 (MCMV)</option>
                          <option value="250000">Até R$ 250.000 (MCMV)</option>
                          <option value="350000">Até R$ 350.000</option>
                          <option value="500000">Até R$ 500.000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Observações ou Dúvidas Pessoais</label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Preciso de piscina no condomínio, ou aceita entrada parcelada..."
                        value={buyForm.notes}
                        onChange={(e) => setBuyForm({ ...buyForm, notes: e.target.value })}
                        className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                      />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full btn-primary text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Enviar Dados para Simulação Gratuita com a Realiza Imobiliária</span>
                  </button>

                </form>
              )}
            </div>
          )}

          {/* TAB 2: CADASTRAR / VENDER SEU IMÓVEL */}
          {activeTab === 'vender' && (
            <div className="p-6 sm:p-10 space-y-6">
              <div className="border-b border-[#E5EBE5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2 font-heading">
                    <Key className="w-5 h-5 text-[#3ECF47]" />
                    Formulário: Cadastrar Imóvel para Venda
                  </h3>
                  <p className="text-xs text-[#4A4A4A]/70 mt-1">
                    Anuncie seu imóvel com divulgação personalizada pela Realiza Imobiliária.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#3ECF47] bg-[#F5F7F5] px-3 py-1 rounded-full border border-[#3ECF47]/30 self-start sm:self-auto">
                  Avaliação Sem Compromisso
                </span>
              </div>

              {sellSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-bold text-emerald-950">Dados do Imóvel Recebidos!</h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Redirecionando para o WhatsApp da Realiza Imobiliária para agendar a vistoria e avaliação...
                  </p>
                  <button
                    onClick={() => setSellSubmitted(false)}
                    className="mt-4 bg-[#3ECF47] text-[#0E3D3D] font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl hover:bg-[#0E3D3D]"
                  >
                    Enviar Outro Cadastro
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSellSubmit} className="space-y-6">
                  
                  {/* Personal Info */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#3ECF47] uppercase tracking-wider">
                      1. Informações do Proprietário
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Fernando Vasconcelos"
                          value={sellForm.name}
                          onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Celular / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="(21) 99999-9999"
                          value={sellForm.mobile}
                          onChange={(e) => setSellForm({ ...sellForm, mobile: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">E-mail (Opcional)</label>
                        <input
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={sellForm.email}
                          onChange={(e) => setSellForm({ ...sellForm, email: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-3 pt-2 border-t border-[#E5EBE5]">
                    <h4 className="text-xs font-bold text-[#3ECF47] uppercase tracking-wider">
                      2. Dados do Imóvel a Ser Avaliado
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Endereço do Imóvel *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Rua Augusto de Vasconcelos ou Estrada do Monteiro"
                          value={sellForm.address}
                          onChange={(e) => setSellForm({ ...sellForm, address: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Bairro *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Centro, Nova Iguaçu..."
                          value={sellForm.neighborhood}
                          onChange={(e) => setSellForm({ ...sellForm, neighborhood: e.target.value })}
                          className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A4A4A] mb-1">Detalhes do Imóvel / Valor Pretendido</label>
                      <textarea
                        rows={3}
                        placeholder="Informe número de quartos, vagas de garagem ou valor estimado de venda..."
                        value={sellForm.notes}
                        onChange={(e) => setSellForm({ ...sellForm, notes: e.target.value })}
                        className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                      />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full btn-secondary text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Cadastrar Imóvel via WhatsApp com a Realiza Imobiliária</span>
                  </button>

                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
