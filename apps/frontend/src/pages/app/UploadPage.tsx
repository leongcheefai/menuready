import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadIcon, ReloadIcon, Cross2Icon, CheckIcon } from '@radix-ui/react-icons'
import { useProjects } from '../../context/ProjectContext'

const STYLE_OPTIONS = [
  { id: 'minimal', label: 'Minimal', description: 'Clean, simple backgrounds' },
  { id: 'rustic', label: 'Rustic', description: 'Wooden textures, warm tones' },
  { id: 'modern', label: 'Modern', description: 'Sleek, contemporary look' },
  { id: 'natural', label: 'Natural', description: 'Organic, earthy vibes' },
  { id: 'luxury', label: 'Luxury', description: 'Premium, elegant finish' },
  { id: 'vibrant', label: 'Vibrant', description: 'Bold colors, dynamic' },
]

const SIZE_OPTIONS = [
  { id: 'square', label: '1:1', description: 'Square' },
  { id: 'portrait', label: '4:5', description: 'Portrait' },
  { id: 'landscape', label: '16:9', description: 'Landscape' },
  { id: 'story', label: '9:16', description: 'Story' },
]

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [transformedImage, setTransformedImage] = useState<string | null>(null)
  const [transforming, setTransforming] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('minimal')
  const [selectedSize, setSelectedSize] = useState('square')
  const [additionalDirections, setAdditionalDirections] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { addRender } = useProjects()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (selectedFile: File) => {
    setFile(selectedFile)
    setMessage(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setOriginalImage(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
    setTransformedImage(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleTransformImage = async () => {
    if (!file || !originalImage) {
      setMessage({ type: 'error', text: 'UPLOAD AN IMAGE FIRST' })
      return
    }

    setTransforming(true)
    setMessage(null)

    // Simulate transformation (UI only - no backend)
    await new Promise(resolve => setTimeout(resolve, 2000))

    setTransformedImage(originalImage)
    
    // Add to renders/library
    addRender({
      projectId: 'upload',
      projectName: file.name.split('.')[0],
      template: selectedStyle as 'modern' | 'classic' | 'minimal' | 'bold',
      thumbnail: originalImage,
      fullImage: originalImage,
    })
    
    setMessage({ type: 'success', text: 'TRANSFORMATION COMPLETE' })
    setTransforming(false)
  }

  const clearImage = () => {
    setFile(null)
    setOriginalImage(null)
    setTransformedImage(null)
    setMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleViewLibrary = () => {
    navigate('/app/library')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-4xl md:text-5xl tracking-[0.1em] uppercase mb-2"
            style={{ fontFamily: 'Belanosima, sans-serif' }}
          >
            Upload
          </h1>
        </div>
        {originalImage && (
          <button
            onClick={clearImage}
            className="p-3 border-3 border-primary hover:bg-primary hover:text-light transition-colors"
            aria-label="Clear image"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Side - Upload Zone */}
        <div className="flex flex-col">
          <h2
            className="text-xl tracking-[0.1em] uppercase mb-4"
            style={{ fontFamily: 'Belanosima, sans-serif' }}
          >
            Your Photo
          </h2>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="file-input"
          />

          {!originalImage ? (
            <label
              htmlFor="file-input"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                flex-1 border-3 border-dashed border-primary flex flex-col items-center justify-center
                cursor-pointer transition-all min-h-[350px]
                ${isDragging ? 'bg-primary text-light' : 'hover:bg-primary hover:text-light'}
              `}
            >
              <UploadIcon className="w-16 h-16 mb-4" />
              <span
                className="text-2xl tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                {isDragging ? 'DROP IT' : 'DROP FILE'}
              </span>
              <span className="text-xs tracking-[0.1em] opacity-60">
                OR CLICK TO BROWSE
              </span>
            </label>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 border-3 border-primary overflow-hidden bg-light min-h-[350px]">
                <img
                  src={originalImage}
                  alt="Original product"
                  className="w-full h-full object-contain"
                />
              </div>
              {file && (
                <div className="mt-3 flex items-center justify-between border-3 border-primary p-3">
                  <span className="text-xs tracking-wide truncate flex-1 mr-4 font-bold uppercase">
                    {file.name}
                  </span>
                  <span className="text-xs tracking-wider opacity-60">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Additional Directions */}
          <div className="mt-6">
            <label className="block">
              <span
                className="text-sm tracking-[0.1em] uppercase font-bold block mb-2"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                Additional Directions
              </span>
              <textarea
                value={additionalDirections}
                onChange={(e) => setAdditionalDirections(e.target.value)}
                placeholder="Describe any specific requirements... e.g., 'Add steam effect', 'Warm lighting', 'Place on marble surface'"
                className="input-brutal w-full min-h-[100px] resize-none"
              />
            </label>
          </div>
        </div>

        {/* Right Side - Style & Size Options */}
        <div className="flex flex-col">
          {/* Style Options */}
          <div className="mb-6">
            <h2
              className="text-xl tracking-[0.1em] uppercase mb-4"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              Style
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {STYLE_OPTIONS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`
                    p-4 border-3 text-left transition-all
                    ${selectedStyle === style.id
                      ? 'border-accent bg-accent text-primary'
                      : 'border-primary hover:bg-primary hover:text-light'
                    }
                  `}
                >
                  <span
                    className="block text-sm font-bold uppercase tracking-wide mb-1"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    {style.label}
                  </span>
                  <span className="block text-xs opacity-70">
                    {style.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="mb-6">
            <h2
              className="text-xl tracking-[0.1em] uppercase mb-4"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              Size
            </h2>
            <div className="flex flex-wrap gap-3">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`
                    px-5 py-3 border-3 transition-all
                    ${selectedSize === size.id
                      ? 'border-accent bg-accent text-primary'
                      : 'border-primary hover:bg-primary hover:text-light'
                    }
                  `}
                >
                  <span
                    className="block text-lg font-bold tracking-wide"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    {size.label}
                  </span>
                  <span className="block text-xs opacity-70">
                    {size.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Output Preview */}
          <div className="flex-1">
            <h2
              className="text-xl tracking-[0.1em] uppercase mb-4"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              Output
            </h2>
            <div className="border-3 border-primary bg-light flex items-center justify-center min-h-[200px] overflow-hidden">
              {transformedImage ? (
                <img
                  src={transformedImage}
                  alt="Transformed product"
                  className="w-full h-full object-contain"
                />
              ) : transforming ? (
                <div className="text-center p-6">
                  <div className="w-10 h-10 border-3 border-primary brutal-spin mx-auto mb-3"></div>
                  <span
                    className="text-lg tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    PROCESSING
                  </span>
                </div>
              ) : (
                <div className="text-center p-6">
                  <span className="text-xs tracking-[0.2em] uppercase opacity-40">
                    AWAITING TRANSFORMATION
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleTransformImage}
              disabled={!originalImage || transforming}
              className="btn-brutal w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {transforming ? (
                <>
                  <ReloadIcon className="w-5 h-5 brutal-spin" />
                  Transforming...
                </>
              ) : (
                <>
                  <span className="text-2xl">→</span>
                  Transform
                </>
              )}
            </button>

            {transformedImage && (
              <button
                onClick={handleViewLibrary}
                className="btn-brutal-invert w-full flex items-center justify-center gap-3"
              >
                <CheckIcon className="w-5 h-5" />
                View in Library
              </button>
            )}
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`
                mt-4 p-4 border-3 flex items-center gap-3
                ${message.type === 'success'
                  ? 'border-primary bg-primary text-light'
                  : 'border-primary bg-light'
                }
              `}
            >
              {message.type === 'success' ? (
                <CheckIcon className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Cross2Icon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-xs tracking-[0.1em] font-bold uppercase">
                {message.text}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
