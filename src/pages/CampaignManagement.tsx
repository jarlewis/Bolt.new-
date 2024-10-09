import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2 } from 'lucide-react'

type Campaign = {
  id: number
  name: string
  startDate: string
  endDate: string
  goal: number
  raised: number
}

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Spring Fundraiser', startDate: '2023-03-01', endDate: '2023-05-31', goal: 10000, raised: 7500 },
    { id: 2, name: 'Annual Gala', startDate: '2023-09-15', endDate: '2023-09-15', goal: 50000, raised: 15000 },
  ])
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset } = useForm<Campaign>()

  const onSubmit = (data: Campaign) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map((campaign) => (campaign.id === editingCampaign.id ? { ...campaign, ...data } : campaign)))
      setEditingCampaign(null)
    } else {
      setCampaigns([...campaigns, { ...data, id: Date.now(), raised: 0 }])
    }
    reset()
    setShowForm(false)
  }

  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campaign Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="mr-2" />
          {showForm ? 'Cancel' : 'Add Campaign'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input {...register('name')} placeholder="Campaign Name" className="input" />
            <input {...register('startDate')} type="date" className="input" />
            <input {...register('endDate')} type="date" className="input" />
            <input {...register('goal')} placeholder="Goal Amount" type="number" step="0.01" className="input" />
          </div>
          <button type="submit" className="btn-primary mt-4">
            {editingCampaign ? 'Update Campaign' : 'Add Campaign'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Goal</th>
              <th className="p-3 text-left">Raised</th>
              <th className="p-3 text-left">Progress</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t">
                <td className="p-3">{campaign.name}</td>
                <td className="p-3">{campaign.startDate}</td>
                <td className="p-3">{campaign.endDate}</td>
                <td className="p-3">${campaign.goal.toFixed(2)}</td>
                <td className="p-3">${campaign.raised.toFixed(2)}</td>
                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="p-3">
                  <button onClick={() => setEditingCampaign(campaign)} className="text-blue-500 mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteCampaign(campaign.id)} className="text-red-500">
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

export default CampaignManagement