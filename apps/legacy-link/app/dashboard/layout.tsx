import Navbar from '@/components/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Persistent Navbar */}
      <Navbar />
      
      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  )
}