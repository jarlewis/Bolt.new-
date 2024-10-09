import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Reports: React.FC = () => {
  const donationData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 5500 },
  ]

  const campaignData = [
    { name: 'Spring Fundraiser', value: 7500 },
    { name: 'Annual Gala', value: 15000 },
    { name: 'Holiday Drive', value: 10000 },
    { name: 'Back to School', value: 5000 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Donations</h2>
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {campaignData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Top Donors</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Donor Name</th>
              <th className="p-3 text-left">Total Donations</th>
              <th className="p-3 text-left">Last Donation Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">John Doe</td>
              <td className="p-3">$5,000</td>
              <td className="p-3">2023-05-15</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Jane Smith</td>
              <td className="p-3">$3,500</td>
              <td className="p-3">2023-06-01</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Bob Johnson</td>
              <td className="p-3">$2,800</td>
              <td className="p-3">2023-05-28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reports