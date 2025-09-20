// Global type declarations for the growing plants animation
export interface PlantsAnimationConfig {
  container: string;
  color1: string;
  color2: string;
  particleCount: number;
}

declare global {
  interface Window {
    initPlantsAnimation?: (config: PlantsAnimationConfig) => void;
  }
}
