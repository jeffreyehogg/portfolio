'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewMigrationButton() {
  const [isOpen,setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const sourceSystem = formData.get('sourceSystem')

    const res = await fetch('/api/migrations', {
      method: 'POST',
      body: JSON.stringify({ name, sourceSystem }),
    })

    if (res.ok) {
      const data = await res.json()
      // Refresh the page data and close modal
      router.refresh()
      setIsOpen(false)
      // Optional: Redirect immediately to the new project
      // router.push(`/dashboard/migration/${data.id}`)
    } else {
      alert('Failed to create project')
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-sm text-sm font-medium"
      >
        + New Migration
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden ring-1 ring-gray-900/10">
            <div className="p-6">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                Start New Migration
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. HQ Badge Upgrade 2024"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="sourceSystem" className="block text-sm font-medium text-gray-700">
                    Source System
                  </label>
                  <select
                    name="sourceSystem"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  >
                    <option value="Lenel">Lenel OnGuard</option>
                    <option value="DNA Fusion">DNA Fusion</option>
                    <option value="AMAG">AMAG Symmetry</option>
                    <option value="CCURE">CCURE 9000</option>
                    <option value="Other">Other / CSV</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}