import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Users, DollarSign, Megaphone, BarChart2, LogOut, Globe } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

const Navbar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout)
  const [language, setLanguage] = React.useState('en')

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
    // Here you would implement the logic to change the app's language
  }

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <DollarSign className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Donation CRM</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/" icon={<Home />} text="Dashboard" />
            <NavLink to="/donors" icon={<Users />} text="Donors" />
            <NavLink to="/donations" icon={<DollarSign />} text="Donations" />
            <NavLink to="/campaigns" icon={<Megaphone />} text="Campaigns" />
            <NavLink to="/reports" icon={<BarChart2 />} text="Reports" />
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-1" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-blue-600 text-white border-none focus:outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors">
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
)

export default Navbar