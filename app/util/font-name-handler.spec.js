import { expect } from 'chai'

import {
  GOOGLE_FONTS_API_CSS_URL,
  fontsData,
  normalizeFontsToLinkStyle,
  getGoogleFontsLoadURL
} from './font-name-handler'

describe('app/util/font-name-handler', () => {
  describe('#normalizeFontsToLinkStyle', () => {
    it('should return empty string if passed font name that does not exists', () => {
      expect(normalizeFontsToLinkStyle(['foo'])).to.be.empty
    })
    it('should return `Ubuntu` font name with weight options concatenated', () => {
      const ubuntu = `${fontsData['ubuntu'].name}:${fontsData['ubuntu'].weight.join(',')}`
      expect(normalizeFontsToLinkStyle(['Ubuntu'])).to.be.equal(ubuntu)
    })
    it('should return `Ubuntu` and `Armata` fonts name with weight options concatenated', () => {
      const ubuntu = `${fontsData['ubuntu'].name}:${fontsData['ubuntu'].weight.join(',')}`
      const armata = `${fontsData['armata'].name}:${fontsData['armata'].weight.join(',')}`
      expect(normalizeFontsToLinkStyle(['Ubuntu', 'Armata'])).to.be.equal(`${ubuntu}|${armata}`)
    })
    it('should return normalize font name replacing spaces into + sign', () => {
      expect(normalizeFontsToLinkStyle(['Source Sans Pro'])).to.have.string('Source+Sans+Pro')
    })
  })

  describe('#getGoogleFontsLoadURL', () => {
    it('should contains Google Web Fonts css API URL', () => {
        expect(getGoogleFontsLoadURL('Ubuntu')).to.have.string(GOOGLE_FONTS_API_CSS_URL)
    })
    it('should accepts one font name string as param', () => {
      const normalizedFontLink = normalizeFontsToLinkStyle(['Armata'])
      expect(getGoogleFontsLoadURL('Armata')).to.have.string(normalizedFontLink)
    })
    it('should accepts an array of font name strings as param', () => {
      const normalizedFontLink = normalizeFontsToLinkStyle(['Source Sans Pro', 'Merriweather Sans'])
      const url = getGoogleFontsLoadURL(['Source Sans Pro', 'Merriweather Sans'])
      expect(url).to.have.string(normalizedFontLink)
    })
  })
})