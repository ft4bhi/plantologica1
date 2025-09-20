"use client"
import { Droplets, Zap, BookOpen, Clock, Plus, ChevronRight, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

type Plant = {
  id: number;
  name: string;
  type: string;
  daysToHarvest: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
};

export default function Home() {
  const plants: Plant[] = [
    { id: 1, name: 'Cherry Tomato', type: 'Vegetable', daysToHarvest: 60, difficulty: 'Easy', image: '🍅' },
    { id: 2, name: 'Basil', type: 'Herb', daysToHarvest: 30, difficulty: 'Easy', image: '🌿' },
    { id: 3, name: 'Strawberry', type: 'Fruit', daysToHarvest: 90, difficulty: 'Hard', image: '🍓' },
    { id: 4, name: 'Bell Pepper', type: 'Vegetable', daysToHarvest: 75, difficulty: 'Hard', image: '🫑' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  
  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === 'All' || plant.type === selectedType)
  );

  const plantTypes = ['All', ...new Set(plants.map(plant => plant.type))];

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/scan" 
              className="group neo-card p-4 rounded-2xl flex items-center space-x-4 transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center text-emerald-600 group-hover:from-emerald-100 group-hover:to-green-100 transition-all border border-emerald-100">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-emerald-700">Scan New Plant</p>
                <p className="text-xs text-gray-500 mt-0.5">Identify and add plants</p>
              </div>
            </Link>
            
            <Link 
              href="/library" 
              className="group neo-card p-4 rounded-2xl flex items-center space-x-4 transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center text-amber-600 group-hover:from-amber-100 group-hover:to-yellow-100 transition-all border border-amber-100">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-amber-700">Plant Library</p>
                <p className="text-xs text-gray-500 mt-0.5">Browse all plants</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Minimal Filter Button */}
        <div className="flex items-center justify-end">
          <button 
            className="p-2 rounded-full hover:bg-green-50 text-green-600 transition-colors"
            onClick={() => {
              // Toggle filter panel or open a modal in a real implementation
              const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement | null;
              searchInput?.focus();
            }}
            aria-label="Filter plants"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Plant Cards */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Popular Plants</h2>
          <Link href="/library" className="text-sm text-green-600 hover:text-green-700 flex items-center">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-36 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center text-6xl p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {plant.image}
                </div>
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full h-8 w-8 flex items-center justify-center shadow-sm">
                  {plant.difficulty === 'Easy' ? '🌱' : '🌿'}
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-gray-900 text-lg">{plant.name}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {plant.type}
                    </span>
                    <div className="flex items-center text-sm text-amber-600">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{plant.daysToHarvest} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}