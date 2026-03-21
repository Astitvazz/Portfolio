'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send, Upload, X, Image, Tag, Link, Globe, Github, Star, Hash } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  tags: string;
  liveUrl: string;
  githubUrl: string;
  slug: string;
  featured: boolean;
  order: string;
}

export default function ProjectAdminPage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    tags: '',
    liveUrl: '',
    githubUrl: '',
    slug: '',
    featured: false,
    order: '0',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
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
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    setIsSubmitting(true);

    const submitFormData = new FormData();
    submitFormData.append('title', formData.title);
    submitFormData.append('description', formData.description);
    submitFormData.append('tags', formData.tags);
    submitFormData.append('liveUrl', formData.liveUrl);
    submitFormData.append('githubUrl', formData.githubUrl);
    submitFormData.append('slug', formData.slug);
    submitFormData.append('featured', formData.featured.toString());
    submitFormData.append('order', formData.order);
    submitFormData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        body: submitFormData,
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Project created successfully!');
        setFormData({
          title: '',
          description: '',
          tags: '',
          liveUrl: '',
          githubUrl: '',
          slug: '',
          featured: false,
          order: '0',
        });
        setImagePreview(null);
        setSelectedFile(null);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Failed to submit project: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Add New Project</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase your work to the world. Fill out the details below to add a new project to your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Project Details</h3>
              <p className="text-gray-600 mb-8">Fill out the information below to showcase your project.</p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your project title"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project, its features, and technologies used..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-900 mb-2">
                    <Tag className="inline w-4 h-4 mr-1" />
                    Technologies/Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Next.js, Chart.js, REST API, Tailwind (comma-separated)"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-900 mb-2">
                      <Globe className="inline w-4 h-4 mr-1" />
                      Live URL
                    </label>
                    <input
                      type="url"
                      id="liveUrl"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-900 mb-2">
                      <Github className="inline w-4 h-4 mr-1" />
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      id="githubUrl"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/project"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-900 mb-2">
                      <Link className="inline w-4 h-4 mr-1" />
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="auto-generated-from-title"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="order" className="block text-sm font-medium text-gray-900 mb-2">
                      <Hash className="inline w-4 h-4 mr-1" />
                      Display Order
                    </label>
                    <input
                      type="number"
                      id="order"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="featured" className="flex items-center gap-2 text-sm font-medium text-gray-900 cursor-pointer">
                    <Star className="w-4 h-4 text-purple-600" />
                    Mark as Featured Project
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <Image className="inline w-4 h-4 mr-1" />
                    Project Screenshot/Image
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
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.title || !formData.description || !formData.tags || !formData.liveUrl || !formData.githubUrl || !formData.slug || !selectedFile}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Add Project to Portfolio
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Use descriptive and professional titles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Highlight key features and technologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Upload high-quality screenshots</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Include working live demo links</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Tag relevant technologies and frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">✓</span>
                  <span>Feature your best projects for visibility</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl shadow-sm p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Pro Tips</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">💡</span>
                  <span>Use Display Order to control how projects appear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">🎯</span>
                  <span>Featured projects appear prominently on your portfolio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">📸</span>
                  <span>Use 1200x630px images for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">🔗</span>
                  <span>Ensure all URLs are working before publishing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Having trouble adding your project? We're here to help!
              </p>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                View Documentation →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}