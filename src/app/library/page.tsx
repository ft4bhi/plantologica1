'use client';

import { useState } from 'react';
import { BookOpen, Search, Filter, Droplets, Sun, Thermometer, Calendar, Ruler, Info } from 'lucide-react';

type Plant = {
  id: number;
  name: string;
  scientificName: string;
  type: string;
  difficulty: 'Easy' | 'Hard';
  description: string;
  careTips: string[];
  details: {
    water: string;
    sunlight: string;
    temperature: string;
    harvestTime: string;
    height: string;
  };
  image: string;
};
const PLANT_DB: Plant[] = [
  {
    id: 1,
    name: 'Cherry Tomato',
    scientificName: 'Solanum lycopersicum',
    type: 'Vegetable',
    difficulty: 'Easy',
    description: 'Sweet, bite-sized tomatoes perfect for salads and snacking. Grows well in containers and gardens alike.',
    careTips: [
      'Water deeply but infrequently to encourage strong root growth',
      'Provide support with stakes or cages as they grow',
      'Fertilize every 2-3 weeks with a balanced fertilizer',
      'Prune suckers to direct energy to fruit production'
    ],
    details: {
      water: 'Regular, keep soil consistently moist',
      sunlight: 'Full sun (6-8 hours daily)',
      temperature: '70-85°F (21-29°C)',
      harvestTime: '55-70 days after planting',
      height: '4-8 feet tall'
    },
    image: '🍅'
  },
  {
    id: 2,
    name: 'Basil',
    scientificName: 'Ocimum basilicum',
    type: 'Herb',
    difficulty: 'Easy',
    description: 'Aromatic herb essential for Italian cuisine. Grows quickly and can be harvested multiple times.',
    careTips: [
      'Pinch off flower buds to prolong leaf production',
      'Harvest from the top to encourage bushier growth',
      'Keep soil moist but not waterlogged',
      'Protect from frost and cold temperatures'
    ],
    details: {
      water: 'Keep soil consistently moist',
      sunlight: 'Full sun (6-8 hours daily)',
      temperature: '70-80°F (21-27°C)',
      harvestTime: '30-60 days after planting',
      height: '1-2 feet tall'
    },
    image: '🌿'
  },
  {
    id: 3,
    name: 'Strawberry',
    scientificName: 'Fragaria × ananassa',
    type: 'Fruit',
    difficulty: 'Hard',
    description: 'Sweet, juicy berries that grow on low-lying plants. Produces fruit in early summer.',
    careTips: [
      'Use straw mulch to keep fruit clean and prevent rot',
      'Remove first-year flowers to strengthen plants',
      'Divide plants every 2-3 years for better production',
      'Protect from birds with netting'
    ],
    details: {
      water: '1-1.5 inches per week',
      sunlight: 'Full sun (6-10 hours daily)',
      temperature: '60-80°F (15-27°C)',
      harvestTime: '4-6 weeks after flowering',
      height: '6-8 inches tall'
    },
    image: '🍓'
  },
  {
    id: 4,
    name: 'Bell Pepper',
    scientificName: 'Capsicum annuum',
    type: 'Vegetable',
    difficulty: 'Hard',
    description: 'Sweet, crisp peppers that turn from green to red, yellow, or orange when ripe.',
    careTips: [
      'Start seeds indoors 8-10 weeks before last frost',
      'Use mulch to maintain soil moisture',
      'Support plants with cages or stakes',
      'Harvest when fruits reach full size and color'
    ],
    details: {
      water: '1-2 inches per week',
      sunlight: 'Full sun (6-8 hours daily)',
      temperature: '70-85°F (21-29°C)',
      harvestTime: '60-90 days after transplanting',
      height: '18-24 inches tall'
    },
    image: '🫑'
  },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const plantTypes = ['All', ...Array.from(new Set(PLANT_DB.map(plant => plant.type)))];
  
  const filteredPlants = PLANT_DB.filter(plant => 
    (plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedType === 'All' || plant.type === selectedType)
  );

  return (
    <div className="pb-24">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-900">Plant Library</h1>
            <p className="text-green-600/80">Explore our collection of plants</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-green-700" />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600/70" />
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 border border-green-100 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-green-900 placeholder-green-500/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {plantTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 text-sm whitespace-nowrap rounded-full transition-colors ${
                  selectedType === type 
                    ? 'bg-green-100 text-green-800 font-medium' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Plant Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredPlants.map((plant) => (
            <div 
              key={plant.id} 
              className="bg-white/90 rounded-2xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              onClick={() => setSelectedPlant(plant)}
            >
              <div className="h-28 w-full rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 mb-3 flex items-center justify-center">
                <span className="text-5xl">{plant.image}</span>
              </div>
              <h3 className="font-medium text-green-900">{plant.name}</h3>
              <p className="text-xs text-green-600/70 line-clamp-1">
                {plant.scientificName}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  plant.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {plant.difficulty}
                </span>
                <span className="text-xs text-gray-500">{plant.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Plant Detail Modal */}
        {selectedPlant && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlant(null)}>
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative">
                <span className="text-8xl">{selectedPlant.image}</span>
                <button 
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-sm"
                  onClick={() => setSelectedPlant(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPlant.name}</h2>
                    <p className="text-green-600">{selectedPlant.scientificName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedPlant.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedPlant.difficulty}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{selectedPlant.description}</p>

                <div className="space-y-3 mb-5">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-green-600" />
                    Plant Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center text-sm">
                      <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{selectedPlant.details.water}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>{selectedPlant.details.sunlight}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Thermometer className="h-4 w-4 mr-2 text-red-500" />
                      <span>{selectedPlant.details.temperature}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      <span>{selectedPlant.details.harvestTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Ruler className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{selectedPlant.details.height}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-600">
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
                    </svg>
                    Care Tips
                  </h3>
                  <ul className="space-y-2">
                    {selectedPlant.careTips.map((tip, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="text-green-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
