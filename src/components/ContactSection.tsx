import React, { useState } from 'react';
import { 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL,
  FACEBOOK_URL,
  getWhatsAppUrl,
  COMPANY_NAME,
  COMPANY_SLOGAN,
  COMPANY_TAGLINE,
  MAIN_OFFICE,
  DISPLAY_PRIMARY_WHATSAPP
} from '../utils/whatsapp';
import { FacebookIcon } from './FacebookIcon';
import { MapPin, Phone, MessageCircle, Instagram, Send, CheckCircle2, Clock, Heart } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Atendimento e Financiamento MCMV',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const textMsg = `Olá, Realiza Imobiliária!\nMensagem enviada pelo site:\n\n- Nome: ${form.name}\n- E-mail: ${form.email || 'Não informado'}\n- WhatsApp: ${form.phone}\n- Assunto: ${form.subject}\n- Mensagem: ${form.message}`;
    
    setTimeout(() => {
      window.open(getWhatsAppUrl(textMsg), '_blank');
    }, 600);
  };

  return (
    <section id="contato" className="py-24 bg-[#F5F7F5] border-t border-[#E5EBE5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3ECF47] uppercase bg-[#E8F8E9] px-3.5 py-1.5 rounded-full border border-[#3ECF47]/30">
            <Heart className="w-4 h-4 text-[#3ECF47] fill-current" />
            Canais de Atendimento
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#1A1A1A]">
            Fale com a {COMPANY_NAME}
          </h2>
          <p className="text-sm text-[#4A4A4A]/80 max-w-xl mx-auto">
            Atendimento presencial em Nova Iguaçu e atendimento online ágil no WhatsApp.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E5EBE5] shadow-sm mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-[#F5F7F5] text-[#3ECF47] rounded-full border border-[#3ECF47]/30">
              {COMPANY_TAGLINE}
            </span>
            <h3 className="text-xl font-bold text-[#1A1A1A]">{MAIN_OFFICE.name}</h3>
            <p className="text-xs text-[#4A4A4A]/80 flex items-start gap-1.5 pt-1">
              <MapPin className="w-4 h-4 text-[#3ECF47] shrink-0 mt-0.5" />
              <span>{MAIN_OFFICE.address}</span>
            </p>
          </div>

          <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#E5EBE5] pt-4 md:pt-0 md:pl-6 text-xs text-[#4A4A4A]/80">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#3ECF47]" />
              <span>WhatsApp: <strong className="text-[#1A1A1A]">{DISPLAY_PRIMARY_WHATSAPP}</strong></span>
            </p>
            <p className="flex items-start gap-2 pt-1">
              <Clock className="w-4 h-4 text-[#3ECF47] shrink-0 mt-0.5" />
              <span>{MAIN_OFFICE.hours}</span>
            </p>
          </div>

          <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#E5EBE5] pt-4 md:pt-0 md:pl-6">
            <a
              href={getWhatsAppUrl(`Olá, Realiza Imobiliária! Gostaria de tirar dúvidas no WhatsApp.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D] font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Iniciar Conversa no WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5EBE5] shadow-md space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1A1A1A]">
                Envie uma Mensagem Direta
              </h3>
              <p className="text-xs text-[#4A4A4A]/70 mt-1">
                Preencha o formulário e fale diretamente com a {COMPANY_NAME}.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold text-emerald-950">Mensagem Encaminhada!</h4>
                <p className="text-xs text-emerald-800">
                  Redirecionando para o WhatsApp da {COMPANY_NAME}...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Celular / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(21) 99999-9999"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">E-mail (Opcional)</label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Assunto de Interesse</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                  >
                    <option value="Atendimento e Financiamento MCMV">Atendimento e Financiamento MCMV</option>
                    <option value="Simular do Saldo do FGTS + Subsídio">Simular do Saldo do FGTS + Subsídio</option>
                    <option value="Quero Cadastrar / Vender meu Imóvel">Quero Cadastrar / Vender meu Imóvel</option>
                    <option value="Lançamentos em Nova Iguaçu">Lançamentos em Nova Iguaçu</option>
                    <option value="Outros Assuntos">Outros Assuntos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] uppercase mb-1">Sua Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Escreva sua mensagem..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#F5F7F5] border border-[#E5EBE5] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#3ECF47]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem para o WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E3D3D] text-white p-8 rounded-3xl shadow-xl space-y-6 border border-[#3ECF47]/30">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
                <Instagram className="w-5 h-5 text-[#3ECF47]" />
                Siga nas Redes Sociais
              </h3>

              <div className="space-y-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                >
                  <div className="p-3 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-xl">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">{INSTAGRAM_HANDLE}</span>
                    <span className="text-xs text-white/70">Novidades e imóveis</span>
                  </div>
                </a>

                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                >
                  <div className="p-3 bg-[#1877F2] text-white rounded-xl">
                    <FacebookIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Facebook</span>
                    <span className="text-xs text-white/70">Acompanhe a Realiza</span>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs text-white/80">
                <p className="font-bold text-white">{COMPANY_SLOGAN}</p>
                <p className="text-[11px] text-[#3ECF47] font-medium pt-1 uppercase tracking-wide">{COMPANY_TAGLINE}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
