import React from 'react'
import {
  Footer as FooterStyled,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
import HelpButton from './HelpButton'

const Footer = ({ t }) => (
  <FooterStyled>
    <Flexbox horizontal spacing='between'>
      <Flexbox middle>
        <a
          href='http://www.bonde.org'
          title={t('footer.about')}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('footer.about')}
        </a>
        <a
          href='mailto:contato@bonde.org'
          title={t('footer.contact')}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('footer.contact')}
        </a>
      </Flexbox>
      <HelpButton>
        {t('footer.help')}
      </HelpButton>
    </Flexbox>
  </FooterStyled>
)

export default Footer
