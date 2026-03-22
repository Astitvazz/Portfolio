'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, ChangeEvent } from 'react'
import {
  Upload, X, Trash2, AlertCircle, CheckCircle,
  Loader2, Film, ImageIcon, ArrowLeft, Plus
} from 'lucide-react'

const getToken = () =>
  document.cookie.split('; ').find(r => r.startsWith('adminToken='))?.split('=')[1]

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` })

interface MediaItem {
  _id: string
  type: 'image' | 'video'
  url: string
  publicId: string
  alt: string
  order: number
}

interface Project {
  _id: string
  title: string
  slug: string
  featured: boolean
  media: MediaItem[]
}

export default function ProjectMediaPage() {
  const { slug } = useParams()
  const router = useRouter()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ── Fetch project ────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${slug}`)
        if (!res.ok) throw new Error('Project not found')
        const data = await res.json()
        setProject(data)
      } catch {
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  // ── File selection ───────────────────────────────────────────────────────

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const oversized = files.find(f => f.size > 100 * 1024 * 1024)
    if (oversized) { setError('Each file must be under 100MB'); return }

    const invalid = files.find(f => !f.type.startsWith('image/') && !f.type.startsWith('video/'))
    if (invalid) { setError('Only images and videos are allowed'); return }

    setSelectedFiles(files)
    setError('')

    // Generate previews
    const newPreviews: { url: string; type: string }[] = []
    files.forEach(file => {
      const url = URL.createObjectURL(file)
      newPreviews.push({ url, type: file.type.startsWith('video/') ? 'video' : 'image' })
    })
    setPreviews(newPreviews)
  }

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  // ── Upload ───────────────────────────────────────────────────────────────

  const handleUpload = async () => {
    if (!selectedFiles.length) return setError('Please select files to upload')

    setUploading(true)
    setError('')
    setSuccess('')

    const formData = new FormData()
    selectedFiles.forEach(file => formData.append('media', file))

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${slug}/media`, {
        method: 'POST',
        headers: authHeaders(),
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setProject(data)
        setSelectedFiles([])
        setPreviews([])
        setSuccess(`${selectedFiles.length} file(s) uploaded successfully!`)
        setTimeout(() => setSuccess(''), 4000)
      } else {
        setError(data.message || 'Upload failed')
      }
    } catch {
      setError('Failed to connect to server')
    } finally {
      setUploading(false)
    }
  }

  // ── Delete media ─────────────────────────────────────────────────────────

  const handleDeleteMedia = async (publicId: string) => {
    setDeletingId(publicId)
    try {
      const res = await fetch(
        `http://localhost:5000/api/projects/${slug}/media/${encodeURIComponent(publicId)}`,
        { method: 'DELETE', headers: authHeaders() }
      )

      const data = await res.json()

      if (res.ok) {
        setProject(data.project)
        setSuccess('Media deleted successfully')
        setTimeout(() => setSuccess(''), 4000)
      } else {
        setError(data.message || 'Failed to delete')
      }
    } catch {
      setError('Failed to connect to server')
    } finally {
      setDeletingId(null)
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

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Media Manager
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Add images and videos to <span className="font-semibold text-gray-900">"{project?.title}"</span>
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-100 border-2 border-red-500 rounded-xl p-6 flex items-start gap-4 shadow-lg">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-red-900 font-bold text-lg mb-1">Error</h4>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-red-600 bg-red-200 hover:bg-red-300 rounded-full p-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="max-w-4xl mx-auto mb-8 bg-green-100 border-2 border-green-500 rounded-xl p-6 flex items-start gap-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-green-900 font-bold text-lg mb-1">Success!</h4>
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Upload Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-28">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Media</h3>
              <p className="text-sm text-gray-600 mb-6">
                Images up to 5MB, videos up to 100MB. Supported: JPG, PNG, WEBP, MP4, MOV, WEBM.
              </p>

              {/* File picker */}
              {selectedFiles.length === 0 ? (
                <label className="block cursor-pointer mb-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-900 transition-colors">
                    <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">Click to select files</p>
                    <p className="text-xs text-gray-400">Images & Videos supported</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-3 mb-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden border border-gray-200 group">
                      {preview.type === 'video' ? (
                        <div className="relative">
                          <video src={preview.url} className="w-full h-32 object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Film className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img src={preview.url} alt="" className="w-full h-32 object-cover" />
                      )}
                      <div className="absolute top-1 left-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs text-white font-medium
                          ${preview.type === 'video' ? 'bg-blue-600' : 'bg-gray-900'}`}>
                          {preview.type === 'video' ? 'Video' : 'Image'}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSelectedFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Add more */}
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-gray-400 transition-colors">
                      <Plus className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">Add more files</p>
                    </div>
                    <input type="file" accept="image/*,video/*" multiple onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
                className="w-full bg-black text-white py-3 px-6 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" />Uploading...</>
                ) : (
                  <><Upload className="w-5 h-5" />Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}</>
                )}
              </button>

              <button
                onClick={() => router.push('/admin/dashboard')}
                className="w-full mt-3 py-3 px-6 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Media Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Current Media
                </h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  {project?.media?.length || 0} items
                </span>
              </div>

              {!project?.media?.length ? (
                <div className="text-center py-16 text-gray-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No media yet</p>
                  <p className="text-sm mt-1">Upload images or videos using the panel on the left.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.media
                    .sort((a, b) => a.order - b.order)
                    .map(item => (
                      <div key={item._id} className="relative rounded-xl overflow-hidden border border-gray-200 group aspect-video">
                        {item.type === 'video' ? (
                          <>
                            <video
                              src={item.url}
                              className="w-full h-full object-cover"
                              muted
                              onMouseOver={e => (e.target as HTMLVideoElement).play()}
                              onMouseOut={e => { (e.target as HTMLVideoElement).pause(); (e.target as HTMLVideoElement).currentTime = 0 }}
                            />
                            <div className="absolute bottom-2 left-2">
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-medium">
                                <Film className="w-3 h-3" />Video
                              </span>
                            </div>
                          </>
                        ) : (
                          <img src={item.url} alt={item.alt || item.publicId} className="w-full h-full object-cover" />
                        )}

                        {/* Delete overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <button
                            onClick={() => handleDeleteMedia(item.publicId)}
                            disabled={deletingId === item.publicId}
                            className="opacity-0 group-hover:opacity-100 transition-all bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full shadow-lg"
                          >
                            {deletingId === item.publicId
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}