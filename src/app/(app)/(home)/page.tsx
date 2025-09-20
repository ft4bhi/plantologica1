import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pb-24">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-900">My Garden</h1>
            <p className="text-green-600/80">Welcome back! Here's your garden overview</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <HomeIcon className="h-5 w-5 text-green-700" />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/80 p-4 rounded-xl border border-white/50">
            <p className="text-sm text-green-600/70">Active Plants</p>
            <p className="text-2xl font-bold text-green-900">8</p>
            <p className="text-xs text-green-600/60 mt-1">+2 this week</p>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-white/50">
            <p className="text-sm text-green-600/70">Needs Water</p>
            <p className="text-2xl font-bold text-green-900">3</p>
            <p className="text-xs text-green-600/60 mt-1">Check soon</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/scan"
              className="bg-white/80 p-4 rounded-xl border border-white/50 flex flex-col items-center justify-center aspect-square hover:bg-white/90 transition-colors"
            >
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-line">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                  <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                  <path d="M7 12h10"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-center">Scan New Plant</span>
            </Link>
            <Link 
              href="/library"
              className="bg-white/80 p-4 rounded-xl border border-white/50 flex flex-col items-center justify-center aspect-square hover:bg-white/90 transition-colors"
            >
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-center">Plant Library</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-green-900">Recent Activity</h2>
            <button className="text-xs text-green-600 hover:text-green-700">See All</button>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, plant: 'Tomato', action: 'Watered', time: '2h ago', icon: '💧' },
              { id: 2, plant: 'Basil', action: 'Fertilized', time: '1d ago', icon: '🌱' },
              { id: 3, plant: 'Cucumber', action: 'Harvested', time: '2d ago', icon: '✂️' },
            ].map((item) => (
              <div key={item.id} className="flex items-center p-3 bg-white/80 rounded-xl border border-white/50">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-xl mr-3">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">{item.plant} {item.action}</p>
                  <p className="text-xs text-green-600/60">{item.time}</p>
                </div>
                <button className="text-green-600 hover:text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
