import React from 'react'
import { BrainCircuit, Database, Network, ServerCog, Workflow, ChartNoAxesCombined } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    icon: ServerCog,
    title: "Backend Development",
    description: "Designing and building scalable APIs, service layers, authentication flows, and production-ready backend systems with Node.js and Express."
  },
  {
    icon: Network,
    title: "System Design",
    description: "Breaking down architecture, latency, scaling, caching, queues, and reliability concerns into practical technical decisions."
  },
  {
    icon: BrainCircuit,
    title: "AI Engineering",
    description: "Building retrieval-augmented generation systems, working with embeddings, vector databases, and fine-tuning oriented workflows."
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Modeling data cleanly, structuring queries sensibly, and choosing storage patterns that fit product requirements and growth."
  },
  {
    icon: ChartNoAxesCombined,
    title: "Data Analysis & ML",
    description: "Using Python, NumPy, Pandas, and scikit-learn for exploratory analysis, preprocessing, experimentation, and applied ML work."
  },
  {
    icon: Workflow,
    title: "Full-stack Delivery",
    description: "Working across backend-heavy products while still being comfortable with React and Next.js for end-to-end implementation."
  }
];

function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">Services</p>
          <h1 className="font-[family:var(--font-display)] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Backend systems, AI workflows, and full-stack delivery where it actually matters.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            I help build the technical backbone of products: APIs, services, architecture, AI features, and data-driven workflows that support real users and real scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
