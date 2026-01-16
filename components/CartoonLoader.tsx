"use client"

import Lottie from "lottie-react"
import animationData from "@/public/lottie/loading.json"

export default function CartoonLoader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop
        style={{ width: 250, height: 250 }}
      />
    </div>
  )
}