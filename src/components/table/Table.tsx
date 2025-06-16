import type { Item } from '@/types/type'
import { flexRender, type Table as ReactTable } from '@tanstack/react-table'

const Table = ({ table }: { table: ReactTable<Item> }) => {
    
  return (
   <div className="min-w-full">
    <table className="min-w-full table-auto border-collapse">
      <thead className=" text-left text-sm">
        {
          table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 border-b font-semibold"
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
              className="hover:bg-gray-50 hover:text-black transition"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-3 border-b"
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