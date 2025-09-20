"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import { PLANT_DB, Plant } from "../data/plants";
import { usePlant } from "../context/PlantContext";
import { useRouter } from "next/navigation";
import { X, Search as SearchIcon, Leaf } from "lucide-react";

const SearchModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { setSelected } = usePlant();
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = useMemo(
    () => PLANT_DB.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  );

  useEffect(() => {
    if (open) {
      // Small delay for the animation to play
      const timer = setTimeout(() => {
        setIsVisible(true);
        inputRef.current?.focus();
      }, 10);
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const choose = (p: Plant) => {
    setSelected(p);
    setQuery("");
    onClose();
    router.push("/compare");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open && !isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-opacity duration-300 ${
        isVisible ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent'
      }`}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div 
        className={`w-full max-w-xl rounded-3xl bg-white/90 backdrop-blur-xl shadow-xl border border-white/50 overflow-hidden transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600/70" />
            <input
              ref={inputRef}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for plants..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-green-100 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none text-green-900 placeholder-green-500/60 transition-all duration-200"
              aria-label="Search for plants"
            />
            <button 
              onClick={onClose}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-green-50 text-green-700/70 hover:text-green-800 transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {filtered.length > 0 ? (
            <ul className="divide-y divide-green-50">
              {filtered.map((p) => (
                <li key={p.id}>
                  <button 
                    onClick={() => choose(p)} 
                    className="w-full text-left px-6 py-4 hover:bg-green-50/50 transition-colors flex items-center gap-3 group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-green-700 group-hover:scale-105 transition-transform">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-green-900">{p.name}</div>
                      <div className="text-xs text-green-600/70">{p.scientificName || 'Common plant'}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-400 mb-4">
                <SearchIcon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-green-900 mb-1">No results found</h3>
              <p className="text-green-600/70 text-sm">
                {query ? 'Try a different search term' : 'Type to search for plants'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/20 bg-white/50 text-center">
          <p className="text-xs text-green-600/60">
            {filtered.length > 0 
              ? `${filtered.length} ${filtered.length === 1 ? 'plant' : 'plants'} found`
              : 'Search by plant name or type'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
