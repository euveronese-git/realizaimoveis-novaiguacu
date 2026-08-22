export type PropertyType = 'casa' | 'apartamento' | 'cobertura' | 'comercial' | 'terreno';

/** Categorias de listagem / filtros do site */
export type ListingCategory =
  | 'lancamento_mcmv'
  | 'pronto_mcmv'
  | 'alto_padrao'
  | 'comercial'
  | 'venda'
  | 'aluguel'
  | 'lancamento';

export type FilterCategory =
  | 'todos'
  | 'lancamento_mcmv'
  | 'pronto_mcmv'
  | 'alto_padrao'
  | 'comercial';

export interface Property {
  id: string;
  code: string;
  title: string;
  type: PropertyType;
  category: ListingCategory;
  price: number;
  condoFee?: number;
  iptuAnnual?: number;
  neighborhood: string;
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  suites: number;
  parkingSpaces: number;
  areaSqM: number;
  featured: boolean;
  featuredBadge?: string;
  description: string;
  images: string[];
  videos?: string[];
  features: string[];
  createdAt: string;
  isMcmvEligible?: boolean;
  downPaymentMin?: number;
}

export interface PropertyFilterState {
  category: FilterCategory;
  type: 'todos' | PropertyType;
  neighborhood: string;
  maxPrice: number;
  bedrooms: number | 'todos';
  searchTerm: string;
  sortBy: 'relevancia' | 'preco-asc' | 'preco-desc' | 'area-desc';
}

export interface SellOrRentFormData {
  intentions: {
    vender: boolean;
    alugar: boolean;
  };
  name: string;
  email: string;
  mobile: string;
  phone: string;
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  notes: string;
}

export interface BuyOrFindFormData {
  intentions: {
    comprar: boolean;
    alugar: boolean;
  };
  subType: 'mcmv' | 'lancamento' | 'pronto' | 'ambos';
  name: string;
  email: string;
  mobile: string;
  grossIncome: string;
  hasFgts: boolean;
  propertyType: PropertyType | 'todos';
  city: string;
  neighborhood: string;
  bedrooms: string;
  maxPrice: string;
  paymentMethod: 'financiamento' | 'vista' | 'mcmv' | 'outro';
  notes: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  lancamento_mcmv: 'Lançamento MCMV',
  pronto_mcmv: 'Pronto para morar MCMV',
  alto_padrao: 'Médio / Alto Padrão',
  comercial: 'Imóveis comerciais',
  venda: 'Venda',
  aluguel: 'Aluguel',
  lancamento: 'Lançamento',
};
