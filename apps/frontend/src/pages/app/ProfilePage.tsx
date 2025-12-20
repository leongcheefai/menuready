import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExitIcon, CheckIcon } from '@radix-ui/react-icons'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [saved, setSaved] = useState(false)

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({ name, email })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null

  const planDetails = {
    starter: { name: 'Starter', price: '$9', transforms: '50' },
    pro: { name: 'Pro', price: '$29', transforms: 'Unlimited' },
    enterprise: { name: 'Enterprise', price: 'Custom', transforms: 'Unlimited' }
  }

  const currentPlan = planDetails[user.plan]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl md:text-5xl tracking-[0.1em] uppercase mb-2"
          style={{ fontFamily: 'Belanosima, sans-serif' }}
        >
          Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Header */}
        <div className="border-3 border-primary bg-light lg:col-span-2">
          <div className="flex items-center gap-6 p-6">
            <div className="w-24 h-24 border-3 border-primary bg-accent flex items-center justify-center flex-shrink-0">
              <span
                className="text-4xl text-primary font-bold"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2
                className="text-2xl tracking-wider uppercase mb-1"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                {user.name}
              </h2>
              <p className="text-sm opacity-60">{user.email}</p>
              <button className="mt-3 text-xs font-bold uppercase tracking-wide underline underline-offset-4 hover:no-underline">
                Change Avatar
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="border-3 border-primary bg-light">
          <div className="p-4 border-b-3 border-primary">
            <h3
              className="text-lg tracking-wider uppercase"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              Account Settings
            </h3>
          </div>
          <form onSubmit={handleSaveChanges} className="p-6 space-y-4">
            <label className="block">
              <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-brutal w-full"
              />
            </label>
            <label className="block">
              <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-brutal w-full"
              />
            </label>
            <label className="block">
              <span className="text-xs tracking-[0.1em] uppercase font-bold block mb-2">
                Password
              </span>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="••••••••"
                  readOnly
                  className="input-brutal flex-1"
                />
                <button
                  type="button"
                  className="btn-brutal-invert px-4 text-sm"
                >
                  Change
                </button>
              </div>
            </label>
            <button type="submit" className="btn-brutal w-full flex items-center justify-center gap-2">
              {saved ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>

        {/* Subscription */}
        <div className="border-3 border-primary bg-light">
          <div className="p-4 border-b-3 border-primary bg-accent">
            <h3
              className="text-lg tracking-wider uppercase text-primary"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              {currentPlan.name} Plan
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center py-3 border-b-3 border-primary/20">
              <span className="text-sm opacity-60">Transforms Used</span>
              <span className="font-bold">
                {user.transformsUsed} / {currentPlan.transforms}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b-3 border-primary/20">
              <span className="text-sm opacity-60">Next Billing</span>
              <span className="font-bold">{user.billingDate}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b-3 border-primary/20">
              <span className="text-sm opacity-60">Amount</span>
              <span
                className="font-bold text-accent text-xl"
                style={{ fontFamily: 'Belanosima, sans-serif' }}
              >
                {currentPlan.price}/month
              </span>
            </div>

            {/* Usage Bar */}
            {user.plan !== 'enterprise' && currentPlan.transforms !== 'Unlimited' && (
              <div className="pt-2">
                <div className="flex justify-between text-xs mb-2">
                  <span className="opacity-60">Usage</span>
                  <span className="font-bold">
                    {Math.round((user.transformsUsed / parseInt(currentPlan.transforms)) * 100)}%
                  </span>
                </div>
                <div className="h-3 border-3 border-primary bg-light overflow-hidden">
                  <div
                    className="h-full bg-accent"
                    style={{
                      width: `${(user.transformsUsed / parseInt(currentPlan.transforms)) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t-3 border-primary">
            <button className="btn-brutal-invert w-full">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-3 border-primary bg-light lg:col-span-2">
          <div className="p-4 border-b-3 border-primary">
            <h3
              className="text-lg tracking-wider uppercase"
              style={{ fontFamily: 'Belanosima, sans-serif' }}
            >
              Account Actions
            </h3>
          </div>
          <div className="p-6 flex flex-wrap gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 border-3 border-primary hover:bg-primary hover:text-light transition-colors font-bold tracking-wider text-sm"
            >
              <ExitIcon className="w-5 h-5" />
              Logout
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-3 border-accent text-accent hover:bg-accent hover:text-primary transition-colors font-bold tracking-wider text-sm">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
