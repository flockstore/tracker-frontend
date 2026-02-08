import { getCarrierLogo } from '../../lib/utils/carrierLogo'

describe('Carrier Logo Utility', () => {
    it('should return correct path for known carriers', () => {
        expect(getCarrierLogo('coordinadora_co')).toBe('/carrier/coordinadora_co.svg')
        expect(getCarrierLogo('interrapidisimo_co')).toBe('/carrier/interrapidisimo_co.svg')
        expect(getCarrierLogo('servientrega_co')).toBe('/carrier/servientrega_co.svg')
    })

    it('should handle case insensitivity', () => {
        expect(getCarrierLogo('Coordinadora_CO')).toBe('/carrier/coordinadora_co.svg')
    })

    it('should return null for unknown carriers', () => {
        expect(getCarrierLogo('unknown_carrier')).toBeNull()
        expect(getCarrierLogo('')).toBeNull()
    })
})
