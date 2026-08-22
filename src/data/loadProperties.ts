import type { ListingCategory, Property, PropertyType } from '../types';

const modules = import.meta.glob('../../content/properties/*.json', {
  eager: true,
}) as Record<string, { default: unknown }>;

function toStringList(value: unknown, objectKey: string): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        if (typeof record[objectKey] === 'string') {
          return record[objectKey].trim();
        }
        const first = Object.values(record).find((v) => typeof v === 'string');
        return typeof first === 'string' ? first.trim() : '';
      }
      return '';
    })
    .filter(Boolean);
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value.replace(/\s/g, '').replace(',', '.'));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function toOptionalNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const n = toNumber(value, Number.NaN);
  return Number.isFinite(n) ? n : undefined;
}

export function normalizeProperty(raw: unknown): Property | null {
  if (!raw || typeof raw !== 'object') return null;
  const p = raw as Record<string, unknown>;
  if (typeof p.id !== 'string' || !p.id.trim()) return null;

  const property: Property = {
    id: p.id.trim(),
    code: String(p.code ?? '').trim(),
    title: String(p.title ?? '').trim(),
    type: (p.type as PropertyType) || 'apartamento',
    category: (p.category as ListingCategory) || 'venda',
    price: toNumber(p.price),
    neighborhood: String(p.neighborhood ?? '').trim(),
    address: String(p.address ?? '').trim(),
    city: String(p.city ?? '').trim(),
    state: String(p.state ?? '').trim(),
    bedrooms: toNumber(p.bedrooms),
    bathrooms: toNumber(p.bathrooms),
    suites: toNumber(p.suites),
    parkingSpaces: toNumber(p.parkingSpaces),
    areaSqM: toNumber(p.areaSqM),
    featured: Boolean(p.featured),
    description: String(p.description ?? ''),
    images: toStringList(p.images, 'image'),
    features: toStringList(p.features, 'feature'),
    createdAt: String(p.createdAt ?? ''),
  };

  const condoFee = toOptionalNumber(p.condoFee);
  if (condoFee !== undefined) property.condoFee = condoFee;

  const iptuAnnual = toOptionalNumber(p.iptuAnnual);
  if (iptuAnnual !== undefined) property.iptuAnnual = iptuAnnual;

  if (typeof p.featuredBadge === 'string' && p.featuredBadge.trim()) {
    property.featuredBadge = p.featuredBadge.trim();
  }

  if (p.isMcmvEligible !== undefined) {
    property.isMcmvEligible = Boolean(p.isMcmvEligible);
  }

  const downPaymentMin = toOptionalNumber(p.downPaymentMin);
  if (downPaymentMin !== undefined) property.downPaymentMin = downPaymentMin;

  return property;
}

export function normalizeProperties(raw: unknown): Property[] {
  const list = Array.isArray(raw) ? raw : [];
  return list
    .map(normalizeProperty)
    .filter((property): property is Property => property !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const INITIAL_PROPERTIES: Property[] = normalizeProperties(
  Object.values(modules).map((mod) => mod.default)
);
