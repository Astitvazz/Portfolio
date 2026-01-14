"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -60])

  const descOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1])
  const descY = useTransform(scrollYProgress, [0.4, 0.8], [60, 0])

  return (
    <section ref={containerRef} className="h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute flex flex-col md:flex-row items-center gap-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I'm Astitva
          </h1>

          <div className="h-64 w-64 rounded-2xl bg-muted flex items-center justify-center">
            <Avatar className="h-40 w-40 md:h-56 md:w-56">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: descOpacity, y: descY }}
          className="absolute max-w-3xl text-center"
        >
          <h2 className="font-bold text-4xl mb-6">
            About Me
          </h2>

          <p className="text-xl leading-relaxed text-muted-foreground">
            I'm a full-stack developer who enjoys building scalable systems,
            clean UI, and thoughtful digital experiences. I care deeply
            about code quality and user-centric design.
          </p>
        </motion.div>

      </div>
    </section>
  )
}