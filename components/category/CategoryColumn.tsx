"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<CategoryType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({row})=> <Link href={`/categories/${row.original._id}`} className="hover:text-red-500">{row.original.title}</Link>
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({row})=> <p>{row.original.products?.length}</p>
    },
    {
      id: 'action',
      cell: ({row})=> <Delete id={row.original._id}/> ,
    },
  ] 