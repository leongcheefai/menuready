import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { HamburgerMenuIcon, Cross2Icon, HomeIcon, UploadIcon, ImageIcon, PersonIcon } from '@radix-ui/react-icons'
import { useUI } from '../../context/UIContext'
import { useAuth } from '../../context/AuthContext'
import SidebarItem from './SidebarItem'

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

export default function MobileNav() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUI()
  const { user } = useAuth()

  return (
    <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex items-center justify-between p-4 border-b-3 border-primary bg-light">
          {/* Hamburger Button */}
          <Dialog.Trigger asChild>
            <button className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors">
              <HamburgerMenuIcon className="w-6 h-6" />
            </button>
          </Dialog.Trigger>

          {/* Logo */}
          <Link to="/app">
            <span
              className="text-2xl tracking-[0.05em] font-semibold"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              kyureto
            </span>
          </Link>

          {/* User Avatar */}
          <Link
            to="/app/profile"
            className="w-10 h-10 border-3 border-primary bg-accent flex items-center justify-center text-primary font-bold"
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Link>
        </div>
      </div>

      {/* Slide-out Drawer */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-primary/50 z-50 lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 left-0 w-72 bg-light border-r-3 border-primary shadow-brutal-lg z-50 lg:hidden focus:outline-none">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b-3 border-primary">
            <span
              className="text-2xl tracking-[0.05em] font-semibold"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              kyureto
            </span>
            <Dialog.Close asChild>
              <button className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Navigation */}
          <nav className="flex-1" onClick={() => setMobileMenuOpen(false)}>
            {NAV_ITEMS.map(item => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </nav>

          {/* Profile Link */}
          <div className="absolute bottom-0 left-0 right-0 border-t-3 border-primary" onClick={() => setMobileMenuOpen(false)}>
            <SidebarItem
              path="/app/profile"
              label={user?.name || 'Profile'}
              icon={PersonIcon}
              subtitle={user?.plan ? `${user.plan} plan` : undefined}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
