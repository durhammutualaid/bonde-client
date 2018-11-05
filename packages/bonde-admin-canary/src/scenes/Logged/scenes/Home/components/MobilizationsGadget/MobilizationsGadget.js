import React from 'react'
import { Icon, Link, Text, Pagination } from 'bonde-styleguide'
import { Queryset } from 'components'
import ImageColumn from '../ImageColumn'
import TableCardGadget from '../TableCardGadget'
import StatusColumn from './StatusColumn'
import Filter from './Filter'
import allUserMobilizationsQuery from './query.graphql'
import { authSession } from 'services/auth'

const columns = [
  { field: 'image', render: ImageColumn, props: { width: '40px' } },
  {
    field: 'name',
    render: ({ value }) => (
      <Text fontSize={16} fontWeight={900} lineHeight={1.25}>
        {value}
      </Text>
    )
  },
  {
    field: 'community',
    render: ({ value }) => (
      <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
        {value.name}
      </Text>
    )
  },
  { field: 'status', render: StatusColumn },
  {
    field: 'score',
    render: ({ value }) => (
      <Text fontSize={13} lineHeight={1.54} color='#4a4a4a'>
        {value || '–'}
      </Text>
    )
  },
  {
    field: 'id',
    render: ({ value }) => (
      <Link to={`/admin/mobilizations/${value}`}>
        <Icon name='angle-right' />
      </Link>
    )
  }
]

const MobilizationList = ({
  t,
  loading,
  mobilizations,
  filter,
  onChangeFilter,
  pageIndex,
  onChangePage,
  pageTotal
}) => (
  <TableCardGadget
    border
    loading={loading}
    data={mobilizations}
    columns={columns}
    title={t('gadgets.mobilizations.title')}
    emptyIcon='mobilization'
    emptyText={t('gadgets.mobilizations.emptyText')}
    renderFilter={() => <Filter filter={filter} onChange={onChangeFilter} />}
    pageIndex={pageIndex}
    pageTotal={pageTotal}
    onClickRow={row => {
      authSession
        .setAsyncItem('community', row.community)
        .then(() => {
          const baseUrl = process.env.REACT_APP_ADMIN_URL || 'http://app.bonde.devel:5001'
          window.open(`${baseUrl}/mobilizations/${row.id}/edit`, '_blank')
        })
    }}
    renderPagination={() => (
      <Pagination
        pageIndex={pageIndex}
        pages={pageTotal}
        onChangePage={onChangePage}
      />
    )}
  />
)

const MobilizationsGadgetQueryset = ({ t }) => {
  const limit = 20
  return (
    <Queryset
      query={allUserMobilizationsQuery}
      limit={limit}
      filter={{ orderBy: 'UPDATED_AT_DESC' }}
    >
      {({ loading, data, filter, onChangeFilter, pageIndex, onChangePage }) => {

        const pageTotal = data && data.allUserMobilizations
          ? Math.ceil(data.allUserMobilizations.totalCount / limit)
          : null

        return (
          <MobilizationList
            t={t}
            filter={filter}
            onChangeFilter={onChangeFilter}
            pageIndex={pageIndex}
            onChangePage={onChangePage}
            loading={loading}
            mobilizations={data && data.allUserMobilizations ? data.allUserMobilizations.nodes : []}
            pageTotal={pageTotal}
          />
        )
      }}
    </Queryset>
  )
}

export default MobilizationsGadgetQueryset
