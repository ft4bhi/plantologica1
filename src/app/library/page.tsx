import { BookOpen, Search, Filter } from "lucide-react";
import { PLANT_DB } from "@/data/plants";

export default function LibraryPage() {
  return (
    <div className="pb-24">
      <div className="p-4">
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
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', 'Vegetables', 'Fruits', 'Herbs', 'Flowers', 'Indoor', 'Outdoor'].map((category) => (
              <button
                key={category}
                className="px-3 py-1.5 text-sm whitespace-nowrap rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Plant Grid */}
        <div className="grid grid-cols-2 gap-4">
          {PLANT_DB.map((plant) => (
            <div key={plant.id} className="bg-white/80 rounded-2xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all">
              <div className="h-32 w-full rounded-xl bg-gradient-to-br from-green-50 to-green-100 mb-3 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/80 flex items-center justify-center text-green-700">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
              <h3 className="font-medium text-green-900">{plant.name}</h3>
              <p className="text-xs text-green-600/70 line-clamp-2">
                {plant.scientificName || 'Common plant'} • {plant.type || 'Vegetable'}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                  {plant.difficulty || 'Easy'}
                </span>
                <button className="text-green-600 hover:text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
