"use client"

import CartoonLoader from "@/components/CartoonLoader"

export default async function Loading() {
  console.log("LOADER RENDERED")
  await new Promise((res) => setTimeout(res, 3000))
  return( 
  
  <CartoonLoader />
  )
}