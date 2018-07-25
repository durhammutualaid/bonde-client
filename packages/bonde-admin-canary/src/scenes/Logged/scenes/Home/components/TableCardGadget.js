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
  HeaderComponent
}) => (
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
      {loading ? <p>Loading...</p> : ( 
        <Table
          border={border}
          data={data}
          columns={columns}
          margin={renderPagination ? { bottom: 25 } : undefined}
          HeaderComponent={HeaderComponent}
          EmptyComponent={() => (
            <ListEmpty
              iconColorfulName={emptyIcon}
              text={emptyText}
            />
          )}
        /> 
      )}
      {renderPagination && (
        <div
          style={{
            textAlign: 'right',
            position: 'absolute',
            bottom: '-7px',
            right: 0
          }}
        >
          {renderPagination()}
        </div>
      )}
    </Flexbox>
  </Gadget>
)

export default TableCardGadget
