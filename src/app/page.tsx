import { Droplets, Zap, BookOpen, Clock, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pb-4 sm:pb-0 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Garden</h1>
        <p className="text-gray-600">Welcome back! Here's your garden overview</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-white/60">
          <p className="text-sm font-medium text-gray-600 mb-2">Active Plants</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-900">8</p>
            <div className="flex items-center text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100">
              <Plus className="h-3 w-3 mr-1.5" />
              <span>2 this week</span>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-3/4"></div>
          </div>
        </div>
        
        <div className="glass-panel p-5 rounded-2xl border border-white/60">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Needs Water</p>
            <Droplets className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-amber-600">3</p>
          <div className="flex items-center text-xs text-gray-600 space-x-4 mt-3">
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2"></div>
              <span>2 overdue</span>
            </div>
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-300 mr-2"></div>
              <span>1 soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
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

      {/* Recent Activity */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center transition-colors">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="space-y-3">
          {[
            { 
              id: 1, 
              plant: 'Tomato', 
              action: 'Watered', 
              time: '2h ago', 
              icon: '🍅',
              bg: 'bg-red-50',
              border: 'border-red-100',
              text: 'text-red-700'
            },
            { 
              id: 2, 
              plant: 'Basil', 
              action: 'Fertilized', 
              time: '1d ago', 
              icon: '🌿',
              bg: 'bg-green-50',
              border: 'border-green-100',
              text: 'text-green-700'
            },
            { 
              id: 3, 
              plant: 'Snake Plant', 
              action: 'Rotated', 
              time: '2d ago', 
              icon: '🌱',
              bg: 'bg-emerald-50',
              border: 'border-emerald-100',
              text: 'text-emerald-700'
            },
          ].map((activity) => (
            <div 
              key={activity.id}
              className="group flex items-center p-4 bg-white rounded-xl border border-gray-100 transition-all hover:shadow-sm"
            >
              <div className={`h-12 w-12 rounded-xl ${activity.bg} border ${activity.border} flex items-center justify-center text-xl mr-4`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.plant} <span className="text-gray-600 font-normal">was {activity.action.toLowerCase()}</span>
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1.5 text-gray-400" />
                  <span>{activity.time}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-emerald-500 p-1.5 rounded-full hover:bg-gray-50 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
