import { Link } from 'react-router-dom'
import { HomeIcon, UploadIcon, ImageIcon, PersonIcon } from '@radix-ui/react-icons'
import SidebarItem from './SidebarItem'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  {
    path: '/app',
    label: 'HOME',
    icon: HomeIcon
  },
  {
    path: '/app/upload',
    label: 'UPLOAD',
    icon: UploadIcon
  },
  {
    path: '/app/library',
    label: 'LIBRARY',
    icon: ImageIcon
  }
]

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col h-full bg-light">
      {/* Logo */}
      <div className="p-6 border-b-3 border-primary">
        <Link to="/app" className="block">
          <span
            className="text-3xl tracking-[0.05em] font-semibold"
            style={{ fontFamily: 'Belanosima, sans-serif' }}
          >
            kyureto
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {NAV_ITEMS.map(item => (
          <SidebarItem key={item.path} {...item} />
        ))}
      </nav>

      {/* Profile Link at Bottom */}
      <div className="border-t-3 border-primary">
        <SidebarItem
          path="/app/profile"
          label={user?.name || 'Profile'}
          icon={PersonIcon}
          subtitle={user?.plan ? `${user.plan} plan` : undefined}
        />
      </div>
    </div>
  )
}
