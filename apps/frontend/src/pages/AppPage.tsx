import { Link } from 'react-router-dom'
import { ArrowRightIcon, ImageIcon, UploadIcon, RocketIcon, CalendarIcon, LightningBoltIcon } from '@radix-ui/react-icons'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../context/ProjectContext'

export default function AppPage() {
  const { user } = useAuth()
  const { renders } = useProjects()

  if (!user) return null

  const recent = [...renders].slice(-8).reverse()
  const planLabel = user.plan.toUpperCase()
  const transformsLimit = user.plan === 'starter' ? 5 : user.plan === 'pro' ? Infinity : Infinity
  const transformsUsed = user.transformsUsed ?? 0
  const usagePct = transformsLimit === Infinity ? 0 : Math.min((transformsUsed / transformsLimit) * 100, 100)

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase opacity-50 mb-2 font-bold">
            Dashboard / Overview
          </p>
          <h1
            className="text-6xl md:text-8xl tracking-tight leading-none"
            style={{ fontFamily: 'Belanosima, sans-serif' }}
          >
            Hi, <span className="text-accent">{user.name.split(' ')[0]}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs uppercase tracking-widest opacity-50 font-bold mb-1">Status</p>
            <p className="text-sm font-bold flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              PRO READY
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Action Card */}
        <Link 
          to="/app/upload" 
          className="card-brutal bg-accent p-8 flex flex-col justify-between group hover:-translate-x-1 hover:-translate-y-1 transition-transform cursor-pointer min-h-[280px]"
        >
          <div>
            <div className="w-12 h-12 border-3 border-primary bg-light flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <UploadIcon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-display mb-2">Start a Transform</h3>
            <p className="text-sm opacity-80 font-medium">Upload your product photo and let AI do the magic.</p>
          </div>
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm mt-4">
            Get Started <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Usage Card */}
        <div className="card-brutal p-8 flex flex-col justify-between min-h-[280px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 border-3 border-primary bg-primary text-light flex items-center justify-center">
                <LightningBoltIcon className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 border-3 border-primary font-bold text-xs tracking-widest uppercase">
                {planLabel}
              </span>
            </div>
            <h3 className="text-3xl font-display mb-4">Usage</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-widest opacity-60">Transforms</span>
                <span className="text-2xl font-display">
                  {transformsLimit === Infinity ? `${transformsUsed}` : `${transformsUsed}/${transformsLimit}`}
                </span>
              </div>
              {transformsLimit !== Infinity && (
                <div className="h-6 border-3 border-primary bg-light overflow-hidden p-1">
                  <div 
                    className="h-full bg-accent border-r-3 border-primary transition-all duration-500" 
                    style={{ width: `${usagePct}%` }} 
                  />
                </div>
              )}
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold mt-4">
            Resets on {user.billingDate}
          </p>
        </div>

        {/* Info Card */}
        <div className="card-brutal p-8 flex flex-col justify-between md:col-span-2 lg:col-span-1 min-h-[280px]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-3 border-primary flex items-center justify-center bg-blue-100">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Member Since</p>
                <p className="font-bold">January 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-3 border-primary flex items-center justify-center bg-purple-100">
                <RocketIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Current Speed</p>
                <p className="font-bold text-accent">Ultra HD Rendering</p>
              </div>
            </div>
          </div>
          <Link to="/app/library" className="btn-brutal-invert w-full text-center py-4 mt-4 flex items-center justify-center gap-2 group">
            <ImageIcon className="w-4 h-4" />
            View Library
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b-3 border-primary pb-4">
          <h2 className="text-4xl font-display uppercase tracking-tight">Recent Renders</h2>
          <Link 
            to="/app/library" 
            className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors"
          >
            View All <ArrowRightIcon className="w-3 h-3" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="card-brutal border-dashed bg-primary/5 p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 border-3 border-primary border-dashed flex items-center justify-center mb-6 opacity-30">
              <ImageIcon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-display mb-2">No Renders Yet</h3>
            <p className="text-sm opacity-60 max-w-xs mb-8">
              Your creative journey starts here. Upload a photo to see it transformed by AI.
            </p>
            <Link to="/app/upload" className="btn-brutal flex items-center gap-3">
              <UploadIcon className="w-5 h-5" />
              First Upload
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {recent.map((r) => (
              <Link
                key={r.id}
                to="/app/library"
                className="group relative aspect-square border-3 border-primary bg-light overflow-hidden shadow-brutal-sm hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1 transition-all"
              >
                <img 
                  src={r.thumbnail} 
                  alt={r.projectName} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-light font-display text-lg mb-1">{r.projectName}</p>
                  <p className="text-accent text-[10px] uppercase tracking-widest font-bold">{r.createdAt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

