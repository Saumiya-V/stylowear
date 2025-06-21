import { cellStyles, container, headerStyle, rowStyles, tableStlyes, theadStyle } from '@/styles/tableStyles'
import type { Item } from '@/types/type'
import { flexRender, type Table as ReactTable } from '@tanstack/react-table'

const Table = ({ table }: { table: ReactTable<Item> }) => {
    
  return (
   <div className={container}>
    <table className={tableStlyes}>
      <thead className={theadStyle}>
        {
          table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={headerStyle}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))
        }
      </thead>
      <tbody className=" text-sm">
        {
          table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={rowStyles}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={cellStyles}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  )
}

export default Table