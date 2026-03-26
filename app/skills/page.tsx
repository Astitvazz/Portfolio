'use client'
import React from 'react'
import SkillCard from '@/components/SkillCard';

function page() {
  const skills = [
    { name: 'Node.js & Express', icon: 'BE', proficiency: 93 },
    { name: 'System Design', icon: 'SD', proficiency: 87 },
    { name: 'React & Next.js', icon: 'FE', proficiency: 78 },
    { name: 'RAG & Vector Databases', icon: 'AI', proficiency: 86 },
    { name: 'Python Data Stack', icon: 'PY', proficiency: 91 },
    { name: 'Machine Learning', icon: 'ML', proficiency: 82 },
  ];

  return (
    <div className="page-aura min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">Skills</p>
          <h1 className="font-[family:var(--font-display)] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            A toolkit centered on backend systems, AI workflows, and analytical depth.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            These are the technologies and domains I rely on most when designing backend systems, building intelligent applications, and working with data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              proficiency={skill.proficiency}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
