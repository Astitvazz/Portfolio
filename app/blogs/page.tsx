'use client'
import React, { useState, useEffect } from 'react'
import BlogCard from '@/components/BlogCard';
import { apiUrl } from '@/lib/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  updatedAt: string;
}

function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(apiUrl('/api/blogs'));
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const generateSummary = (content: string): string => {
    const plainText = content.replace(/[#*`]/g, '').trim();
    return plainText.length > 150 
      ? plainText.substring(0, 150) + '...' 
      : plainText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-lg text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Blogs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">No Blogs Yet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Check back soon for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Blogs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights and tutorials on web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              summary={generateSummary(blog.content)}
              date={blog.date}
              readTime={blog.readTime}
              category={blog.category}
              slug={blog.slug}
              image={blog.image.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
