'use client'

import { columns } from '@/components/product/ProductColumn';
import { DataTable } from '@/components/custom ui/DataTable';
import Loader from '@/components/custom ui/Loader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  const [loading, setLoading] =  useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getProducts = async()=>{
    try{
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }catch(err){
      console.log('[GetProducts_err]',err);
    }
  }

  useEffect(() =>{
    getProducts();
  },[]);

  return loading ? <Loader/> : (
    <div className='w-full flex flex-col px-12 py-5'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='text-4xl text-gray-600 font-semibold'>Products</h1>
        <Button className='bg-blue-500 gap-2' onClick={()=> router.push('/products/new')}>
          <Plus className='h-4 w-4'/>
          New Product
        </Button>
      </div>

      <Separator className='bg-gray-500 my-4'/>

      <DataTable columns={columns} data={products} searchKey='title'/>
    </div>
  )
}

export default page
