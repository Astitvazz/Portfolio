import Link from "next/link";
import { ArrowRight, BrainCircuit, Code2, Layers3, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";

const serviceHighlights = [
  {
    icon: Code2,
    title: "Backend Engineering",
    description: "APIs, service architecture, database modeling, and production-grade Node.js systems that hold up under growth.",
  },
  {
    icon: Layers3,
    title: "System Design",
    description: "Thinking through scale, reliability, latency, caching, and data flow with practical implementation in mind.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Data Systems",
    description: "RAG pipelines, vector stores, fine-tuning workflows, and Python-powered analysis for intelligent products.",
  },
];

const skillPreview = [
  { name: "Node.js & Express", icon: "BE", proficiency: 93 },
  { name: "System Design", icon: "SD", proficiency: 88 },
  { name: "RAG & Vector DBs", icon: "AI", proficiency: 86 },
  { name: "Python Data Stack", icon: "PY", proficiency: 90 },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
                Core profile
              </p>
              <h2 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Backend depth, system thinking, and AI engineering in one profile.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                "Backend-first thinking shaped by Node.js, Express, APIs, databases, and production concerns.",
                "AI engineering experience across RAG systems, embeddings, vector databases, and fine-tuning workflows.",
                "Strong analytical grounding with Python, NumPy, Pandas, and scikit-learn for data-heavy problem solving.",
              ].map((point) => (
                <div key={point} className="rounded-[1.75rem] border border-border/70 bg-background/70 p-6 shadow-sm backdrop-blur">
                  <Sparkles className="mb-4 h-5 w-5 text-primary" />
                  <p className="text-sm leading-7 text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">Capabilities</p>
                <h2 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground">
                  Built for teams that need strong backend execution and clear technical thinking.
                </h2>
              </div>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/services">
                  Explore services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {serviceHighlights.map((service) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-10 rounded-[2rem] border border-border/70 bg-gradient-to-br from-background to-muted/40 p-8 shadow-sm lg:grid-cols-[1fr_1fr] lg:p-10">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">Core stack</p>
              <h2 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground">
                A toolkit shaped around backend systems, AI workflows, and practical full-stack delivery.
              </h2>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                I’m strongest on the backend, but I can move across the stack when needed, which means fewer handoff gaps and more cohesive product delivery.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {skillPreview.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
                  proficiency={skill.proficiency}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-foreground px-8 py-10 text-background shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-background/70">Let&apos;s build something stronger</p>
                <h2 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight">
                  If you need strong backend systems, intelligent workflows, and product-minded execution, let&apos;s talk.
                </h2>
                <p className="text-base leading-7 text-background/70">
                  From scalable services to AI-backed features and analytics workflows, I focus on building things that are useful, reliable, and well thought through.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-background px-6 text-foreground hover:bg-background/90">
                  <Link href="/contact">Start a project</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-background/20 bg-transparent px-6 text-background hover:bg-white/10 hover:text-background">
                  <Link href="/projects">See selected work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
