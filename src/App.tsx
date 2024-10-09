import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import DonorManagement from './pages/DonorManagement'
import DonationTracking from './pages/DonationTracking'
import CampaignManagement from './pages/CampaignManagement'
import Reports from './pages/Reports'
import Login from './pages/Login'
import { useAuthStore } from './stores/authStore'

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/donors" element={<DonorManagement />} />
            <Route path="/donations" element={<DonationTracking />} />
            <Route path="/campaigns" element={<CampaignManagement />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App