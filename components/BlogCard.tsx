import React from 'react';

interface BlogCardProps {
  title: string;
  summary: string;
  image?: string;
  date: string;
  readTime?: string;
  category?: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  summary, 
  image,
  date,
  readTime,
  category,
  slug
}) => {
  const handleClick = () => {
    // Navigate to blog post
    window.location.href = `/blogs/${slug}`;
  };

  return (
    <article 
      onClick={handleClick}
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      {/* Blog Image */}
      <div className="relative h-56 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl">
            📝
          </div>
        )}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <time dateTime={date}>{date}</time>
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {summary}
        </p>

        {/* Read More */}
        <div className="flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
          <span>Read more</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard