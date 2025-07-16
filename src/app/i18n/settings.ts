export const fallbackLng = 'sr'
export const locales = [fallbackLng, 'en']
export const defaultNS = 'translation'
export const cookieName = 'NEXT_LOCALE'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: locales,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
