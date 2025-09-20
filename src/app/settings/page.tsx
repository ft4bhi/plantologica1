'use client';

import { Globe, Headset, HelpCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="pb-24">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-900">Settings</h1>
            <p className="text-green-600/80">Manage your app preferences</p>
          </div>
        </div>

        {/* Language Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Language</h2>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <select className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>中文</option>
              <option>العربية</option>
            </select>
          </div>
        </div>

        <div className="h-px bg-gray-100 my-6"></div>

        {/* Customer Care */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Headset className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Customer Care</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <p className="font-medium text-gray-900">Contact Support</p>
              <p className="text-sm text-gray-500">Get help with any issues</p>
            </button>
            <button className="w-full text-left p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <p className="font-medium text-gray-900">Report a Problem</p>
              <p className="text-sm text-gray-500">Let us know what's wrong</p>
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-100 my-6"></div>

        {/* FAQ */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <HelpCircle className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-900">How do I add a new plant?</h3>
              <p className="text-sm text-gray-600 mt-1">Go to the home screen and tap the + button to add a new plant to your garden.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-900">How often should I water my plants?</h3>
              <p className="text-sm text-gray-600 mt-1">Watering frequency depends on the plant type and environment. Check each plant's care guide for specific recommendations.</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-medium text-gray-900">How do I change my notification settings?</h3>
              <p className="text-sm text-gray-600 mt-1">Notification settings can be adjusted in your device's system settings for this app.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
