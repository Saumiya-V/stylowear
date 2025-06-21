import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Table from '@/components/table/Table';
import type { Item } from '@/types/type';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { useProductColumns } from '@/hooks/useProductColumns';
import { useProducts } from '@/hooks/useProducts';
import { Input } from '@/components/ui/input';
import { controlsDiv, tableContainer } from '@/styles/productStyles';


const ProductTable = ()=>{
 const {data:products=[]}=useProducts()
 const columns = useProductColumns()
  const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
})
const [globalFilter,setGlobalFilter] = useState("")

const table = useReactTable<Item>({
  data:products,
  columns:columns as ColumnDef<Item,any>[],
  state:{pagination,globalFilter},
  onPaginationChange:setPagination,
  onGlobalFilterChange:setGlobalFilter,
  getCoreRowModel:getCoreRowModel(),
  getPaginationRowModel:getPaginationRowModel(),
  getFilteredRowModel:getFilteredRowModel()
})


  return (
  <div className={tableContainer}>
    <Input className='mb-5'
  type="text"
  value={globalFilter ?? ''}
  onChange={e => setGlobalFilter(e.target.value)}
  placeholder="Search for Clothes..."
/>
    <Table table={table}/>
   <div className={controlsDiv}>
      <Button  onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft/></Button>
      <span>
        {table.getState().pagination.pageIndex + 1} of {' '}
        {table.getPageCount()}
      </span>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
      <ChevronRight/>
      </Button>
    </div>
</div>

  )
}

export default ProductTable