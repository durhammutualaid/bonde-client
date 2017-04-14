import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'

import AuthSelectors from '~client/account/redux/selectors'

export default ({ dns_hosted_zone_id, ...dnsRecord }) => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.ADD_DNS_RECORD_REQUEST))
  const endpoint = `/communities/${community.id}/dns_hosted_zones/${dns_hosted_zone_id}/dns_records`
  return api
    .post(endpoint, { dns_record: dnsRecord }, { headers: credentials })
    .then(resp => {
      dispatch(createAction(t.ADD_DNS_RECORD_SUCCESS, resp.data))
      return Promise.resolve(resp.data)
    })
    .catch(ex => {
      dispatch(createAction(t.ADD_DNS_RECORD_FAILURE, ex))
      return Promise.reject(ex)
    })
}