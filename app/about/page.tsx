'use client'

import React from 'react'
import { BrainCircuit, DatabaseZap, Network } from 'lucide-react'

const highlights = [
  {
    icon: DatabaseZap,
    title: "Backend-first engineering",
    description: "My strongest work sits around APIs, services, databases, and production systems built with Node.js and Express."
  },
  {
    icon: Network,
    title: "System design thinking",
    description: "I enjoy reasoning about scale, trade-offs, data flow, caching, reliability, and the architecture behind product decisions."
  },
  {
    icon: BrainCircuit,
    title: "AI + data depth",
    description: "I work with RAG, vector databases, fine-tuning pipelines, and Python-based data analysis and machine learning workflows."
  }
]

export default function Page() {
  return (
    <div className="page-aura min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">About me</p>
            <h1 className="max-w-4xl font-[family:var(--font-display)] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              I&apos;m a backend engineer who also understands products, systems, and intelligent software.
            </h1>
          </div>
          <div className="rounded-[2rem] border border-border/70 bg-background/80 p-6 shadow-sm">
            <p className="text-lg leading-8 text-muted-foreground">
              I&apos;m Astitva. My core strength is backend engineering with Node.js and Express, but I&apos;m also comfortable in React and Next.js when a project needs full-stack ownership.
              Alongside that, I bring system design thinking, AI engineering experience, and strong data analysis skills with Python.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-border/70 bg-background/80 p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="font-[family:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
