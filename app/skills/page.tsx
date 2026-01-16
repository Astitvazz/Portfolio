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
    <div className='min-h-screen flex justify-center items-center pt-24'>
      <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  )
}

export default page
