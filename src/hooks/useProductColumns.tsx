import { Button } from '@/components/ui/button';
import { useEdit } from '@/context/editContext/EditContext';
import { useProducts } from '@/hooks/useProducts';
import type { Item } from '@/types/type';
import { useNavigate } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, type ReactNode } from 'react';

const columnHelper = createColumnHelper<Item & { actions: ReactNode }>();

export const useProductColumns = () => {
  const { handleDelete } = useProducts();
  const navigate = useNavigate();
  const { setIsEdit, setEditItem } = useEdit();

  const dataKeys: (keyof Item)[] = ['id', 'name', 'category', 'gender', 'price'];

  const columns= useMemo(() => {
    const dynamicColumns = dataKeys.map(key =>
      columnHelper.accessor(key, {
        header: key.toString().toUpperCase(),
        cell: info => info.getValue(),
      })
    );

    const actionColumn = columnHelper.accessor('actions', {
      header: 'ACTIONS',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setIsEdit(true);
                setEditItem(item);
                navigate({ to: '/form' });
              }}
            >
              Edit
            </Button>
            <Button
              type="button"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    });

    return [...dynamicColumns, actionColumn];
  }, [dataKeys, handleDelete, navigate, setEditItem, setIsEdit]);

  return columns;
};
