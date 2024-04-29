"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="hover:text-red-500"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category.map((c) => c.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",

  },
  {
    accessorKey: "expense",
    header: "Expense ($)",

  },
  {
    id: "action",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
