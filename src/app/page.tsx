"use client"
import { Droplets, Zap, BookOpen, Clock, Plus, ChevronRight, Search, Filter, Sparkles, Leaf } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from 'react';

type Plant = {
  id: number;
  name: string;
  type: string;
  daysToHarvest: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  description: string;
  water: string;
  sunlight: string;
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  
  const plants: Plant[] = [
    { 
      id: 1, 
      name: 'Cherry Tomato', 
      type: 'Vegetable', 
      daysToHarvest: 60, 
      difficulty: 'Easy', 
      image: '🍅',
      description: 'Sweet, juicy tomatoes perfect for salads and sauces.',
      water: 'Regular, keep soil moist',
      sunlight: 'Full sun (6-8 hours)'
    },
    { 
      id: 2, 
      name: 'Basil', 
      type: 'Herb', 
      daysToHarvest: 30, 
      difficulty: 'Easy', 
      image: '🌿',
      description: 'Aromatic herb essential for Italian cuisine.',
      water: 'Keep soil consistently moist',
      sunlight: 'Partial to full sun'
    },
    { 
      id: 3, 
      name: 'Strawberry', 
      type: 'Fruit', 
      daysToHarvest: 90, 
      difficulty: 'Hard', 
      image: '🍓',
      description: 'Sweet, juicy berries that grow on low-lying plants.',
      water: '1-1.5 inches per week',
      sunlight: 'Full sun (6-10 hours)'
    },
    { 
      id: 4, 
      name: 'Bell Pepper', 
      type: 'Vegetable', 
      daysToHarvest: 75, 
      difficulty: 'Hard', 
      image: '🫑',
      description: 'Sweet, crisp peppers in various colors when ripe.',
      water: '1-2 inches per week',
      sunlight: 'Full sun (6-8 hours)'
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === 'All' || plant.type === selectedType)
  );

  const plantTypes = ['All', ...new Set(plants.map(plant => plant.type))];

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-green-100 rounded-full"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-green-100 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-green-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden mb-8 mx-4 mt-2">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative px-6 py-8 md:py-12 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Grow your perfect garden
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Get personalized plant care and track your garden's progress with our smart gardening assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/scan"
                className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors shadow-sm hover:shadow-md"
              >
                <Zap className="h-5 w-5 mr-2" />
                Scan a Plant
              </Link>
              <Link 
                href="/library"
                className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                Browse Library
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search plants..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none bg-white/80 border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all"
              >
                {plantTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/scan" 
            className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-100 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center text-emerald-600 group-hover:from-emerald-100 group-hover:to-green-100 transition-all border border-emerald-100">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700">Scan New Plant</h3>
                <p className="text-sm text-gray-500 mt-1">Identify and add plants to your collection</p>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/library" 
            className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-amber-100 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center text-amber-600 group-hover:from-amber-100 group-hover:to-yellow-100 transition-all border border-amber-100">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-700">Plant Library</h3>
                <p className="text-sm text-gray-500 mt-1">Browse our extensive plant database</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/garden" 
            className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-blue-600 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">My Garden</h3>
                <p className="text-sm text-gray-500 mt-1">View and manage your plants</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Plant Cards */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Leaf className="h-5 w-5 text-green-600 mr-2" />
            Popular Plants
          </h2>
          <Link 
            href="/library" 
            className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center transition-colors"
          >
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <div 
              key={plant.id} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <span className="text-7xl">{plant.image}</span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    plant.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800' 
                      : plant.difficulty === 'Medium'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {plant.difficulty}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-lg">{plant.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{plant.type}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1.5 text-green-500" />
                  <span>Harvest in ~{plant.daysToHarvest} days</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{plant.water}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-yellow-500">
                      <circle cx="12" cy="12" r="4"></circle>
                      <path d="M12 2v2"></path>
                      <path d="M12 20v2"></path>
                      <path d="m4.93 4.93 1.41 1.41"></path>
                      <path d="m17.66 17.66 1.41 1.41"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="m6.34 17.66-1.41 1.41"></path>
                      <path d="m19.07 4.93-1.41 1.41"></path>
                    </svg>
                    <span>{plant.sunlight}</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}