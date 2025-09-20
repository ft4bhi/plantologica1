// Global type declarations for the application
declare global {
  interface Window {
    initPlantsAnimation?: (config: {
      container: string;
      color1: string;
      color2: string;
      particleCount: number;
    }) => void;
  }
}
