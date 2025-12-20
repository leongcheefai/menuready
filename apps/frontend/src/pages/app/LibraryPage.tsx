import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, DownloadIcon, Share1Icon, TrashIcon } from '@radix-ui/react-icons'
import { useProjects } from '../../context/ProjectContext'
import type { Render } from '../../types'

export default function LibraryPage() {
  const { renders, deleteRender } = useProjects()
  const [previewRender, setPreviewRender] = useState<Render | null>(null)

  const handleDownload = (render: Render) => {
    const link = document.createElement('a')
    link.href = render.fullImage
    link.download = `kyureto-${render.id}.png`
    link.click()
  }

  const handleShare = (render: Render, platform: 'twitter' | 'facebook' | 'instagram') => {
    const imageUrl = encodeURIComponent(render.fullImage)
    const text = encodeURIComponent('Check out my photo transformed with Kyureto!')
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${imageUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`,
      instagram: `https://www.instagram.com/` // Instagram doesn't support direct sharing via URL
    }
    
    if (platform === 'instagram') {
      alert('To share on Instagram, download the image and upload it directly to the Instagram app.')
      return
    }
    
    window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteRender(id)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl md:text-5xl tracking-[0.1em] uppercase mb-2"
          style={{ fontFamily: 'Belanosima, sans-serif' }}
        >
          Library
        </h1>
        <p className="text-sm opacity-60">
          All your transformed images in one place
        </p>
      </div>

      {/* Images Grid */}
      {renders.length === 0 ? (
        <div className="border-3 border-dashed border-primary/30 p-12 text-center">
          <div className="w-24 h-24 border-3 border-dashed border-primary/30 mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl opacity-30">📷</span>
          </div>
          <h3
            className="text-2xl tracking-[0.1em] uppercase mb-2"
            style={{ fontFamily: 'Belanosima, sans-serif' }}
          >
            No Images Yet
          </h3>
          <p className="text-sm opacity-60">
            Upload and transform photos to see them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {renders.map((render) => (
            <div
              key={render.id}
              className="border-3 border-primary bg-light overflow-hidden group"
            >
              {/* Image Preview */}
              <div
                className="aspect-square bg-primary/5 overflow-hidden cursor-pointer relative"
                onClick={() => setPreviewRender(render)}
              >
                <img
                  src={render.thumbnail}
                  alt={`Render ${render.id}`}
                  className="w-full h-full object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span
                    className="text-light text-xl tracking-widest"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    View
                  </span>
                </div>
              </div>

              {/* Info & Actions */}
              <div className="p-4 border-t-3 border-primary">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs opacity-60">{render.createdAt}</span>
                  <button
                    onClick={() => handleDelete(render.id)}
                    className="p-1 hover:text-accent transition-colors"
                    aria-label="Delete image"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(render)}
                    className="flex-1 py-2 px-3 border-3 border-primary text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-light transition-colors flex items-center justify-center gap-2"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => setPreviewRender(render)}
                    className="py-2 px-3 border-3 border-accent bg-accent text-xs font-bold uppercase tracking-wide hover:bg-primary hover:border-primary hover:text-light transition-colors flex items-center justify-center"
                    aria-label="Share"
                  >
                    <Share1Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview & Share Modal */}
      <Dialog.Root open={!!previewRender} onOpenChange={(open) => !open && setPreviewRender(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-primary/80" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light border-3 border-primary shadow-brutal-lg w-full max-w-2xl max-h-[90vh] overflow-hidden focus:outline-none">
            <div className="flex items-center justify-between p-4 border-b-3 border-primary">
              <Dialog.Title
                className="text-xl tracking-[0.1em] uppercase"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                Image Preview
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors">
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            {previewRender && (
              <>
                <div className="p-4 overflow-auto max-h-[50vh]">
                  <img
                    src={previewRender.fullImage}
                    alt={`Render ${previewRender.id}`}
                    className="w-full h-auto"
                  />
                </div>

                <div className="p-4 border-t-3 border-primary">
                  <p className="text-xs uppercase tracking-wider font-bold mb-4">Share to Social Media</p>
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => handleShare(previewRender, 'twitter')}
                      className="flex-1 py-3 border-3 border-primary text-sm font-bold uppercase tracking-wide hover:bg-primary hover:text-light transition-colors"
                    >
                      Twitter / X
                    </button>
                    <button
                      onClick={() => handleShare(previewRender, 'facebook')}
                      className="flex-1 py-3 border-3 border-primary text-sm font-bold uppercase tracking-wide hover:bg-primary hover:text-light transition-colors"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare(previewRender, 'instagram')}
                      className="flex-1 py-3 border-3 border-primary text-sm font-bold uppercase tracking-wide hover:bg-primary hover:text-light transition-colors"
                    >
                      Instagram
                    </button>
                  </div>

                  <button
                    onClick={() => handleDownload(previewRender)}
                    className="w-full btn-brutal flex items-center justify-center gap-2"
                  >
                    <DownloadIcon className="w-5 h-5" />
                    Download Image
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
