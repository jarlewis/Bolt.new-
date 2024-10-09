import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2 } from 'lucide-react'

type Donor = {
  id: number
  name: string
  email: string
  phone: string
  lastDonation: string
}

const DonorManagement: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', lastDonation: '2023-03-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', lastDonation: '2023-04-01' },
  ])
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null)

  const { register, handleSubmit, reset } = useForm<Donor>()

  const onSubmit = (data: Donor) => {
    if (editingDonor) {
      setDonors(donors.map((donor) => (donor.id === editingDonor.id ? { ...donor, ...data } : donor)))
      setEditingDonor(null)
    } else {
      setDonors([...donors, { ...data, id: Date.now() }])
    }
    reset()
  }

  const deleteDonor = (id: number) => {
    setDonors(donors.filter((donor) => donor.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Donor Management</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register('name')} placeholder="Name" className="input" />
          <input {...register('email')} placeholder="Email" type="email" className="input" />
          <input {...register('phone')} placeholder="Phone" className="input" />
          <input {...register('lastDonation')} type="date" className="input" />
        </div>
        <button type="submit" className="btn-primary mt-4">
          {editingDonor ? 'Update Donor' : 'Add Donor'}
        </button>
      </form>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Last Donation</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="border-t">
                <td className="p-3">{donor.name}</td>
                <td className="p-3">{donor.email}</td>
                <td className="p-3">{donor.phone}</td>
                <td className="p-3">{donor.lastDonation}</td>
                <td className="p-3">
                  <button onClick={() => setEditingDonor(donor)} className="text-blue-500 mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteDonor(donor.id)} className="text-red-500">
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

export default DonorManagement