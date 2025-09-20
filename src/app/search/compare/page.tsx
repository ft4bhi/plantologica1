"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Thermometer, Sun, Wind, CloudRain, Gauge, Leaf } from 'lucide-react';

type PlantCondition = {
  id: number;
  name: string;
  optimal: {
    temperature: string;
    humidity: string;
    sunlight: string;
    water: string;
    soilPh: string;
    soilMoisture: string;
    nutrients: string;
  };
  image: string;
  type: string;
};

// Mock data - in a real app, this would come from an API
const plantConditions: Record<number, PlantCondition> = {
  1: {
    id: 1,
    name: 'Cherry Tomato',
    type: 'Vegetable',
    image: '🍅',
    optimal: {
      temperature: '21-24°C (day), 15-18°C (night)',
      humidity: '40-70%',
      sunlight: '6-8 hours of direct sun',
      water: '2.5-3.8cm per week',
      soilPh: '6.0-6.8',
      soilMoisture: 'Consistently moist',
      nutrients: 'Balanced NPK, higher in phosphorus during fruiting',
    },
  },
  2: {
    id: 2,
    name: 'Basil',
    type: 'Herb',
    image: '🌿',
    optimal: {
      temperature: '21-29°C',
      humidity: '40-60%',
      sunlight: '6-8 hours of sun',
      water: 'Keep soil moist, water when top inch is dry',
      soilPh: '6.0-7.5',
      soilMoisture: 'Moist but well-drained',
      nutrients: 'Balanced, nitrogen-rich fertilizer',
    },
  },
  // Add more plants as needed
};

type ConditionKey = keyof PlantCondition['optimal'];

const conditionIcons: Record<ConditionKey, JSX.Element> = {
  temperature: <Thermometer className="h-5 w-5 text-blue-500" />,
  humidity: <Droplets className="h-5 w-5 text-blue-400" />,
  sunlight: <Sun className="h-5 w-5 text-yellow-500" />,
  water: <CloudRain className="h-5 w-5 text-blue-300" />,
  soilPh: <Gauge className="h-5 w-5 text-green-500" />,
  soilMoisture: <Droplets className="h-5 w-5 text-blue-300" />,
  nutrients: <Leaf className="h-5 w-5 text-green-600" />,
};

const conditionLabels: Record<ConditionKey, string> = {
  temperature: 'Temperature',
  humidity: 'Humidity',
  sunlight: 'Sunlight',
  water: 'Water',
  soilPh: 'Soil pH',
  soilMoisture: 'Soil Moisture',
  nutrients: 'Nutrients',
};

export default function ComparePage({ searchParams }: { searchParams: { plantId: string } }) {
  const [currentValues, setCurrentValues] = useState<Partial<Record<ConditionKey, string>>>({});
  const plantId = parseInt(searchParams.plantId);
  const plant = plantConditions[plantId as keyof typeof plantConditions];

  // In a real app, you would fetch current sensor data here
  useEffect(() => {
    // Mock current values - in a real app, this would come from your sensors/API
    const mockCurrentValues: Partial<Record<ConditionKey, string>> = {
      temperature: '23°C',
      humidity: '65%',
      sunlight: '7 hours',
      water: '2.5cm this week',
      soilPh: '6.5',
      soilMoisture: 'Moist',
      nutrients: 'Balanced',
    };
    setCurrentValues(mockCurrentValues);
  }, [plantId]);

  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plant Not Found</h2>
          <p className="text-gray-600 mb-6">The plant you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/search" 
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/search" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>
          
          <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
            <span className="text-5xl mr-4">{plant.image}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{plant.name}</h1>
              <p className="text-gray-500">{plant.type}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
            <div className="p-4 font-medium text-gray-500">Condition</div>
            <div className="p-4 font-medium text-gray-500 text-center">Optimal</div>
            <div className="p-4 font-medium text-gray-500 text-center">Current</div>
          </div>
          
          {(Object.keys(plant.optimal) as ConditionKey[]).map((key) => (
            <div key={key} className="grid grid-cols-3 border-b border-gray-100 last:border-0">
              <div className="p-4 flex items-center">
                <span className="mr-2">{conditionIcons[key]}</span>
                <span>{conditionLabels[key]}</span>
              </div>
              <div className="p-4 flex items-center justify-center border-l border-r border-gray-100">
                <span className="text-green-600">{plant.optimal[key]}</span>
              </div>
              <div className="p-4 flex items-center justify-center">
                <span className={currentValues[key] === plant.optimal[key] ? 'text-green-600' : 'text-amber-600'}>
                  {currentValues[key] || 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Your {plant.name} is currently in good condition.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Consider rotating the plant every few days for even growth.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Next scheduled watering: Tomorrow morning</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
