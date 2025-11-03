import Pen from "@/assets/icons/pen-line.svg?react";
import ButtonIcon from "@/components/button-icon";
import TagTime from "@/components/tag-time";
import Text from "@/components/text";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useTech from "../hooks/use-tech";
import type { Tech } from "../models/tech";

export default function TechTable() {
  const { data } = useTech();

  const tech = data?.user ?? [];

  const columnHelper = createColumnHelper<Tech>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => (
        <Text as="span" variant="body-sm-bold" className="text-gray-400">
          Nome
        </Text>
      ),
      cell: (info) => (
        <Text
          as="span"
          variant="body-sm-bold"
          className="text-gray-200 truncate min-w-[50px] block"
        >
          {info.getValue()}
        </Text>
      ),
    }),

    columnHelper.accessor("email", {
      header: () => (
        <Text as="span" variant="body-sm-bold" className="text-gray-400">
          E-mail
        </Text>
      ),
      cell: (info) => (
        <Text
          as="span"
          variant="body-sm"
          className="text-gray-200 truncate block min-w-[80px]"
        >
          {info.getValue()}
        </Text>
      ),
    }),

    columnHelper.accessor("availability", {
      header: () => (
        <Text as="span" variant="body-sm-bold" className="text-gray-400">
          Disponibilidade
        </Text>
      ),
      cell: (info) => {
        const values = info.getValue().slice(0, 4);
        const rest = info.getValue().slice(4).length;
        return (
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {values.map((i) => (
                <TagTime variant="read">{i}</TagTime>
              ))}
              <TagTime variant="read">+{rest}</TagTime>
            </div>
            <div className="flex items-center gap-3">
              {/* TODO: Fazer a ação de editar*/}
              <ButtonIcon icon={Pen} variant="secondary" />
            </div>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: tech,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-500">
      <table className="w-full table-fixed">
        <thead className="text-left border-b border-b-gray-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3.5 pl-4">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-500">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center px-4 py-3 border-t border-gray-500">
        <Text variant="body-sm" className="text-gray-400">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </Text>
        <div className="flex gap-2">
          <button
            className="cursor-pointer px-3 py-1 rounded border border-gray-500 text-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </button>
          <button
            className="cursor-pointer px-3 py-1 rounded border border-gray-500 text-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
