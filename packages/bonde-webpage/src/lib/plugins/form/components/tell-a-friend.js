import React from 'react'
import { bool, object } from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { TellAFriendBase } from '../../../ux'

const FormTellAFriend = ({ preview, mobilization, widget, ...props }) => (
  <TellAFriendBase
    preview={preview}
    mobilization={mobilization}
    widget={widget}
    message={
      <FormattedMessage
        id='form-widget.components--tell-a-friend.message'
        defaultMessage='Formulário submetido com sucesso!'
      />
    }
    href={
      mobilization.custom_domain
      ? `http://${mobilization.custom_domain}`
      : `http://${mobilization.slug}.${domain}`
    }
    {...props}
  />
)

FormTellAFriend.propTypes = {
  preview: bool,
  mobilization: object.isRequired,
  widget: object.isRequired
}

export default FormTellAFriend
