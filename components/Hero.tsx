"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import FeaturedProject from "./FeaturedProject"
import { apiUrl } from "@/lib/api"
import MotionReveal from "@/components/MotionReveal"
import { MotionStagger, MotionStaggerItem } from "@/components/MotionStagger"

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

const proofStats = [
  { value: "Node", label: "Backend-first engineering mindset" },
  { value: "AI", label: "RAG, vector search, and applied ML" },
  { value: "Scale", label: "System design and production thinking" },
]

export default function Hero() {
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProject = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(apiUrl('/api/projects/featured/project'))

        if (!response.ok) {
          throw new Error('Failed to fetch featured project')
        }

        const data = await response.json()
        setFeaturedProject(data)
      } catch (err) {
        console.error('Error fetching featured project:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProject()
  }, [])

  const transformedProject = featuredProject ? {
    title: featuredProject.title,
    description: featuredProject.description,
    techStack: featuredProject.tags,
    media: featuredProject.media.length > 0
      ? featuredProject.media
          .sort((a, b) => a.order - b.order)
          .map((m) => ({
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
  } : null

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.12),_transparent_26%)]" />
      <div className="pointer-events-none absolute left-[8%] top-32 h-40 w-40 rounded-full bg-primary/15 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute right-[10%] top-52 h-52 w-52 rounded-full bg-emerald-400/12 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl space-y-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <MotionStagger className="space-y-8">
            <MotionStaggerItem>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-primary"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Backend engineer based in India
              </motion.div>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <div className="space-y-6">
                <h1 className="max-w-4xl font-[family:var(--font-display)] text-5xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
                  Building reliable backend systems with product, AI, and scale in mind.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  I work primarily with Node.js and Express to build APIs, services, and system-level foundations,
                  while staying comfortable with React and Next.js when a project needs full-stack ownership.
                  I also build AI systems with RAG pipelines, vector databases, fine-tuning workflows, and Python-based data analysis.
                </p>
              </div>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-7 shadow-[0_12px_30px_rgba(99,102,241,0.18)] transition-transform hover:-translate-y-0.5">
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7 transition-transform hover:-translate-y-0.5">
                  <Link href="/blogs">Read Blogs</Link>
                </Button>
              </div>
            </MotionStaggerItem>

            <MotionStagger className="grid gap-4 sm:grid-cols-3" delay={0.15}>
              {proofStats.map((stat) => (
                <MotionStaggerItem key={stat.label}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-3xl border border-border/70 bg-background/70 p-5 shadow-sm backdrop-blur"
                  >
                    <p className="font-[family:var(--font-display)] text-3xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </MotionStagger>

          <MotionReveal className="relative" delay={0.2} y={36}>
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-emerald-400/15 blur-3xl" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-background/80 p-6 shadow-[0_25px_100px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-card/80 dark:shadow-[0_24px_90px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                    Profile Snapshot
                  </p>
                  <p className="text-sm text-muted-foreground">Backend, AI, systems, and full-stack execution</p>
                </div>
                <Avatar className="h-16 w-16 ring-4 ring-primary/10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-muted/60 p-5">
                  <p className="text-sm text-muted-foreground">Current focus</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    Backend architecture, AI engineering, and data-driven product systems.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/70 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Stack</p>
                    <p className="mt-3 text-base font-medium text-foreground">Node.js, Express, Python, Next.js, MongoDB</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Approach</p>
                    <p className="mt-3 text-base font-medium text-foreground">Systems thinking with practical product execution</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </MotionReveal>
        </div>

        <MotionReveal className="space-y-8" delay={0.08}>
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
              Featured project
            </p>
            <h2 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              A closer look at the kind of systems-backed product work I enjoy shipping.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Not just a UI showcase. The goal is to show how architecture, engineering, and product thinking come together in real builds.
            </p>
          </div>

          {isLoading && (
            <div className="w-full max-w-6xl animate-pulse space-y-4">
              <div className="h-8 w-1/3 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="h-64 rounded bg-gray-200" />
            </div>
          )}

          {error && (
            <div className="rounded-[2rem] border border-border/70 bg-background/80 p-8 text-center shadow-sm">
              <p className="text-red-500">Failed to load featured project</p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            </div>
          )}

          {!isLoading && !error && transformedProject && (
            <FeaturedProject {...transformedProject} />
          )}

          {!isLoading && !error && !transformedProject && (
            <p className="text-muted-foreground">No featured project available</p>
          )}
        </MotionReveal>
      </div>
    </section>
  )
}
