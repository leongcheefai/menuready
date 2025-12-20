import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function AppLayout() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-light noise">
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-64 h-screen border-r-3 border-primary flex-col overflow-y-auto bg-light z-40">
        <Sidebar />
      </aside>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 flex flex-col pt-[65px] lg:pt-0 lg:ml-64 min-h-screen">
        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
