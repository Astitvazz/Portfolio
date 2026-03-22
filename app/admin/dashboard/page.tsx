'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  LogOut, Plus, Trash2, Pencil, FolderKanban, FileText,
  ExternalLink, Github, X, AlertCircle, CheckCircle, Loader2, Film
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Blog {
  _id: string
  title: string
  category: string
  date: string
  readTime: string
  slug: string
  image?: { url: string }
}

interface Project {
  _id: string
  title: string
  description: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  slug: string
  image?: { url: string }
}

type Tab = 'blogs' | 'projects'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getToken = () =>
  document.cookie.split('; ').find(r => r.startsWith('adminToken='))?.split('=')[1]

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` })

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 px-5 py-4 rounded-2xl shadow-lg border text-sm max-w-sm
      ${type === 'success'
        ? 'bg-green-50 border-green-200 text-green-800'
        : 'bg-red-50 border-red-200 text-red-800'}`}
    >
      {type === 'success'
        ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
      <span className="flex-1">{message}</span>
      <button onClick={onClose}><X className="w-4 h-4" /></button>
    </div>
  )
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

function ConfirmModal({ message, onConfirm, onCancel }: {
  message: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure?</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('blogs')

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const [loadingProjects, setLoadingProjects] = useState(true)

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; slug: string; type: Tab; title: string } | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => setToast({ message, type })

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchBlogs = async () => {
    setLoadingBlogs(true)
    try {
      const res = await fetch('http://localhost:5000/api/blogs')
      const data = await res.json()
      setBlogs(data)
    } catch {
      showToast('Failed to load blogs', 'error')
    } finally {
      setLoadingBlogs(false)
    }
  }

  const fetchProjects = async () => {
    setLoadingProjects(true)
    try {
      const res = await fetch('http://localhost:5000/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch {
      showToast('Failed to load projects', 'error')
    } finally {
      setLoadingProjects(false)
    }
  }

  useEffect(() => { fetchBlogs() }, [])
  useEffect(() => { fetchProjects() }, [])

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!confirmDelete) return
    const { id, slug, type, title } = confirmDelete
    setDeleting(id)
    setConfirmDelete(null)

    try {
      const res = await fetch(`http://localhost:5000/api/${type}/${slug}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })

      if (!res.ok) throw new Error()

      if (type === 'blogs') setBlogs(prev => prev.filter(b => b._id !== id))
      else setProjects(prev => prev.filter(p => p._id !== id))

      showToast(`"${title}" deleted successfully`, 'success')
    } catch {
      showToast('Failed to delete. Try again.', 'error')
    } finally {
      setDeleting(null)
    }
  }

  // ── Logout ─────────────────────────────────────────────────────────────────

  const logout = () => {
    document.cookie = 'adminToken=; path=/; max-age=0; SameSite=Strict'
    router.push('/admin/auth')
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-1">Admin Dashboard</h2>
            <p className="text-gray-600 text-lg">Manage your portfolio content.</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
          {(['blogs', 'projects'] as Tab[]).map((key) => {
            const Icon = key === 'blogs' ? FileText : FolderKanban
            const label = key === 'blogs' ? 'Blogs' : 'Projects'
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-all
                  ${tab === key
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <Icon className="w-4 h-4" />
                {label}
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs
                  ${tab === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {key === 'blogs' ? blogs.length : projects.length}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── BLOGS TAB ── */}
        {tab === 'blogs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">All Blogs</h3>
              <button
                onClick={() => router.push('/admin/blogs/create')}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Blog
              </button>
            </div>

            {loadingBlogs ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No blogs yet</p>
                <p className="text-sm mt-1">Click "Add Blog" to publish your first post.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-gray-500 font-medium">Title</th>
                      <th className="text-left px-6 py-4 text-gray-500 font-medium hidden md:table-cell">Category</th>
                      <th className="text-left px-6 py-4 text-gray-500 font-medium hidden lg:table-cell">Date</th>
                      <th className="text-left px-6 py-4 text-gray-500 font-medium hidden lg:table-cell">Read Time</th>
                      <th className="text-right px-6 py-4 text-gray-500 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {blogs.map(blog => (
                      <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {blog.image?.url && (
                              <img
                                src={blog.image.url}
                                alt={blog.title}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <span className="font-medium text-gray-900 line-clamp-1">{blog.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{blog.date}</td>
                        <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{blog.readTime}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/admin/blogs/edit/${blog.slug}`)}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setConfirmDelete({ id: blog._id, slug: blog.slug, type: 'blogs', title: blog.title })}
                              disabled={deleting === blog._id}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"
                              title="Delete"
                            >
                              {deleting === blog._id
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── PROJECTS TAB ── */}
        {tab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">All Projects</h3>
              <button
                onClick={() => router.push('/admin/projects/create')}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            {loadingProjects ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No projects yet</p>
                <p className="text-sm mt-1">Click "Add Project" to showcase your first project.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-4 text-gray-500 font-medium">Project</th>
                      <th className="text-left px-6 py-4 text-gray-500 font-medium hidden md:table-cell">Tags</th>
                      <th className="text-left px-6 py-4 text-gray-500 font-medium hidden lg:table-cell">Featured</th>
                      <th className="text-right px-6 py-4 text-gray-500 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {projects.map(project => (
                      <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {project.image?.url && (
                              <img
                                src={project.image.url}
                                alt={project.title}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <span className="font-medium text-gray-900 line-clamp-1">{project.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                            ${project.featured
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-500'}`}>
                            {project.featured ? 'Featured' : 'Standard'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">

                            {/* Media manager — only for featured projects */}
                            {project.featured && (
                              <button
                                onClick={() => router.push(`/admin/projects/media/${project.slug}`)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Manage Media"
                              >
                                <Film className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => window.open(project.liveUrl, '_blank')}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                              title="View Live"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => window.open(project.githubUrl, '_blank')}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                              title="View GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => router.push(`/admin/projects/edit/${project.slug}`)}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setConfirmDelete({ id: project._id, slug: project.slug, type: 'projects', title: project.title })}
                              disabled={deleting === project._id}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"
                              title="Delete"
                            >
                              {deleting === project._id
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Trash2 className="w-4 h-4" />}
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <ConfirmModal
          message={`This will permanently delete "${confirmDelete.title}". This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  )
}