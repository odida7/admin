'use client'

import Loader from '@/components/custom ui/Loader'
import ItemForm from '@/components/product/ItemForm'
import { useEffect, useState } from 'react'


const page = ({params}:{params: {productId: string}}) => {

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<ProductType | null>(null)

  const fetchProduct = async () => {
    try{ 
      const res = await fetch(`/api/product/${params.productId}`, {
      method: 'GET',
    })
    const data = await res.json()
    setProduct(data)
    setLoading(false)

    }catch(err){
      console.log('[GetProduct_err]',err)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return loading ? <Loader/> : (
    <div className='w-full'>
      <ItemForm initialData={product}/>
    </div>
  )
}

export default page
