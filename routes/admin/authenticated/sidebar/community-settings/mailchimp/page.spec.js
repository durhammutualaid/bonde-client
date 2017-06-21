import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'
import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/community-settings/mailchimp/page'

describe('routes/admin/authenticated/sidebar/community-settings/mailchimp/page', () => {
  const props = {
    fields: {
      mailchimp_api_key: {},
      mailchimp_list_id: {},
      mailchimp_group_id: {}
    },
    location: {},
    // redux-form required props
    submit: mock.noop
  }

  it('should render without crashed', () => {
    shallowWithIntl(<Page {...props} />)
  })
})
