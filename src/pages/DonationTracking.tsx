import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2 } from 'lucide-react'

type Donation = {
  id: number
  donorName: string
  amount: number
  date: string
  campaign: string
  paymentMethod: string
}

const DonationTracking: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([
    { id: 1, donorName: 'John Doe', amount: 100, date: '2023-03-15', campaign: 'Spring Fundraiser', paymentMethod: 'Credit Card' },
    { id: 2, donorName: 'Jane Smith', amount: 250, date: '2023-04-01', campaign: 'Annual Gala', paymentMethod: 'PayPal' },
  ])
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset } = useForm<Donation>()

  const onSubmit = (data: Donation) => {
    if (editingDonation) {
      setDonations(donations.map((donation) => (donation.id === editingDonation.id ? { ...donation, ...data } : donation)))
      setEditingDonation(null)
    } else {
      setDonations([...donations, { ...data, id: Date.now() }])
    }
    reset()
    setShowForm(false)
  }

  const deleteDonation = (id: number) => {
    setDonations(donations.filter((donation) => donation.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Donation Tracking</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showForm ? 'Cancel' : 'Make a Donation'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input {...register('donorName')} placeholder="Donor Name" className="input" required />
            <input {...register('amount')} placeholder="Amount" type="number" step="0.01" className="input" required />
            <input {...register('date')} type="date" className="input" required />
            <input {...register('campaign')} placeholder="Campaign" className="input" required />
            <select {...register('paymentMethod')} className="input" required>
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <button type="submit" className="btn-primary mt-4">
            {editingDonation ? 'Update Donation' : 'Add Donation'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Donor Name</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Campaign</th>
              <th className="p-3 text-left">Payment Method</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="border-t">
                <td className="p-3">{donation.donorName}</td>
                <td className="p-3">${donation.amount.toFixed(2)}</td>
                <td className="p-3">{donation.date}</td>
                <td className="p-3">{donation.campaign}</td>
                <td className="p-3">{donation.paymentMethod}</td>
                <td className="p-3">
                  <button onClick={() => setEditingDonation(donation)} className="text-blue-500 mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteDonation(donation.id)} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DonationTracking