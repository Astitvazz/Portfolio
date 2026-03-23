'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Send, Upload, X, Image, Link, Tag, Github, Globe, AlertCircle, CheckCircle, Star } from 'lucide-react'
import { apiUrl } from '@/lib/api'

const getToken = () =>
  document.cookie.split('; ').find(r => r.startsWith('adminToken='))?.split('=')[1]

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` })

interface FormData {
  title: string
  description: string
  tags: string
  liveUrl: string
  githubUrl: string
  slug: string
  featured: boolean
  order: number
}

export default function EditProjectPage() {
  const { slug } = useParams()
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    title: '', description: '', tags: '', liveUrl: '', githubUrl: '', slug: '', featured: false, order: 0,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ── Fetch existing project ───────────────────────────────────────────────

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(apiUrl(`/api/projects/${slug}`))
        if (!res.ok) throw new Error('Project not found')
        const data = await res.json()
        setFormData({
          title: data.title,
          description: data.description,
          tags: data.tags.join(', '),
          liveUrl: data.liveUrl,
          githubUrl: data.githubUrl,
          slug: data.slug,
          featured: data.featured,
          order: data.order || 0,
        })
        if (data.image?.url) setImagePreview(data.image.url)
      } catch (err) {
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { setError('File size must be less than 5MB'); return }
      if (!file.type.startsWith('image/')) { setError('Please select an image file'); return }
      setSelectedFile(file)
      setError('')
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!formData.title.trim()) return setError('Title is required')
    if (!formData.description.trim()) return setError('Description is required')
    if (!formData.tags.trim()) return setError('At least one tag is required')
    if (!formData.liveUrl.trim()) return setError('Live URL is required')
    if (!formData.githubUrl.trim()) return setError('GitHub URL is required')
    if (!formData.slug.trim()) return setError('Slug is required')

    setIsSubmitting(true)

    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    const submitFormData = new FormData()
    submitFormData.append('title', formData.title.trim())
    submitFormData.append('description', formData.description.trim())
    tagsArray.forEach(tag => submitFormData.append('tags[]', tag))
    submitFormData.append('liveUrl', formData.liveUrl.trim())
    submitFormData.append('githubUrl', formData.githubUrl.trim())
    submitFormData.append('slug', formData.slug.trim())
    submitFormData.append('featured', String(formData.featured))
    submitFormData.append('order', String(formData.order))
    if (selectedFile) submitFormData.append('image', selectedFile)

    try {
      const res = await fetch(apiUrl(`/api/projects/${slug}`), {
        method: 'PUT',
        headers: authHeaders(),
        body: submitFormData,
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess('Project updated successfully!')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => router.push('/admin/dashboard'), 1500)
      } else {
        setError(data.message || 'Failed to update project')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err) {
      setError('Failed to connect to server')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4" />
          <p className="text-lg text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Edit Project</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Update your project details below.</p>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-100 border-2 border-red-500 rounded-xl p-6 flex items-start gap-4 shadow-lg">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-red-900 font-bold text-lg mb-1">Error</h4>
              <p className="text-red-800 text-base font-medium">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-red-600 hover:text-red-800 bg-red-200 hover:bg-red-300 rounded-full p-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="max-w-4xl mx-auto mb-8 bg-green-100 border-2 border-green-500 rounded-xl p-6 flex items-start gap-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-green-900 font-bold text-lg mb-1">Success!</h4>
              <p className="text-green-800 text-base font-medium">{success}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Project Details</h3>
              <p className="text-gray-600 mb-8">Update the information below.</p>

              <div className="space-y-6">

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Project Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange}
                    placeholder="Enter your project title"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange}
                    placeholder="Describe your project..." rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <Tag className="inline w-4 h-4 mr-1" />Tags * <span className="text-gray-400 font-normal">(comma separated)</span>
                  </label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleInputChange}
                    placeholder="e.g., React, Node.js, MongoDB"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.tags.split(',').map((tag, i) => tag.trim() && (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{tag.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      <Globe className="inline w-4 h-4 mr-1" />Live URL *
                    </label>
                    <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleInputChange}
                      placeholder="https://yourproject.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      <Github className="inline w-4 h-4 mr-1" />GitHub URL *
                    </label>
                    <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange}
                      placeholder="https://github.com/you/project"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      <Link className="inline w-4 h-4 mr-1" />Slug (URL) *
                    </label>
                    <input type="text" name="slug" value={formData.slug} onChange={handleInputChange}
                      placeholder="project-url-slug"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Display Order</label>
                    <input type="number" name="order" value={formData.order} onChange={handleInputChange}
                      placeholder="0" min={0}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <input type="checkbox" id="featured" name="featured" checked={formData.featured}
                    onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 accent-gray-900 cursor-pointer" />
                  <label htmlFor="featured" className="flex items-center gap-2 cursor-pointer select-none">
                    <Star className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Mark as Featured Project</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    <Image className="inline w-4 h-4 mr-1" />Cover Image
                    <span className="text-gray-400 font-normal ml-1">(leave empty to keep current)</span>
                  </label>
                  {!selectedFile && imagePreview ? (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img src={imagePreview} alt="Current" className="w-full h-64 object-cover" />
                      <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-full">Current image</div>
                      <button type="button" onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : selectedFile && imagePreview ? (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img src={imagePreview} alt="New preview" className="w-full h-64 object-cover" />
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">New image</div>
                      <button type="button" onClick={() => { setImagePreview(null); setSelectedFile(null) }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-900 transition-colors">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-1">Click to upload a new image</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 5MB</p>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>

                <button type="button" onClick={handleSubmit} disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
                  {isSubmitting ? (
                    <><div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />Updating...</>
                  ) : (
                    <><Send className="w-6 h-6" />Update Project</>
                  )}
                </button>

              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Editing</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-gray-900 mt-0.5">✓</span><span>Changes are saved immediately on submit</span></li>
                <li className="flex items-start gap-2"><span className="text-gray-900 mt-0.5">✓</span><span>Leave image empty to keep the current one</span></li>
                <li className="flex items-start gap-2"><span className="text-gray-900 mt-0.5">✓</span><span>Changing the slug will update the project URL</span></li>
                <li className="flex items-start gap-2"><span className="text-gray-900 mt-0.5">✓</span><span>You'll be redirected to dashboard after saving</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Go Back</h3>
              <p className="text-sm text-gray-600 mb-4">Done editing? Return to the dashboard.</p>
              <button onClick={() => router.push('/admin/dashboard')}
                className="text-sm text-gray-900 hover:text-gray-600 font-medium transition-colors">
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
