
export const locales = ['sr', 'en'];
export const defaultLocale = 'sr';

export function getOptions(lng = defaultLocale, ns = 'common') {
  return {
    // debug: true,
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns,
  };
}
