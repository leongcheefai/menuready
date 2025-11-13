import { useState } from 'react'
import * as Form from '@radix-ui/react-form'
import * as Label from '@radix-ui/react-label'
import * as Dialog from '@radix-ui/react-dialog'
import { UploadIcon, CheckCircledIcon, CrossCircledIcon, ReloadIcon, Cross2Icon } from '@radix-ui/react-icons'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    if (!email || !file) {
      setMessage({ type: 'error', text: 'Please provide both email and file' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      formData.append('file', file)

      const response = await fetch('http://localhost:3000/generate-photos', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setSubmittedEmail(email)
        setDialogOpen(true)
        e.currentTarget.reset()
        setFile(null)
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to generate photos' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error connecting to server' })
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setMessage(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400 bg-clip-text text-transparent mb-3">
            MenuReady
          </h1>
          <p className="text-slate-300 text-lg">
            Upload your photos and we will generate stunning menu-ready photos
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-accent-500/30">
          <Form.Root onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <Form.Field name="email" className="space-y-2">
              <div className="flex items-center justify-between">
                <Label.Root
                  htmlFor="email"
                  className="text-sm font-medium text-slate-200"
                >
                  Email Address
                </Label.Root>
                <Form.Message
                  match="valueMissing"
                  className="text-xs text-primary-400"
                >
                  Please enter your email
                </Form.Message>
                <Form.Message
                  match="typeMismatch"
                  className="text-xs text-primary-400"
                >
                  Please provide a valid email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </Form.Control>
            </Form.Field>

            {/* File Upload Field */}
            <Form.Field name="file" className="space-y-2">
              <Label.Root
                htmlFor="file-input"
                className="text-sm font-medium text-slate-200"
              >
                Menu File
              </Label.Root>
              <div className="relative">
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  required
                  disabled={loading}
                  className="hidden"
                />
                <label
                  htmlFor="file-input"
                  className={`
                    flex items-center justify-center w-full px-4 py-8
                    border-2 border-dashed border-white/20 rounded-lg
                    cursor-pointer transition-all
                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-400 hover:bg-primary-500/10'}
                    ${file ? 'bg-accent-500/10 border-accent-400' : ''}
                  `}
                >
                  <div className="text-center">
                    <UploadIcon className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                    {file ? (
                      <>
                        <p className="text-sm text-accent-300 font-medium">{file.name}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-slate-300">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Images or PDF (Max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </Form.Field>

            {/* Submit Button */}
            <Form.Submit asChild>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-primary-600 disabled:hover:to-primary-500"
              >
                {loading ? (
                  <>
                    <ReloadIcon className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-5 w-5" />
                    Generate AI Photos
                  </>
                )}
              </button>
            </Form.Submit>

            {/* Message Display */}
            {message && (
              <div
                className={`
                  flex items-start gap-3 p-4 rounded-lg border
                  ${message.type === 'success'
                    ? 'bg-accent-500/20 border-accent-400/50 text-accent-100'
                    : 'bg-primary-500/20 border-primary-400/50 text-primary-100'
                  }
                `}
              >
                {message.type === 'success' ? (
                  <CheckCircledIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <CrossCircledIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            )}
          </Form.Root>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-md w-[90vw] bg-gradient-to-br from-slate-900 to-slate-800 border border-accent-500/30 rounded-2xl shadow-2xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircledIcon className="w-8 h-8 text-white" />
              </div>

              <Dialog.Title className="text-2xl font-bold text-white mb-2">
                Upload Successful!
              </Dialog.Title>

              <Dialog.Description className="text-slate-300 mb-6">
                We've received your menu and started processing it. Your stunning menu-ready photos will be sent to:
              </Dialog.Description>

              <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-3 mb-6 border border-accent-500/20">
                <p className="text-primary-400 font-semibold text-lg">{submittedEmail}</p>
              </div>

              <p className="text-sm text-slate-400 mb-6">
                This usually takes 5-10 minutes. Check your inbox soon!
              </p>

              <Dialog.Close asChild>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                  Got it!
                </button>
              </Dialog.Close>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
