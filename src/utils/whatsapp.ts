export const BROKER_NAME = 'Imobiliária';
export const COMPANY_NAME = 'Realiza Imobiliária';
export const COMPANY_SLOGAN = 'Você sonha em casa e realiza aqui.';
export const COMPANY_TAGLINE = 'Realizando o seu sonho da casa própria';

export const PRIMARY_WHATSAPP_NUMBER = '5521994262029';
export const DISPLAY_PRIMARY_WHATSAPP = '(21) 99426-2029';

export const COMPANY_ADDRESS = 'R. José Moacir Nogueira, 193 - Centro, Nova Iguaçu - RJ, 26216-090';
export const COMPANY_CITY = 'Nova Iguaçu, Rio de Janeiro - RJ';

export const INSTAGRAM_HANDLE = '@realizaimobiliariaa';
export const INSTAGRAM_URL = 'https://www.instagram.com/realizaimobiliariaa/';
export const FACEBOOK_URL = 'https://www.facebook.com/realizaimobiliariaa';

export const INSTAGRAM_QUOTES = [
  '🏠 Casas, apartamentos e imóveis comerciais',
  '🔑 Você sonha em casa e realiza aqui',
  '✨ Realizando o seu sonho da casa própria'
];

export interface OfficeInfo {
  id: string;
  name: string;
  badge: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  displayWhatsapp: string;
  mapQuery: string;
  mapEmbedUrl: string;
  hours: string;
}

const OFFICE_ADDRESS = 'R. José Moacir Nogueira, 193 - Centro, Nova Iguaçu - RJ, 26216-090';
const MAP_QUERY = encodeURIComponent(OFFICE_ADDRESS);

export const MAIN_OFFICE: OfficeInfo = {
  id: 'nova-iguacu',
  name: 'Realiza Imobiliária - Nova Iguaçu',
  badge: 'Escritório de Atendimento',
  address: OFFICE_ADDRESS,
  phone: '(21) 99426-2029',
  whatsappNumber: '5521994262029',
  displayWhatsapp: '(21) 99426-2029',
  mapQuery: OFFICE_ADDRESS,
  mapEmbedUrl: `https://maps.google.com/maps?q=${MAP_QUERY}&hl=pt-BR&z=16&output=embed`,
  hours: 'Segunda a Sexta: 09:00 às 18:00 | Sábados: sob agendamento'
};

/**
 * Generates WhatsApp URL with custom message
 */
export function getWhatsAppUrl(message?: string): string {
  const defaultText = `Olá, Realiza Imobiliária! Vim pelo site e gostaria de mais informações.`;
  const text = encodeURIComponent(message || defaultText);
  return `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Generates WhatsApp URL for a specific property or MCMV launch
 */
export function getPropertyWhatsAppUrl(title: string, code: string, price: number, neighborhood: string): string {
  const formattedPrice = price > 0 ? new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(price) : 'Consulte Condições MCMV';

  const message = `Olá, Realiza Imobiliária! Tenho interesse no imóvel/lançamento "${title}" (Cód: ${code}) em ${neighborhood} no valor de ${formattedPrice}.\n\nGostaria de mais informações!`;
  return getWhatsAppUrl(message);
}

/**
 * Format currency to BRL string
 */
export function formatCurrencyBRL(value: number): string {
  if (!value || value <= 0) return 'Sob Consulta';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}
