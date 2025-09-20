"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Plant = {
  id: number;
  name: string;
  type: string;
  image: string;
};

const plants: Plant[] = [
  { id: 1, name: 'Cherry Tomato', type: 'Vegetable', image: '🍅' },
  { id: 2, name: 'Basil', type: 'Herb', image: '🌿' },
  { id: 3, name: 'Strawberry', type: 'Fruit', image: '🍓' },
  { id: 4, name: 'Bell Pepper', type: 'Vegetable', image: '🫑' },
  { id: 5, name: 'Lavender', type: 'Herb', image: '🌱' },
  { id: 6, name: 'Mint', type: 'Herb', image: '🌿' },
  { id: 7, name: 'Lettuce', type: 'Vegetable', image: '🥬' },
  { id: 8, name: 'Rosemary', type: 'Herb', image: '🌿' },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handlePlantSelect = (plant: Plant) => {
    router.push(`/search/compare?plantId=${plant.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plant Comparison Tool</h1>
          <p className="text-gray-600">Select a plant to compare optimal conditions with your current environment</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPlants.map((plant) => (
              <button
                key={plant.id}
                onClick={() => handlePlantSelect(plant)}
                className="p-4 border border-gray-200 rounded-xl text-left transition-all hover:border-green-300 hover:bg-green-50/50 hover:shadow-md"
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{plant.image}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{plant.name}</h3>
                    <p className="text-sm text-gray-500">{plant.type}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
