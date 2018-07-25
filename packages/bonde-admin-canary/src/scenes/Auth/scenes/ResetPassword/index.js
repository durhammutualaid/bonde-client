import React from 'react'
import { I18n } from 'react-i18next'
import { Query } from 'react-apollo'
import { AuthAPI } from 'services/auth'

import tokenVerify from './tokenVerify.graphql'
import CheckingToken from './CheckingToken'
import InvalidToken from './InvalidToken'
import ResetPasswordForm from './ResetPasswordForm'

export default ({ match }) => (
  <I18n ns='auth'>
  {t => {
    const token = match.params.token
    
    return (
      <Query query={tokenVerify} variables={{ token }}>
      {({ data, loading, error }) => {
        
        if (loading) return <CheckingToken t={t} />
        
        if (error) return <InvalidToken t={t} />
        
        return (
          <ResetPasswordForm
            t={t}
            token={token}
            handleSuccess={({ data }) => {
              AuthAPI.login({
                jwtToken: data.resetPasswordChangePassword.jwtToken
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
