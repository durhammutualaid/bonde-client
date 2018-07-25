import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TableRow from './TableRow'
import TableCell from './TableCell'
import { Scrollbox } from '../../'

const Table = styled.div`{
  display: table;
  width: 100%;
  border-collapse: collapse;
}`

Table.displayName = 'Table'

const TableBody = styled.div`{
  display: table-row-group;
}`

TableBody.displayName = 'TableBody'

const TableBodyCell = TableCell.extend`
  padding: 13px 15px 14px 15px;
  vertical-align: middle;
  text-align: inherit;
`

TableBodyCell.displayName = 'TableBodyCell'

const ReactTable = ({
  data,
  columns,
  border,
  margin,
  ColumnComponent,
  HeaderComponent,
  EmptyComponent,
  FooterComponent
}) => {

  const empty = data.length === 0

  return !empty ? (
    <Scrollbox margin={margin}>
      <Table>
        {HeaderComponent && <HeaderComponent columns={columns} />}
        <TableBody>
          {data.map(row => (
            <TableRow border={border} key={Math.random()}>
            {columns.map(col => (
              <ColumnComponent key={Math.random()}>
                {col.render
                  ? col.render({ value: row[col.field], row })
                  : row[col.field]}
              </ColumnComponent>
            ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Scrollbox>
  ) :  <EmptyComponent />
}

ReactTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  ColumnComponent: PropTypes.any,
  EmptyComponent: PropTypes.any,
  HeaderComponent: PropTypes.any
}

ReactTable.defaultProps = {
  border: false,
  data: [],
  ColumnComponent: TableBodyCell
}

ReactTable.displayName = 'Table'

export default ReactTable
