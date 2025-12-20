import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeftIcon, PlusIcon, Cross2Icon, Pencil1Icon, TrashIcon, GearIcon } from '@radix-ui/react-icons'
import { useProjects } from '../../context/ProjectContext'
import type { Product } from '../../types'

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { getProject, addProduct, updateProduct, removeProduct, updateProject } = useProjects()
  const project = getProject(projectId || '')

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Form state
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [projectName, setProjectName] = useState(project?.name || '')

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2
          className="text-2xl tracking-[0.1em] uppercase mb-4"
          style={{ fontFamily: 'Belanosima, sans-serif' }}
        >
          Menu Not Found
        </h2>
        <Link to="/app/library" className="btn-brutal">
          BACK TO LIBRARY
        </Link>
      </div>
    )
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (productName.trim()) {
      addProduct(project.id, {
        name: productName.trim(),
        description: productDescription.trim(),
        price: parseFloat(productPrice) || 0,
        originalImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
        transformedImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'
      })
      resetForm()
      setIsAddOpen(false)
    }
  }

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct && productName.trim()) {
      updateProduct(project.id, editingProduct.id, {
        name: productName.trim(),
        description: productDescription.trim(),
        price: parseFloat(productPrice) || 0
      })
      resetForm()
      setEditingProduct(null)
    }
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to remove this product?')) {
      removeProduct(project.id, productId)
    }
  }

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim()) {
      updateProject(project.id, { name: projectName.trim() })
      setIsSettingsOpen(false)
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setProductName(product.name)
    setProductDescription(product.description)
    setProductPrice(product.price.toString())
  }

  const resetForm = () => {
    setProductName('')
    setProductDescription('')
    setProductPrice('')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app/library')}
            className="p-3 border-3 border-primary hover:bg-primary hover:text-light transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1
              className="text-3xl md:text-4xl tracking-[0.1em] uppercase"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              {project.name}
            </h1>
            <p className="text-sm opacity-60 tracking-wide">
              {project.products.length} {project.products.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog.Root open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <Dialog.Trigger asChild>
              <button
                className="p-3 border-3 border-primary hover:bg-primary hover:text-light transition-colors"
                onClick={() => setProjectName(project.name)}
              >
                <GearIcon className="w-5 h-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-primary/50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light border-3 border-primary shadow-brutal-lg w-full max-w-md focus:outline-none">
                <div className="flex items-center justify-between p-4 border-b-3 border-primary">
                  <Dialog.Title
                    className="text-xl tracking-[0.1em] uppercase"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    Menu Settings
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors">
                      <Cross2Icon className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <form onSubmit={handleUpdateProject} className="p-6">
                  <label className="block mb-4">
                    <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                      Menu Name
                    </span>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="input-brutal w-full"
                    />
                  </label>
                  <button type="submit" className="btn-brutal w-full">
                    Save Changes
                  </button>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <Dialog.Root open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
            <Dialog.Trigger asChild>
              <button className="btn-brutal flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-primary/50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light border-3 border-primary shadow-brutal-lg w-full max-w-md focus:outline-none">
                <div className="flex items-center justify-between p-4 border-b-3 border-primary">
                  <Dialog.Title
                    className="text-xl tracking-[0.1em] uppercase"
                    style={{ fontFamily: 'Belanosima, sans-serif' }}
                  >
                    Add Product
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors">
                      <Cross2Icon className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                  <label className="block">
                    <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                      Product Name
                    </span>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g., Mango Smoothie"
                      className="input-brutal w-full"
                      autoFocus
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                      Description
                    </span>
                    <textarea
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      placeholder="Describe your product..."
                      className="input-brutal w-full h-24 resize-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                      Price ($)
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="0.00"
                      className="input-brutal w-full"
                    />
                  </label>
                  <button type="submit" className="btn-brutal w-full">
                    Add Product
                  </button>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      {/* Products List */}
      {project.products.length === 0 ? (
        <div className="border-3 border-dashed border-primary/30 p-12 text-center">
          <div className="w-24 h-24 border-3 border-dashed border-primary/30 mx-auto mb-6 flex items-center justify-center">
            <PlusIcon className="w-12 h-12 opacity-30" />
          </div>
          <h3
            className="text-2xl tracking-[0.1em] uppercase mb-2"
            style={{ fontFamily: 'Belanosima, sans-serif' }}
          >
            No Products Yet
          </h3>
          <p className="text-sm opacity-60 mb-6">
            Add products to this menu to get started
          </p>
          <button onClick={() => setIsAddOpen(true)} className="btn-brutal">
            <PlusIcon className="w-5 h-5 inline mr-2" />
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {project.products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 border-3 border-primary bg-light hover:shadow-brutal-sm transition-all"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 border-3 border-primary overflow-hidden flex-shrink-0">
                <img
                  src={product.transformedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold uppercase tracking-wide text-lg">
                  {product.name}
                </h4>
                <p className="text-sm opacity-60 line-clamp-1">
                  {product.description || 'No description'}
                </p>
              </div>

              {/* Price */}
              <div
                className="text-xl font-bold text-accent flex-shrink-0"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                ${product.price.toFixed(2)}
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEditDialog(product)}
                  className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors"
                  aria-label="Edit product"
                >
                  <Pencil1Icon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 border-3 border-primary hover:bg-accent transition-colors"
                  aria-label="Delete product"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Product Dialog */}
      <Dialog.Root open={!!editingProduct} onOpenChange={(open) => { if (!open) { setEditingProduct(null); resetForm(); } }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-primary/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light border-3 border-primary shadow-brutal-lg w-full max-w-md focus:outline-none">
            <div className="flex items-center justify-between p-4 border-b-3 border-primary">
              <Dialog.Title
                className="text-xl tracking-[0.1em] uppercase"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                Edit Product
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 border-3 border-primary hover:bg-primary hover:text-light transition-colors">
                  <Cross2Icon className="w-4 h-4" />
                </button>
              </Dialog.Close>
            </div>
            <form onSubmit={handleEditProduct} className="p-6 space-y-4">
              <label className="block">
                <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                  Product Name
                </span>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="input-brutal w-full"
                  autoFocus
                />
              </label>
              <label className="block">
                <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                  Description
                </span>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="input-brutal w-full h-24 resize-none"
                />
              </label>
              <label className="block">
                <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                  Price ($)
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="input-brutal w-full"
                />
              </label>
              <button type="submit" className="btn-brutal w-full">
                Save Changes
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
