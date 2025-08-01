'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">AI-HIREUP</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">User Information</h3>
                <div className="space-y-2">
                  <p className="text-blue-700">
                    <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">ID:</span> {user.id}
                  </p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-green-700 hover:text-green-900 py-1">
                    • Update Profile
                  </button>
                  <button className="w-full text-left text-green-700 hover:text-green-900 py-1">
                    • Change Password
                  </button>
                  <button className="w-full text-left text-green-700 hover:text-green-900 py-1">
                    • View Settings
                  </button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Statistics</h3>
                <div className="space-y-2">
                  <p className="text-purple-700">
                    <span className="font-medium">Login Count:</span> 1
                  </p>
                  <p className="text-purple-700">
                    <span className="font-medium">Last Login:</span> Now
                  </p>
                  <p className="text-purple-700">
                    <span className="font-medium">Status:</span> Active
                  </p>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Welcome to AI-HIREUP!</h3>
              <p className="text-blue-100">
                You have successfully logged into your account. This is your dashboard where you can manage your profile, 
                view your activities, and access all the features of AI-HIREUP.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
