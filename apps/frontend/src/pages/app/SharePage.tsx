import { useState } from 'react'
import { CopyIcon, CheckIcon, DownloadIcon } from '@radix-ui/react-icons'
import { useProjects } from '../../context/ProjectContext'

export default function SharePage() {
  const { projects } = useProjects()
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '')
  const [copied, setCopied] = useState(false)

  const shareUrl = selectedProject
    ? `https://kyureto.app/menu/${selectedProject}`
    : ''

  const handleCopyLink = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadQR = () => {
    // Simulate QR download (UI only)
    alert('QR code download would be triggered here')
  }

  const socialLinks = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out my menu!`
    },
    {
      name: 'Facebook',
      icon: 'f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl md:text-5xl tracking-[0.1em] uppercase mb-2"
          style={{ fontFamily: 'Belanosima, sans-serif' }}
        >
          Share
        </h1>
      </div>

      {/* Project Selector */}
      <div className="mb-8">
        <label className="block mb-2">
          <span className="text-xs tracking-[0.1em] uppercase font-bold">
            Select a Menu to Share
          </span>
        </label>
        {projects.length === 0 ? (
          <div className="border-3 border-dashed border-primary/30 p-6 text-center">
            <p className="text-sm opacity-60">
              No menus available. Create a menu first to share it.
            </p>
          </div>
        ) : (
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="input-brutal w-full max-w-md"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name} ({project.products.length} items)
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedProject && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shareable Link */}
          <div className="border-3 border-primary bg-light">
            <div className="p-4 border-b-3 border-primary">
              <h3
                className="text-lg tracking-wider uppercase"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                Shareable Link
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={shareUrl}
                  className="input-brutal flex-1 text-sm truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="btn-brutal py-3 px-6 flex items-center gap-2 flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs opacity-60 mt-3">
                Anyone with this link can view your menu
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="border-3 border-primary bg-light">
            <div className="p-4 border-b-3 border-primary">
              <h3
                className="text-lg tracking-wider uppercase"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                QR Code
              </h3>
            </div>
            <div className="p-8 flex flex-col items-center">
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 border-3 border-primary bg-light p-4 mb-6">
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  {/* Simple QR pattern placeholder */}
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 ${
                          Math.random() > 0.5 ? 'bg-primary' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleDownloadQR}
                className="btn-brutal-invert w-full flex items-center justify-center gap-2"
              >
                <DownloadIcon className="w-4 h-4" />
                Download QR Code
              </button>
            </div>
          </div>

          {/* Social Share */}
          <div className="border-3 border-primary bg-light lg:col-span-2">
            <div className="p-4 border-b-3 border-primary">
              <h3
                className="text-lg tracking-wider uppercase"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                Share on Social
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-4 border-3 border-primary hover:bg-primary hover:text-light transition-colors"
                  >
                    <span className="w-8 h-8 border-3 border-current flex items-center justify-center font-bold text-lg">
                      {social.icon}
                    </span>
                    <span className="font-bold uppercase tracking-wider text-sm">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Share Stats (Placeholder) */}
          <div className="border-3 border-primary bg-light lg:col-span-2">
            <div className="p-4 border-b-3 border-primary">
              <h3
                className="text-lg tracking-wider uppercase"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                Share Statistics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border-3 border-primary/30">
                  <div
                    className="text-3xl font-bold text-accent mb-1"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    247
                  </div>
                  <div className="text-xs uppercase tracking-wider opacity-60">
                    Total Views
                  </div>
                </div>
                <div className="text-center p-4 border-3 border-primary/30">
                  <div
                    className="text-3xl font-bold text-accent mb-1"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    43
                  </div>
                  <div className="text-xs uppercase tracking-wider opacity-60">
                    This Week
                  </div>
                </div>
                <div className="text-center p-4 border-3 border-primary/30">
                  <div
                    className="text-3xl font-bold text-accent mb-1"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    12
                  </div>
                  <div className="text-xs uppercase tracking-wider opacity-60">
                    QR Scans
                  </div>
                </div>
                <div className="text-center p-4 border-3 border-primary/30">
                  <div
                    className="text-3xl font-bold text-accent mb-1"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    8
                  </div>
                  <div className="text-xs uppercase tracking-wider opacity-60">
                    Shares
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
