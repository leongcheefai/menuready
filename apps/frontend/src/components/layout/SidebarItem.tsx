import { NavLink } from 'react-router-dom'

interface SidebarItemProps {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  subtitle?: string
}

export default function SidebarItem({ path, label, icon: Icon, subtitle }: SidebarItemProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => `
        flex items-center gap-4 px-6 py-4 border-b-3 border-primary
        transition-colors tracking-[0.1em] text-sm font-bold
        ${isActive
          ? 'bg-primary text-light'
          : 'hover:bg-accent hover:text-primary'
        }
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="block">{label}</span>
        {subtitle && (
          <span className="text-xs opacity-60 font-normal block truncate">
            {subtitle}
          </span>
        )}
      </div>
    </NavLink>
  )
}
