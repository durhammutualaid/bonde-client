import React from 'react'
import { Grid, Cell, Panel } from 'bonde-styleguide'
import { Gadget } from 'components'

const TrendingMobilizations = ({ t }) => (
  <Gadget title={t('gadgets.trendingMobilizations.title')} renderFilter={() => 'hello'}>
    <Grid>
      <Cell size={[3, 3]}>
        <Panel
          image='https://goo.gl/hggWmp'
          title='Cinzas dos Muros'
          description='Nossos muros têm voz, têm vida.'
          author='Por Minha Sampa'
        />
      </Cell>
      <Cell size={[3, 3]}>
        <Panel
          image='https://goo.gl/rga5rh'
          title='Temer Jamais'
          description='Bora encher a caixa de email do Temer!'
          author='Por Meu Rio'
          notitle
        />
      </Cell>
      <Cell size={[3, 3]}>
        <Panel
          image='https://goo.gl/8pydwk'
          title='Mulheres Inspiradoras'
          description='Algumas histórias precisam ser contadas.'
          author='Por Coletivo Feminista'
        />
      </Cell>
      <Cell size={[3, 3]}>
        <Panel
          image='https://goo.gl/jncGPx'
          title='Vegan Já!'
          description='Todos os seres merecem o seu respeito.'
          author='Por Go Vegan'
        />
      </Cell>
    </Grid>
  </Gadget>
)

export default TrendingMobilizations
