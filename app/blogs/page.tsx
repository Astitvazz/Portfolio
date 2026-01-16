'use client'
import React from 'react'
import BlogCard from '@/components/BlogCard';

function page() {
  const blogs = [
    {
      title: 'Building Scalable Web Applications with Next.js 14',
      summary: 'Explore the latest features of Next.js 14 and learn how to build performant, scalable web applications with server components, streaming, and more.',
      date: 'Jan 10, 2026',
      readTime: '5 min read',
      category: 'Web Development',
      slug: 'nextjs-14-scalable-apps'
    },
    {
      title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
      summary: 'Deep dive into advanced TypeScript patterns including generics, utility types, and design patterns that will level up your TypeScript development.',
      date: 'Jan 8, 2026',
      readTime: '8 min read',
      category: 'TypeScript',
      slug: 'mastering-typescript-patterns'
    },
    {
      title: 'The Complete Guide to Tailwind CSS Architecture',
      summary: 'Learn how to structure your Tailwind CSS projects for maintainability and scalability with custom utilities, plugins, and design system patterns.',
      date: 'Jan 5, 2026',
      readTime: '6 min read',
      category: 'CSS',
      slug: 'tailwind-css-architecture-guide'
    },
    {
      title: 'Understanding React Server Components',
      summary: 'A comprehensive guide to React Server Components, how they work under the hood, and when to use them in your Next.js applications.',
      date: 'Dec 28, 2025',
      readTime: '10 min read',
      category: 'React',
      slug: 'react-server-components-guide'
    },
    {
      title: 'API Design Best Practices for Modern Web Apps',
      summary: 'Essential principles and patterns for designing RESTful and GraphQL APIs that are secure, scalable, and developer-friendly.',
      date: 'Dec 20, 2025',
      readTime: '7 min read',
      category: 'Backend',
      slug: 'api-design-best-practices'
    },
    {
      title: 'Optimizing Performance in React Applications',
      summary: 'Practical techniques for improving React app performance including code splitting, lazy loading, memoization, and profiling.',
      date: 'Dec 15, 2025',
      readTime: '9 min read',
      category: 'Performance',
      slug: 'optimizing-react-performance'
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              summary={blog.summary}
              date={blog.date}
              readTime={blog.readTime}
              category={blog.category}
              slug={blog.slug}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
