'use client'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const logout = () => {
    document.cookie = 'adminToken=; path=/; max-age=0; SameSite=Strict'
    router.push('/admin/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome back. Manage your portfolio content from here.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={logout}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-700 transition-all text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}