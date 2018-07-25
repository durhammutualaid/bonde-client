import React from 'react'
import { Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { Page } from 'components/PageLogged'
import { Redirect } from 'services/router'
import CreateUserTagsForm from './CreateUserTagsForm'

class Tags extends React.Component {
  render () {
    const { t, user } = this.props

    if (user.tags && user.tags.length > 0) return <Redirect to='/admin' />

    return (
      <Page bgColor='#FFFFFF'>
        <Flexbox vertical middle padding='0 26.6%'>
          <Title.H2 margin={{ bottom: 25 }} fontSize={44}>
            {`${t('greetings')}, ${user.firstName}!`}
          </Title.H2>

          <Title.H4 margin={{ bottom: 60 }} fontWeight='normal' align='center'>
            {t('explanation')}
          </Title.H4>

          <CreateUserTagsForm />
        </Flexbox>
      </Page>
    )
  }
}

export default Tags
