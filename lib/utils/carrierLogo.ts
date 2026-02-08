/**
 * Gets the carrier logo path for a given courier code
 *
 * @param courier - The courier code (e.g., "coordinadora_co", "servientrega_co")
 * @returns The path to the carrier logo SVG, or null if not found
 */
export const getCarrierLogo = (courier: string): string | null => {
  const carrierLogos: Record<string, string> = {
    coordinadora_co: '/carrier/coordinadora_co.svg',
    interrapidisimo_co: '/carrier/interrapidisimo_co.svg',
    servientrega_co: '/carrier/servientrega_co.svg',
  }
  return carrierLogos[courier.toLowerCase()] || null
}
