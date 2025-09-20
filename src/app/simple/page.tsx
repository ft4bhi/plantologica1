'use client';

import { useState } from 'react';
import { Search, Filter, Plus, Droplets, Sun, Zap } from 'lucide-react';

// Sample plant data
const plants = [
  { id: 1, name: 'Tomato', type: 'Vegetable', water: 'Daily', sun: 'Full Sun', image: '🍅' },
  { id: 2, name: 'Basil', type: 'Herb', water: 'Every 2 days', sun: 'Partial Sun', image: '🌿' },
  { id: 3, name: 'Lavender', type: 'Herb', water: 'Weekly', sun: 'Full Sun', image: '🌸' },
  { id: 4, name: 'Cactus', type: 'Succulent', water: 'Monthly', sun: 'Full Sun', image: '🌵' },
];

// Quick actions
const quickActions = [
  { id: 1, name: 'Water Plants', icon: Droplets, color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'Check Sunlight', icon: Sun, color: 'bg-yellow-100 text-yellow-600' },
  { id: 3, name: 'Add New', icon: Plus, color: 'bg-green-100 text-green-600' },
];

export default function SimplePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Get unique plant types for filter
  const plantTypes = ['All', ...new Set(plants.map(plant => plant.type))];

  // Filter plants based on search and type
  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === 'All' || plant.type === selectedType)
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">My Plants</h1>
        <button className="bg-green-600 text-white p-2 rounded-full">
          <Plus size={20} />
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search plants..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {plantTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Filter size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {quickActions.map(action => (
          <button
            key={action.id}
            className={`flex flex-col items-center justify-center p-4 rounded-xl ${action.color} hover:opacity-90 transition-opacity`}
          >
            <action.icon size={24} className="mb-1" />
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>

      {/* Plant List */}
      <div className="space-y-3">
        {filteredPlants.map(plant => (
          <div key={plant.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center">
            <div className="text-4xl mr-4">{plant.image}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{plant.name}</h3>
              <p className="text-sm text-gray-500">{plant.type}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">💧 {plant.water}</div>
              <div className="text-sm text-gray-600 flex items-center justify-end">
                <Sun size={14} className="mr-1" /> {plant.sun}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
