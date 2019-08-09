import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Text, Button, Icon, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Queryset } from 'components'
import { ButtonLink } from 'components/Link'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import allUserCommunities from './query.graphql'
import { authSession } from 'services/auth'
import { toSnakeCase } from '../../utils'

const RenderText = ({ row }) => (
  <Fragment>
    <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
      {row.name}
    </Text>
    <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
      {row.description || row.city}
    </Text>
  </Fragment>
)

RenderText.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string
  })
}

const CommunityLinkModule = ({ row }) => (
   <Flexbox horizontal spacing='between'>
     <ButtonLink flat to={`/admin/${row.id}/chatbot`}>
       <Icon size={20} name='bot' />
     </ButtonLink>
     <Button
       flat
       onClick={() => {
         authSession
          .setAsyncItem('community', toSnakeCase(row))
          .then(() => {
            const baseUrl = process.env.REACT_APP_DOMAIN_ADMIN || 'http://app.bonde.devel:5001'
            window.open(baseUrl, '_self')
          })
       }}
     >
       <Icon size={20} name='window' /></Button>
   </Flexbox>
)

const columns = [
  {
    field: 'image',
    render: ImageColumn,
    props: { width: '40px' }
  },
  {
    field: 'text',
    render: RenderText
  },
  {
    field: 'id',
    render: CommunityLinkModule,
    props: { width: '150px' }
  }
]

const CommunitiesGadget = ({ t, loading, communities }) => (
  <TableCardGadget
    loading={loading}
    data={communities}
    columns={columns}
    title={t('gadgets.communities.title')}
    emptyIcon='community'
    emptyText={t('gadgets.communities.emptyText')}
  />
)

CommunitiesGadget.propTypes = {
  t: PropTypes.func,
  communities: PropTypes.any,
  loading: PropTypes.bool
}

const CommunitiesGadgetQueryset = ({ t }) => (
  <Queryset
    query={allUserCommunities}
    filter={{ orderBy: 'UPDATED_AT_DESC' }}
  >
    {({ loading, data, filter }) => (
      <CommunitiesGadget
        t={t}
        loading={loading}
        filter={filter}
        communities={data && data.allUserCommunities ? data.allUserCommunities.nodes : []}
      />
    )}
  </Queryset>
)

CommunitiesGadgetQueryset.propTypes = {
  t: PropTypes.func
}

export default CommunitiesGadgetQueryset