'use client'
import React from 'react'
import ProjectCard from '@/components/ProjectCard';
function page() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with payment integration, real-time inventory management, and admin dashboard.',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/project'
    },
    {
      title: 'AI Chat Application',
      description: 'Real-time chat application powered by AI with natural language processing and sentiment analysis.',
      tags: ['React', 'Node.js', 'Socket.io', 'OpenAI'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/project'
    },
    {
      title: 'Task Management System',
      description: 'Collaborative task management tool with drag-and-drop interface, team collaboration, and progress tracking.',
      tags: ['Next.js', 'Tailwind', 'Prisma', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/project'
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website with animations, dark mode support, and blog integration.',
      tags: ['Next.js', 'Framer Motion', 'MDX'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/project'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
      tags: ['React', 'TypeScript', 'Weather API', 'Leaflet'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/project'
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for social media metrics with data visualization and reporting features.',
      tags: ['Next.js', 'Chart.js', 'REST API', 'Tailwind'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/project'
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
