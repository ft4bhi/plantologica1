'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
      water: '2.5-5cm per week',
      soilPh: '6.0-6.8',
      soilMoisture: 'Consistently moist',
      nutrients: 'High in phosphorus and potassium'
    }
  },
  // ... other plant conditions
};

type ConditionKey = keyof typeof plantConditions[1]['optimal'];

const conditionIcons: Record<ConditionKey, React.ReactNode> = {
  temperature: <Thermometer className="w-5 h-5" />,
  humidity: <Droplets className="w-5 h-5" />,
  sunlight: <Sun className="w-5 h-5" />,
  water: <CloudRain className="w-5 h-5" />,
  soilPh: <Gauge className="w-5 h-5" />,
  soilMoisture: <Droplets className="w-5 h-5" />,
  nutrients: <Leaf className="w-5 h-5" />
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

export default function CompareClient({ plantId: initialPlantId }: { plantId: string }) {
  const [currentValues, setCurrentValues] = useState<Partial<Record<ConditionKey, string>>>({});
  const plantId = initialPlantId ? parseInt(initialPlantId) : 1;
  const plant = plantConditions[plantId as keyof typeof plantConditions] || plantConditions[1];

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
      nutrients: 'Balanced'
    };
    setCurrentValues(mockCurrentValues);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/search" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Search
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {plant.name} <span className="text-gray-500 text-lg">({plant.type})</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Compare optimal conditions with your current environment
          </p>

          <div className="space-y-6">
            {(Object.keys(plant.optimal) as ConditionKey[]).map((key) => (
              <div key={key} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 mr-2">
                    {conditionIcons[key]}
                  </span>
                  <h3 className="font-medium text-gray-900">{conditionLabels[key]}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 font-medium mb-1">Optimal</p>
                    <p className="text-gray-900">{plant.optimal[key]}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-700 font-medium mb-1">Current</p>
                    <p className="text-gray-900">
                      {currentValues[key] || 'No data available'}
                    </p>
                  </div>
                </div>
                
                {!currentValues[key] && (
                  <p className="text-xs text-gray-500 mt-1">
                    Sensor data will appear here when available
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Care Tips</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Water when the top inch of soil feels dry to the touch</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Rotate the plant occasionally for even growth</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Fertilize every 2-4 weeks during the growing season</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
