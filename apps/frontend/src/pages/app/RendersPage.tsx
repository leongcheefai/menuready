import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, DownloadIcon, FileTextIcon } from '@radix-ui/react-icons'
import { useProjects } from '../../context/ProjectContext'
import { TEMPLATE_OPTIONS } from '../../data/mockData'
import type { Render, TemplateType } from '../../types'

export default function RendersPage() {
  const { renders } = useProjects()
  const [filter, setFilter] = useState<TemplateType | 'all'>('all')
  const [previewRender, setPreviewRender] = useState<Render | null>(null)

  const filteredRenders = filter === 'all'
    ? renders
    : renders.filter(r => r.template === filter)

  const handleDownloadPNG = (render: Render) => {
    // Simulate download (UI only)
    const link = document.createElement('a')
    link.href = render.fullImage
    link.download = `${render.projectName}-${render.template}.png`
    link.click()
  }

  const handleDownloadPDF = (_render: Render) => {
    // Simulate PDF download (UI only)
    alert('PDF download would be triggered here')
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl md:text-5xl tracking-[0.1em] uppercase mb-2"
          style={{ fontFamily: 'Belanosima, sans-serif' }}
        >
          Renders
        </h1>
      </div>

      {/* Template Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 border-3 border-primary text-sm font-bold uppercase tracking-wider transition-colors ${
            filter === 'all' ? 'bg-primary text-light' : 'hover:bg-primary/10'
          }`}
        >
          All
        </button>
        {TEMPLATE_OPTIONS.map((template) => (
          <button
            key={template.id}
            onClick={() => setFilter(template.id)}
            className={`px-4 py-2 border-3 border-primary text-sm font-bold uppercase tracking-wider transition-colors ${
              filter === template.id ? 'bg-primary text-light' : 'hover:bg-primary/10'
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>

      {/* Renders Grid */}
      {filteredRenders.length === 0 ? (
        <div className="border-3 border-dashed border-primary/30 p-12 text-center">
          <div className="w-24 h-24 border-3 border-dashed border-primary/30 mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl opacity-30">?</span>
          </div>
          <h3
            className="text-2xl tracking-[0.1em] uppercase mb-2"
            style={{ fontFamily: 'Belanosima, sans-serif' }}
          >
            No Renders Yet
          </h3>
          <p className="text-sm opacity-60">
            {filter === 'all'
              ? 'Transform your products to generate menu renders'
              : `No ${filter} template renders available`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRenders.map((render) => (
            <div
              key={render.id}
              className="border-3 border-primary bg-light overflow-hidden group"
            >
              {/* Render Preview */}
              <div
                className="aspect-[4/5] bg-primary/5 overflow-hidden cursor-pointer relative"
                onClick={() => setPreviewRender(render)}
              >
                <img
                  src={render.thumbnail}
                  alt={`${render.projectName} - ${render.template}`}
                  className="w-full h-full object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span
                    className="text-light text-xl tracking-widest"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    Preview
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 border-t-3 border-primary">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-accent text-primary text-xs font-bold uppercase">
                    {render.template}
                  </span>
                  <span className="text-xs opacity-60">{render.createdAt}</span>
                </div>
                <h4
                  className="font-bold uppercase tracking-wide text-sm mb-3"
                  style={{ fontFamily: 'Belanosima, sans-serif' }}
                >
                  {render.projectName}
                </h4>

                {/* Download Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadPNG(render)}
                    className="flex-1 py-2 px-3 border-3 border-primary text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-light transition-colors flex items-center justify-center gap-2"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    PNG
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(render)}
                    className="flex-1 py-2 px-3 border-3 border-accent bg-accent text-xs font-bold uppercase tracking-wide hover:bg-primary hover:border-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <FileTextIcon className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <Dialog.Root open={!!previewRender} onOpenChange={(open) => !open && setPreviewRender(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-primary/80" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light border-3 border-primary shadow-brutal-lg w-full max-w-4xl max-h-[90vh] overflow-hidden focus:outline-none">
            <div className="flex items-center justify-between p-4 border-b-3 border-primary">
              <Dialog.Title
                className="text-xl tracking-[0.1em] uppercase"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                Menu Preview
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors">
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            {previewRender && (
              <>
                <div className="p-4 overflow-auto max-h-[60vh]">
                  <img
                    src={previewRender.fullImage}
                    alt={`${previewRender.projectName} - ${previewRender.template}`}
                    className="w-full h-auto"
                  />
                </div>

                <div className="p-4 border-t-3 border-primary">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="px-2 py-1 bg-accent text-primary text-xs font-bold uppercase mr-2">
                        {previewRender.template}
                      </span>
                      <span className="font-bold uppercase">{previewRender.projectName}</span>
                    </div>
                    <span className="text-sm opacity-60">{previewRender.createdAt}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDownloadPNG(previewRender)}
                      className="flex-1 btn-brutal-invert flex items-center justify-center gap-2"
                    >
                      <DownloadIcon className="w-5 h-5" />
                      Download PNG
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(previewRender)}
                      className="flex-1 btn-brutal flex items-center justify-center gap-2"
                    >
                      <FileTextIcon className="w-5 h-5" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
