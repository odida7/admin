"use client";

import { columns } from "@/components/category/CategoryColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@clerk/nextjs";
//import { getAuth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [categories, SetCategories] = useState([]);
  const router = useRouter()
  const {userId} = useAuth()
  

  if(!userId){
    router.push('/sign-in')
    return
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();

      SetCategories(data);
      setLoading(false);
    } catch (err) {
      console.log("[fetchCategories]", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return loading ? <Loader/> : (
    <div className="w-full flex flex-col px-12 py-5">
      
      <div className="flex items-center justify-between">
        <h1 className="text-4xl text-gray-600 font-semibold">Categories</h1>

        <Button type="button" className="bg-blue-500 gap-2" onClick={()=> router.push('/categories/new')}>
          <Plus className="h-4 w-4"/>
          New Category
        </Button>
      </div>

      <Separator className="bg-gray-500 my-4"/>

        <DataTable columns={columns} data={categories} searchKey="title" />
      
    </div>
  );
};

export default page;
