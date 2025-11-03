import Check from "@/assets/icons/circle-check.svg?react";
import Help from "@/assets/icons/circle-help.svg?react";
import Clock from "@/assets/icons/clock-2.svg?react";
import Tags from "@/components/tags";
import Text from "@/components/text";
import { CapitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { FunctionComponent, SVGProps } from "react";
import { useMediaQuery } from "react-responsive";
import useCall from "../hooks/use-call";
import type { Call, StatusType } from "../models/call";

type StatusConfig = {
  [key in StatusType]: {
    variant: "none" | "new" | "info" | "success" | "danger";
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  };
};

const statusConfig: StatusConfig = {
  ABERTO: {
    variant: "new",
    icon: Help,
  },
  EM_ATENDIMENTO: {
    variant: "info",
    icon: Clock,
  },
  ENCERRADO: {
    variant: "success",
    icon: Check,
  },
};

export default function CallTableClient() {
  const { dataClient } = useCall();
  const desktop = useMediaQuery({ minWidth: 768 });
  const calls = dataClient?.calls ?? [];

  const columnHelper = createColumnHelper<Call>();

  const columns = [
    columnHelper.accessor("updatedAt", {
      header: () => (
        <Text
          as="span"
          variant="body-sm-bold"
          className="text-gray-400 truncate min-w-[50px] block"
        >
          Atualizado em
        </Text>
      ),
      cell: (info) => (
        <Text
          as="span"
          variant="body-sm-bold"
          className="text-gray-200 truncate min-w-[50px] block"
        >
          {new Date(info.getValue())
            .toLocaleString("pt-BR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(",", "")}
        </Text>
      ),
    }),

    columnHelper.accessor(
      (row) => ({ name: row.name, description: row.description }),
      {
        id: "titleAndService",
        header: () => (
          <Text as="span" variant="body-sm-bold" className="text-gray-400">
            Título e Serviço
          </Text>
        ),
        cell: (info) => {
          const { name, description } = info.getValue();
          return (
            <div className="flex flex-col">
              <Text
                as="span"
                variant="body-sm-bold"
                className="text-gray-200 truncate min-w-[80px] block"
              >
                {name}
              </Text>
              <Text
                as="span"
                variant="body-xs"
                className="text-gray-200 truncate min-w-[80px] block"
              >
                {description}
              </Text>
            </div>
          );
        },
      }
    ),

    ...(desktop
      ? [
          columnHelper.accessor("servicePrice", {
            header: () => (
              <Text as="span" variant="body-sm-bold" className="text-gray-400">
                Valor total
              </Text>
            ),
            cell: (info) => (
              <Text
                as="span"
                variant="body-sm"
                className="text-gray-200 truncate block min-w-[80px]"
              >
                {info.getValue().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            ),
          }),
          columnHelper.accessor("client.name", {
            header: () => (
              <Text as="span" variant="body-sm-bold" className="text-gray-400 ">
                Cliente
              </Text>
            ),
            cell: (info) => (
              <Text
                as="span"
                variant="body-sm"
                className="text-gray-200 truncate md:block min-w-[80px] "
              >
                {info.getValue()}
              </Text>
            ),
          }),
          columnHelper.accessor("technician.name", {
            header: () => (
              <Text as="span" variant="body-sm-bold" className="text-gray-400 ">
                Técnico
              </Text>
            ),
            cell: (info) => (
              <Text
                as="span"
                variant="body-sm"
                className="text-gray-200 truncate md:block min-w-[80px]"
              >
                {info.getValue()}
              </Text>
            ),
          }),
        ]
      : []),

    columnHelper.accessor((row) => ({ status: row.status }), {
      id: "status",
      header: () => (
        <Text as="span" variant="body-sm-bold" className="text-gray-400">
          Status
        </Text>
      ),
      cell: (info) => {
        const status = info.getValue().status.toUpperCase() as StatusType;
        const config = statusConfig[status];
        const icon = config.icon;
        return (
          <div className="flex items-center justify-between">
            <Tags variant={config.variant} icon={icon}>
              {desktop ? CapitalizeFirstLetter(status) : null}
            </Tags>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: calls,
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
