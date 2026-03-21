'use client'
import React from 'react'
import SkillCard from '@/components/SkillCard';

function page() {
  const skills = [
    { name: 'React & Next.js', icon: '⚛️', proficiency: 90 },
    { name: 'TypeScript', icon: '📘', proficiency: 85 },
    { name: 'Tailwind CSS', icon: '🎨', proficiency: 95 },
    { name: 'Node.js', icon: '🟢', proficiency: 80 },
    { name: 'Python', icon: '🐍', proficiency: 75 },
    { name: 'MongoDB', icon: '🍃', proficiency: 70 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
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