import type { Property } from '../types';
import { normalizeProperties } from './loadProperties';

const GITHUB_CONTENTS =
  'https://api.github.com/repos/euveronese-git/realizaimoveis-novaiguacu/contents/content/properties';

type GitHubContentItem = {
  name: string;
  download_url: string | null;
  type: string;
};

async function fetchPropertiesFromGitHub(): Promise<Property[]> {
  const listRes = await fetch(GITHUB_CONTENTS, {
    cache: 'no-store',
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  if (!listRes.ok) {
    throw new Error(`GitHub contents ${listRes.status}`);
  }

  const items = (await listRes.json()) as GitHubContentItem[] | { message?: string };
  if (!Array.isArray(items)) {
    throw new Error('GitHub contents not a list');
  }

  const files = items.filter(
    (item) => item.type === 'file' && item.name.endsWith('.json') && Boolean(item.download_url)
  );

  const raw = await Promise.all(
    files.map(async (file) => {
      const res = await fetch(file.download_url as string, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`GitHub file ${file.name} ${res.status}`);
      }
      return res.json();
    })
  );

  return normalizeProperties(raw);
}

async function fetchPropertiesFromStaticJson(): Promise<Property[]> {
  const res = await fetch('/data/properties.json', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`properties.json ${res.status}`);
  }
  const next = normalizeProperties(await res.json());
  if (next.length === 0) {
    throw new Error('properties.json empty');
  }
  return next;
}

export async function loadLiveProperties(): Promise<Property[]> {
  try {
    const fromGitHub = await fetchPropertiesFromGitHub();
    if (fromGitHub.length > 0) return fromGitHub;
  } catch {
    // Fall through to the build-time JSON file.
  }

  return fetchPropertiesFromStaticJson();
}
