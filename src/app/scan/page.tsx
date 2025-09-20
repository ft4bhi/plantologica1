'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Loader2, Leaf, Clock, Calendar, Info } from 'lucide-react';

type PlantInfo = {
  name: string;
  scientificName: string;
  age: string;
  harvestTime: string;
  confidence: number;
  careTips: string[];
};

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera when component mounts
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Could not access the camera. Please check your permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setImagePreview(imageDataUrl);
    analyzePlant(imageDataUrl);
  };

  const analyzePlant = async (imageData: string) => {
    setIsScanning(true);
    setError(null);
    
    try {
      // In a real app, you would send this to your backend which would then call the APIs
      // This is a mock response for demonstration
      // Replace with actual API calls in production:
      // const response = await fetch('/api/analyze-plant', {
      //   method: 'POST',
      //   body: JSON.stringify({ image: imageData }),
      // });
      // const data = await response.json();
      
      // Mock response for demonstration
      setTimeout(() => {
        setPlantInfo({
          name: 'Cherry Tomato',
          scientificName: 'Solanum lycopersicum',
          age: '3-4 weeks old',
          harvestTime: 'In about 4-6 weeks',
          confidence: 0.92,
          careTips: [
            'Water deeply but infrequently',
            'Provide support with stakes or cages',
            'Fertilize every 2-3 weeks',
            'Ensure full sun exposure'
          ]
        });
        setIsScanning(false);
      }, 2000);
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze the plant. Please try again.');
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setImagePreview(null);
    setPlantInfo(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-24 bg-gray-50">
      <div className="relative bg-black">
        <div className="aspect-[3/4] max-h-[80vh] w-full">
          {!imagePreview ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={imagePreview}
              alt="Captured plant"
              className="w-full h-full object-cover"
            />
          )}

          {!imagePreview && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="w-[70vw] max-w-xs h-[70vw] max-h-xs border-4 border-white/30 rounded-full mb-4 md:mb-8"></div>
              <p className="text-white/80 text-center text-sm md:text-base">Position the plant within the frame</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
                <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>
                <button
                  onClick={resetScan}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-base w-full sm:w-auto"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-green-500 mb-4"></div>
              <p className="text-white text-base sm:text-lg text-center">Analyzing plant...</p>
              <p className="text-white/70 text-xs sm:text-sm mt-2 text-center">This may take a moment</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 -mt-8 relative z-10">
        {!imagePreview && !isScanning && (
          <div className="flex justify-center">
            <button
              onClick={captureImage}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-green-100 flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95"
              disabled={isScanning}
              aria-label="Capture image"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 flex items-center justify-center">
                <Camera className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
            </button>
          </div>
        )}

        {plantInfo && (
          <div className="mt-6 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-1">
                {plantInfo.name}
              </h2>
              <p className="text-green-600 italic text-sm sm:text-base">{plantInfo.scientificName}</p>
              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Age: {plantInfo.age}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Harvest: {plantInfo.harvestTime}</span>
                </div>
                <div className="flex items-center">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Confidence: {(plantInfo.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <h3 className="font-medium text-base sm:text-lg text-gray-900 mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 text-green-600 h-5 w-5 flex-shrink-0"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
                Care Tips
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {plantInfo.careTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1.5">•</span>
                    <span className="text-sm sm:text-base text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={resetScan}
                className="py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
              >
                Scan Another Plant
              </button>
              <button className="py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base">
                Add to My Garden
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
