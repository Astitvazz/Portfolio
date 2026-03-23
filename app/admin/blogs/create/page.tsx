'use client';

import React, { useState, ChangeEvent } from 'react';
import { Send, Upload, X, Image, Calendar, Clock, Tag, Link, AlertCircle, CheckCircle } from 'lucide-react';
import { API_BASE_URL, apiUrl } from '@/lib/api';

interface FormData {
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}
const getToken = () =>
  document.cookie.split('; ').find(r => r.startsWith('adminToken='))?.split('=')[1]

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` })
export default function BlogAdminPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    date: '',
    readTime: '',
    category: '',
    slug: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      setSelectedFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Validate all fields
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }
    if (!formData.date.trim()) {
      setError('Date is required');
      return;
    }
    if (!formData.readTime.trim()) {
      setError('Read time is required');
      return;
    }
    if (!formData.category.trim()) {
      setError('Category is required');
      return;
    }
    if (!formData.slug.trim()) {
      setError('Slug is required');
      return;
    }
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }

    setIsSubmitting(true);

    const submitFormData = new FormData();
    submitFormData.append('title', formData.title.trim());
    submitFormData.append('content', formData.content.trim());
    submitFormData.append('date', formData.date.trim());
    submitFormData.append('readTime', formData.readTime.trim());
    submitFormData.append('category', formData.category.trim());
    submitFormData.append('slug', formData.slug.trim());
    submitFormData.append('image', selectedFile);

    try {
      console.log('Submitting blog post...');
      const response = await fetch(apiUrl('/api/blogs'), {
  method: 'POST',
  headers: authHeaders(), // ✅ add this
  body: submitFormData,
});

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        setSuccess(`✅ Blog "${formData.title}" posted successfully!`);
        // Reset form
        setFormData({
          title: '',
          content: '',
          date: '',
          readTime: '',
          category: '',
          slug: '',
        });
        setImagePreview(null);
        setSelectedFile(null);
        
        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Clear success message after 10 seconds
        setTimeout(() => setSuccess(''), 10000);
      } else {
        setError(`❌ Failed to post blog: ${data.message || 'Unknown error'}`);
        console.error('Error response:', data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`❌ Failed to connect to server: ${errorMessage}. Please check if the backend is running on ${API_BASE_URL}`);
      console.error('Fetch error:', error);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Create New Blog Post</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your thoughts and insights with the world. Fill out the form below to publish your blog post.
          </p>
        </div>

        {/* Error Alert - More Prominent */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-100 border-2 border-red-500 rounded-xl p-6 flex items-start gap-4 shadow-lg animate-pulse">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-red-900 font-bold text-lg mb-1">Error Occurred!</h4>
              <p className="text-red-800 text-base font-medium">{error}</p>
            </div>
            <button 
              onClick={() => setError('')} 
              className="text-red-600 hover:text-red-800 bg-red-200 hover:bg-red-300 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Success Alert - More Prominent */}
        {success && (
          <div className="max-w-4xl mx-auto mb-8 bg-green-100 border-2 border-green-500 rounded-xl p-6 flex items-start gap-4 shadow-lg animate-pulse">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-green-900 font-bold text-lg mb-1">Success!</h4>
              <p className="text-green-800 text-base font-medium">{success}</p>
            </div>
            <button 
              onClick={() => setSuccess('')} 
              className="text-green-600 hover:text-green-800 bg-green-200 hover:bg-green-300 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Status Indicator */}
        {isSubmitting && (
          <div className="max-w-4xl mx-auto mb-8 bg-blue-100 border-2 border-blue-500 rounded-xl p-6 flex items-center gap-4 shadow-lg">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            <div className="flex-1">
              <h4 className="text-blue-900 font-bold text-lg">Publishing Your Blog...</h4>
              <p className="text-blue-800 text-sm">Please wait while we upload your content and image.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Blog Details</h3>
              <p className="text-gray-600 mb-8">Fill out the information below to create your blog post.</p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your blog title"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-900 mb-2">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog post..."
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Publish Date *
                    </label>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      placeholder="e.g., Dec 28, 2025"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-900 mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Read Time *
                    </label>
                    <input
                      type="text"
                      id="readTime"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 5 min read"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                      <Tag className="inline w-4 h-4 mr-1" />
                      Category *
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Technology"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-900 mb-2">
                      <Link className="inline w-4 h-4 mr-1" />
                      Slug (URL) *
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="auto-generated-from-title"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <Image className="inline w-4 h-4 mr-1" />
                    Featured Image *
                  </label>
                  
                  {!imagePreview ? (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF, WEBP up to 5MB
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Publish Blog Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Publishing Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Use clear and descriptive titles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Write engaging summaries to attract readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Choose high-quality featured images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Select appropriate categories for better discoverability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Use SEO-friendly slugs with hyphens</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Having trouble publishing your blog? We're here to help!
              </p>
              <button type="button" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View Documentation →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
