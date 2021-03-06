import React from 'react'
import { I18n } from 'react-i18next'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import { notify } from 'components/Notification'

import { AuthAPI } from 'services/auth'
import tokenVerify from './tokenVerify.graphql'

import CheckingToken from './CheckingToken'
import InvalidToken from './InvalidToken'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = ({ match }) => (
  <I18n ns='auth'>
    {t => {
      const token = match.params.token

      return (
        <Query query={tokenVerify} variables={{ token }}>
          {({ loading, error }) => {
            if (loading) return <CheckingToken t={t} />

            if (error) return <InvalidToken t={t} />

            return (
              <ResetPasswordForm
                t={t}
                token={token}
                handleSuccess={({ data }) => {
                  const jwtToken = data.reset_password_change
                  const user = { name: jwtToken.first_name }

                  AuthAPI
                    .login({ jwtToken: jwtToken.token })
                    .then(() => {
                      notify(t('resetPassword.success', { user }))
                      // should redirect with window to rehydrate session
                      window.location.href = '/'
                    })
                }}
              />
            )
          }}
        </Query>
      )
    }}
  </I18n>
)

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  })
}

export default ResetPassword
