// Consumer countries data - organized by region with dial prefixes for blocking logic

export interface ConsumerCountry {
  prefix: string;
  name: string;
  flag: string;
  isoCode: string;
}

export interface CountryRegion {
  name: string;
  countries: ConsumerCountry[];
}

// All countries organized by region
export const COUNTRY_REGIONS: CountryRegion[] = [
  {
    name: 'Europe',
    countries: [
      { prefix: '+44', name: 'United Kingdom', flag: '🇬🇧', isoCode: 'GB' },
      { prefix: '+353', name: 'Ireland', flag: '🇮🇪', isoCode: 'IE' },
      { prefix: '+33', name: 'France', flag: '🇫🇷', isoCode: 'FR' },
      { prefix: '+49', name: 'Germany', flag: '🇩🇪', isoCode: 'DE' },
      { prefix: '+34', name: 'Spain', flag: '🇪🇸', isoCode: 'ES' },
      { prefix: '+39', name: 'Italy', flag: '🇮🇹', isoCode: 'IT' },
      { prefix: '+31', name: 'Netherlands', flag: '🇳🇱', isoCode: 'NL' },
      { prefix: '+32', name: 'Belgium', flag: '🇧🇪', isoCode: 'BE' },
      { prefix: '+43', name: 'Austria', flag: '🇦🇹', isoCode: 'AT' },
      { prefix: '+41', name: 'Switzerland', flag: '🇨🇭', isoCode: 'CH' },
      { prefix: '+46', name: 'Sweden', flag: '🇸🇪', isoCode: 'SE' },
      { prefix: '+45', name: 'Denmark', flag: '🇩🇰', isoCode: 'DK' },
      { prefix: '+47', name: 'Norway', flag: '🇳🇴', isoCode: 'NO' },
      { prefix: '+358', name: 'Finland', flag: '🇫🇮', isoCode: 'FI' },
      { prefix: '+351', name: 'Portugal', flag: '🇵🇹', isoCode: 'PT' },
      { prefix: '+48', name: 'Poland', flag: '🇵🇱', isoCode: 'PL' },
      { prefix: '+420', name: 'Czech Republic', flag: '🇨🇿', isoCode: 'CZ' },
      { prefix: '+36', name: 'Hungary', flag: '🇭🇺', isoCode: 'HU' },
      { prefix: '+40', name: 'Romania', flag: '🇷🇴', isoCode: 'RO' },
      { prefix: '+30', name: 'Greece', flag: '🇬🇷', isoCode: 'GR' },
      { prefix: '+354', name: 'Iceland', flag: '🇮🇸', isoCode: 'IS' },
      { prefix: '+352', name: 'Luxembourg', flag: '🇱🇺', isoCode: 'LU' },
      { prefix: '+385', name: 'Croatia', flag: '🇭🇷', isoCode: 'HR' },
      { prefix: '+386', name: 'Slovenia', flag: '🇸🇮', isoCode: 'SI' },
      { prefix: '+421', name: 'Slovakia', flag: '🇸🇰', isoCode: 'SK' },
      { prefix: '+372', name: 'Estonia', flag: '🇪🇪', isoCode: 'EE' },
      { prefix: '+371', name: 'Latvia', flag: '🇱🇻', isoCode: 'LV' },
      { prefix: '+370', name: 'Lithuania', flag: '🇱🇹', isoCode: 'LT' },
      { prefix: '+357', name: 'Cyprus', flag: '🇨🇾', isoCode: 'CY' },
      { prefix: '+356', name: 'Malta', flag: '🇲🇹', isoCode: 'MT' },
    ],
  },
  {
    name: 'North America',
    countries: [
      { prefix: '+1', name: 'USA/Canada', flag: '🇺🇸', isoCode: 'US' },
    ],
  },
  {
    name: 'Asia Pacific',
    countries: [
      { prefix: '+61', name: 'Australia', flag: '🇦🇺', isoCode: 'AU' },
      { prefix: '+64', name: 'New Zealand', flag: '🇳🇿', isoCode: 'NZ' },
      { prefix: '+81', name: 'Japan', flag: '🇯🇵', isoCode: 'JP' },
      { prefix: '+82', name: 'South Korea', flag: '🇰🇷', isoCode: 'KR' },
      { prefix: '+86', name: 'China', flag: '🇨🇳', isoCode: 'CN' },
      { prefix: '+91', name: 'India', flag: '🇮🇳', isoCode: 'IN' },
      { prefix: '+65', name: 'Singapore', flag: '🇸🇬', isoCode: 'SG' },
      { prefix: '+60', name: 'Malaysia', flag: '🇲🇾', isoCode: 'MY' },
      { prefix: '+66', name: 'Thailand', flag: '🇹🇭', isoCode: 'TH' },
      { prefix: '+62', name: 'Indonesia', flag: '🇮🇩', isoCode: 'ID' },
      { prefix: '+63', name: 'Philippines', flag: '🇵🇭', isoCode: 'PH' },
      { prefix: '+84', name: 'Vietnam', flag: '🇻🇳', isoCode: 'VN' },
      { prefix: '+852', name: 'Hong Kong', flag: '🇭🇰', isoCode: 'HK' },
      { prefix: '+886', name: 'Taiwan', flag: '🇹🇼', isoCode: 'TW' },
      { prefix: '+92', name: 'Pakistan', flag: '🇵🇰', isoCode: 'PK' },
      { prefix: '+880', name: 'Bangladesh', flag: '🇧🇩', isoCode: 'BD' },
    ],
  },
  {
    name: 'Latin America',
    countries: [
      { prefix: '+55', name: 'Brazil', flag: '🇧🇷', isoCode: 'BR' },
      { prefix: '+52', name: 'Mexico', flag: '🇲🇽', isoCode: 'MX' },
      { prefix: '+54', name: 'Argentina', flag: '🇦🇷', isoCode: 'AR' },
      { prefix: '+57', name: 'Colombia', flag: '🇨🇴', isoCode: 'CO' },
      { prefix: '+56', name: 'Chile', flag: '🇨🇱', isoCode: 'CL' },
      { prefix: '+51', name: 'Peru', flag: '🇵🇪', isoCode: 'PE' },
      { prefix: '+58', name: 'Venezuela', flag: '🇻🇪', isoCode: 'VE' },
      { prefix: '+593', name: 'Ecuador', flag: '🇪🇨', isoCode: 'EC' },
    ],
  },
  {
    name: 'Middle East & Africa',
    countries: [
      { prefix: '+971', name: 'UAE', flag: '🇦🇪', isoCode: 'AE' },
      { prefix: '+966', name: 'Saudi Arabia', flag: '🇸🇦', isoCode: 'SA' },
      { prefix: '+972', name: 'Israel', flag: '🇮🇱', isoCode: 'IL' },
      { prefix: '+90', name: 'Turkey', flag: '🇹🇷', isoCode: 'TR' },
      { prefix: '+20', name: 'Egypt', flag: '🇪🇬', isoCode: 'EG' },
      { prefix: '+27', name: 'South Africa', flag: '🇿🇦', isoCode: 'ZA' },
      { prefix: '+254', name: 'Kenya', flag: '🇰🇪', isoCode: 'KE' },
      { prefix: '+234', name: 'Nigeria', flag: '🇳🇬', isoCode: 'NG' },
      { prefix: '+212', name: 'Morocco', flag: '🇲🇦', isoCode: 'MA' },
      { prefix: '+974', name: 'Qatar', flag: '🇶🇦', isoCode: 'QA' },
      { prefix: '+968', name: 'Oman', flag: '🇴🇲', isoCode: 'OM' },
      { prefix: '+973', name: 'Bahrain', flag: '🇧🇭', isoCode: 'BH' },
      { prefix: '+965', name: 'Kuwait', flag: '🇰🇼', isoCode: 'KW' },
    ],
  },
];

export const ALL_COUNTRIES: ConsumerCountry[] = COUNTRY_REGIONS.flatMap(r => r.countries);

export function getAllPrefixes(): string[] {
  return ALL_COUNTRIES.map(c => c.prefix);
}

export function getCountryByPrefix(prefix: string): ConsumerCountry | undefined {
  return ALL_COUNTRIES.find(c => c.prefix === prefix);
}

export function matchesPrefix(phoneNumber: string, prefix: string): boolean {
  const normalized = phoneNumber.replace(/\D/g, '');
  const prefixDigits = prefix.replace(/\D/g, '');
  return normalized.startsWith(prefixDigits);
}

export function isFromAllowedCountry(phoneNumber: string, allowedPrefixes: string[]): boolean {
  if (matchesPrefix(phoneNumber, '+44')) return true;
  return allowedPrefixes.some(prefix => matchesPrefix(phoneNumber, prefix));
}

export function isInternationalNumber(phoneNumber: string): boolean {
  const normalized = phoneNumber.replace(/\D/g, '');
  if (normalized.startsWith('44') || normalized.startsWith('0')) {
    return false;
  }
  if (phoneNumber.startsWith('+') && !phoneNumber.startsWith('+44')) {
    return true;
  }
  return true;
}

export function detectCountry(phoneNumber: string): ConsumerCountry | undefined {
  const normalized = phoneNumber.replace(/\D/g, '');
  const sortedCountries = [...ALL_COUNTRIES].sort(
    (a, b) => b.prefix.length - a.prefix.length
  );
  for (const country of sortedCountries) {
    const prefixDigits = country.prefix.replace(/\D/g, '');
    if (normalized.startsWith(prefixDigits)) {
      return country;
    }
  }
  return undefined;
}
