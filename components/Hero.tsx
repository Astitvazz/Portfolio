"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { apiUrl } from "@/lib/api"
import { Button } from "./ui/button"
import FeaturedProject from "./FeaturedProject"

interface Media {
  type: 'image' | 'video';
  url: string;
  publicId: string;
  alt?: string;
  order: number;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  slug: string;
  image: {
    url: string;
    publicId: string;
  };
  media: Media[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function Hero() {
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40])

  const descOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const descY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0])

  useEffect(() => {
    const fetchFeaturedProject = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl('/api/projects/featured/project'));
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured project');
        }
        
        const data = await response.json();
        setFeaturedProject(data);
      } catch (err) {
        console.error('Error fetching featured project:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProject();
  }, []);

  // Transform project data for FeaturedProject component
  const transformedProject = featuredProject ? {
    title: featuredProject.title,
    description: featuredProject.description,
    techStack: featuredProject.tags,
    media: featuredProject.media.length > 0 
      ? featuredProject.media
          .sort((a, b) => a.order - b.order)
          .map(m => ({
            type: m.type,
            src: m.url,
            alt: m.alt || featuredProject.title
          }))
      : [{
          type: 'image' as const,
          src: featuredProject.image.url,
          alt: featuredProject.title
        }],
    liveUrl: featuredProject.liveUrl,
    githubUrl: featuredProject.githubUrl
  } : null;

  return (
    <section ref={containerRef} className="h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
        
        {/* Hero Introduction */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex items-center justify-center px-4 pt-16 md:pt-0"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-5xl">
            <div className="w-full md:w-1/2 space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                Hi, I'm Astitva
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                I'm a full-stack developer who enjoys building scalable systems,
                clean UI, and thoughtful digital experiences. I care deeply
                about code quality and user-centric design.
              </p>
              <div className="flex gap-3 pt-2">
                <Button>View Blogs</Button>
                <Button variant="outline">Resume</Button>
              </div>
            </div>
            
            <div className="shrink-0">
              <Avatar className="h-48 w-48 md:h-64 md:w-64">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </motion.div>

        {/* Featured Project */}
        <motion.div
          style={{ opacity: descOpacity, y: descY }}
          className="absolute inset-0 flex items-center justify-center px-4 pt-16 md:pt-0"
        >
          {isLoading && (
            <div className="flex items-center justify-center">
              <div className="animate-pulse space-y-4 w-full max-w-6xl">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-red-500">Failed to load featured project</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}
          
          {!isLoading && !error && transformedProject && (
            <FeaturedProject {...transformedProject} />
          )}
          
          {!isLoading && !error && !transformedProject && (
            <div className="flex items-center justify-center">
              <p className="text-muted-foreground">No featured project available</p>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  )
}
//eytx fisc nxhx dvhi
