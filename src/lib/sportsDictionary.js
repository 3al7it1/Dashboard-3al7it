/**
 * Normalizes any text string:
 * - Trims whitespace
 * - Converts to lowercase
 * - Strips diacritics / accents (e.g. é -> e)
 * - Normalizes hyphens & underscores to space
 * - Collapses repeated whitespace
 */
export function normalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Universal Sports Dictionary
 * Single Source of Truth for sports synonyms, canonical labels, and allowed search terms.
 */
export const SPORTS_DICTIONARY = {
  boxe: {
    canonical: 'Boxe',
    synonyms: ['boxe', 'boxing', 'boxeur', 'combat boxe']
  },
  football: {
    canonical: 'Football',
    synonyms: ['football', 'foot', 'soccer', 'calcio', 'ballon rond']
  },
  basketball: {
    canonical: 'Basketball',
    synonyms: ['basketball', 'basket', 'bball', 'nba']
  },
  mma: {
    canonical: 'MMA',
    synonyms: ['mma', 'ufc', 'combat', 'combats', 'mixed martial arts', 'arts martiaux']
  },
  'sports auto': {
    canonical: 'Sports Auto',
    synonyms: [
      'sports auto',
      'sport auto',
      'motorsport',
      'motorsports',
      'f1',
      'formula 1',
      'formule 1',
      'racing',
      'auto',
      'automobile',
      'course auto',
      'rallye'
    ]
  },
  tennis: {
    canonical: 'Tennis',
    synonyms: ['tennis', 'atp', 'wta', 'wimbledon', 'roland garros']
  }
};

export const GENERAL_DICTIONARY = {
  music: {
    canonical: 'Music',
    synonyms: ['music', 'musique', 'chanson', 'rap', 'hip hop']
  },
  films_series: {
    canonical: 'Films & Séries',
    synonyms: ['films series', 'films & series', 'cinema', 'films', 'series', 'movies']
  },
  automobile: {
    canonical: 'Automobile',
    synonyms: ['automobile', 'auto', 'cars', 'voiture', 'vehicule']
  },
  art_design: {
    canonical: 'Art & Design',
    synonyms: ['art design', 'art & design', 'art', 'design', 'abstrait']
  },
  motivation: {
    canonical: 'Motivation',
    synonyms: ['motivation', 'quotes', 'citation', 'mindset', 'succes']
  }
};

export const ALL_DICTIONARY = {
  ...GENERAL_DICTIONARY,
  ...SPORTS_DICTIONARY
};

export function getCanonicalSport(term) {
  const norm = normalize(term);
  if (!norm) return 'Sports';

  for (const key of Object.keys(SPORTS_DICTIONARY)) {
    const entry = SPORTS_DICTIONARY[key];
    const allMatches = [key, normalize(entry.canonical), ...entry.synonyms.map(normalize)];
    if (allMatches.includes(norm)) {
      return entry.canonical;
    }
  }

  return term.charAt(0).toUpperCase() + term.slice(1);
}

export function getAllowedTermsForTab(activeTab) {
  const normTab = normalize(activeTab);
  if (!normTab) return [];

  for (const key of Object.keys(SPORTS_DICTIONARY)) {
    const entry = SPORTS_DICTIONARY[key];
    const allMatches = [key, normalize(entry.canonical), ...entry.synonyms.map(normalize)];
    if (allMatches.includes(normTab)) {
      return Array.from(new Set(allMatches));
    }
  }

  for (const key of Object.keys(ALL_DICTIONARY)) {
    const entry = ALL_DICTIONARY[key];
    const allMatches = [key, normalize(entry.canonical), ...entry.synonyms.map(normalize)];
    if (allMatches.includes(normTab)) {
      return Array.from(new Set(allMatches));
    }
  }

  return [normTab];
}

export function matchesTab(product, activeTab) {
  if (!product) return false;

  const normTab = normalize(activeTab);
  if (!normTab || normTab === 'tous' || normTab === 'all' || normTab === 'الكل') {
    return true;
  }

  const allowedTerms = getAllowedTermsForTab(activeTab);
  const subVal = normalize(product.subcategory);
  const discVal = normalize(product.discipline || product.nested_sport || product.sports_sub);

  const matchesSub = !!subVal && allowedTerms.includes(subVal);
  const matchesDisc = !!discVal && allowedTerms.includes(discVal);

  return matchesSub || matchesDisc;
}
