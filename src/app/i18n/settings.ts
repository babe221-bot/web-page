
export const languages = ['sr', 'en'];
export const fallbackLng = 'sr';

export function getOptions(lng = fallbackLng, ns = 'common') {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: fallbackLng,
    lng,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns,
  };
}
