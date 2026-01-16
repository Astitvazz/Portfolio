"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40])

  const descOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const descY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0])

  return (
    <section ref={containerRef} className="h-[180vh] md:h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-6">
        
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute flex flex-col justify-center md:flex-row items-center gap-6 md:gap-10 w-full max-w-5xl"
        >
          <div className="w-full px-4 md:p-6 md:w-1/2 ">
            <h1 className="text-3xl md:text-7xl font-bold mb-3 md:mb-4 pl-6">
              Hi, I'm Astitva
            </h1>
            <p className="text-base md:text-xl leading-relaxed text-muted-foreground md:mb-6 pl-6">
              I'm a full-stack developer who enjoys building scalable systems,
              clean UI, and thoughtful digital experiences. I care deeply
              about code quality and user-centric design.
            </p>
            <div className="hidden md:block flex pl-4">
              <Button className="m-1 w-32">View Blogs</Button>
              <Button className="m-1 w-32">Resume</Button>
            </div>
            
          </div>
          
          <div className=" h-40 w-40 md:h-60 md:w-60 md:h-64 md:w-64 rounded-2xl bg-muted flex items-center justify-center shrink-0">
            <Avatar className="h-full w-full md:h-56 md:w-56">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
          <div className="block md:hidden flex">
              <Button className="m-1 w-32">View Blogs</Button>
              <Button className="m-1 w-32">Resume</Button>
          </div>
        </motion.div>
        

        <motion.div
          style={{ opacity: descOpacity, y: descY }}
          className="absolute w-full min-h-screen flex items-center justify-center"
        >
          <h1 className=" text-5xl md:text-7xl font-bold pl-8 md:p-32 md:pl-56">
            I'm not the best but still I can build the best.......
          </h1>
        </motion.div>

      </div>
    </section>
  )
}