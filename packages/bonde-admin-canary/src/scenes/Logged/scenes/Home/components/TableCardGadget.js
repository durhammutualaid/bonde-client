import React from 'react'
import { Card, Flexbox2 as Flexbox, Table } from 'bonde-styleguide'
import { Gadget } from 'components'
import ListEmpty from './ListEmpty'

const TableCardGadget = ({
  title,
  loading,
  data,
  columns,
  border,
  emptyIcon,
  emptyText,
  renderFilter,
  renderPagination,
  HeaderComponent,
  pageIndex,
  pageTotal,
  onClickRow
}) => {
  const showPagination = !!(
    pageIndex !== undefined && pageTotal && pageTotal > 1 && renderPagination
  )

  return (
    <Gadget
      title={title}
      renderFilter={renderFilter}
      WrapperComponent={({ children }) => (
        <Card height='275px'>
          {children}
        </Card>
      )}
    >
      <Flexbox vertical>
        <Table
          border={border}
          data={data}
          columns={columns}
          borderBottom={showPagination}
          onClickRow={onClickRow}
          HeaderComponent={HeaderComponent}
          EmptyComponent={() => (
            <ListEmpty
              iconColorfulName={emptyIcon}
              text={emptyText}
            />
          )}
        /> 
        {showPagination && renderPagination()}
      </Flexbox>
    </Gadget>
  )
}

TableCardGadget.defaultProps = {
  data: []
}

export default TableCardGadget
