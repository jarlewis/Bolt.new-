import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, Users, Megaphone, TrendingUp, Heart, PlusCircle, Shield } from 'lucide-react'

const Dashboard: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState('')

  const donationData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 5500 },
  ]

  const handleQuickDonation = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your payment processing system
    alert(`Processing donation of $${donationAmount}`)
    setDonationAmount('')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Donation CRM</h1>
      <p className="text-xl mb-8">Manage donations, track campaigns, and make a difference.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <QuickActionCard
          title="Make a Donation"
          description="Support a cause you care about"
          icon={<Heart className="h-8 w-8 text-red-500" />}
          content={
            <form onSubmit={handleQuickDonation} className="mt-4">
              <div className="flex items-center">
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Amount"
                  className="input mr-2"
                  required
                />
                <button type="submit" className="btn-primary">
                  Donate Now
                </button>
              </div>
            </form>
          }
        />
        <QuickActionCard
          title="Start a Campaign"
          description="Create a new fundraising campaign"
          icon={<PlusCircle className="h-8 w-8 text-green-500" />}
          linkTo="/campaigns"
          linkText="Create Campaign"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<DollarSign />} title="Total Donations" value="$125,000" />
        <StatCard icon={<Users />} title="Total Donors" value="1,250" />
        <StatCard icon={<Megaphone />} title="Active Campaigns" value="5" />
        <StatCard icon={<TrendingUp />} title="Growth Rate" value="15%" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Donation Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={donationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="h-6 w-6 text-green-500 mr-2" />
          Secure Payment Processing
        </h2>
        <p className="text-gray-600">
          Your financial information is protected with industry-standard encryption. 
          We comply with PCI DSS standards to ensure the highest level of security for your donations.
        </p>
      </div>
    </div>
  )
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div className="text-blue-500">{icon}</div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
)

const QuickActionCard: React.FC<{
  title: string
  description: string
  icon: React.ReactNode
  linkTo?: string
  linkText?: string
  content?: React.ReactNode
}> = ({ title, description, icon, linkTo, linkText, content }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-4">{title}</h2>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    {linkTo && linkText ? (
      <Link
        to={linkTo}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors inline-block"
      >
        {linkText}
      </Link>
    ) : content}
  </div>
)

export default Dashboard