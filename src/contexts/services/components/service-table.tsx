import Ban from "@/assets/icons/ban.svg?react";
import CircleCheck from "@/assets/icons/circle-check.svg?react";
import ButtonIcon from "@/components/button-icon";
import Tags from "@/components/tags";
import Text from "@/components/text";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useService from "../hooks/use-service";
import type { Service } from "../models/service";

export default function ServiceTable() {
  const { data } = useService();
  const services = data?.services ?? [];

  const columnHelper = createColumnHelper<Service>();

  const columns = [
    columnHelper.accessor("name", {
      header: () => (
        <Text as="span" variant="body-sm-bold" className="text-gray-400">
          Título
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

    columnHelper.accessor("price", {
      header: () => (
        <Text as="span" variant="body-sm-bold" className="text-gray-400">
          Valor
        </Text>
      ),
      cell: (info) => (
        <Text as="span" variant="body-sm" className="text-gray-200">
          R$ {info.getValue().toFixed(2).replace(".", ",")}
        </Text>
      ),
    }),

    columnHelper.accessor("active", {
      header: () => (
        <Text as="span" variant="body-sm-bold" className="text-gray-400">
          Status
        </Text>
      ),
      cell: ({ row }) => {
        const service = row.original;
        return (
          <div className="flex items-center gap-3">
            <Tags
              variant={service.active ? "success" : "danger"}
              className="md:flex hidden"
            >
              {service.active ? "Ativo" : "Inativo"}
            </Tags>
            <Tags
              variant={service.active ? "success" : "danger"}
              icon={service.active ? CircleCheck : Ban}
              className="inline-flex md:hidden"
            />

            {/* TODO: Fazer a ação de desativar e reativar um serviço */}
            <ButtonIcon
              icon={service.active ? Ban : CircleCheck}
              variant="link"
              className="md:flex md:items-center md:gap-1 hidden cursor-pointer"
            >
              {service.active ? "Desativar" : "Reativar"}
            </ButtonIcon>
            <ButtonIcon
              icon={service.active ? Ban : CircleCheck}
              variant="link"
              className="inline-flex md:hidden  cursor-pointer"
            />
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: services,
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
                <td key={cell.id} className="py-4 pl-4">
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
