export type PlantParams = {
  temperature_celsius: [min: number, max: number];
  humidity_percent: [min: number, max: number];
  soil_moisture_percent: [min: number, max: number];
  soil_pH: [min: number, max: number];
  light_intensity_lux: [min: number, max: number];
};

export type Plant = {
  id: string;
  name: string;
  scientificName?: string;
  params: PlantParams;
};

// Basic in-memory database for phase 1
export const PLANT_DB: Plant[] = [
  {
    id: "tomato",
    name: "Tomato",
    params: {
      temperature_celsius: [18, 30],
      humidity_percent: [60, 80],
      soil_moisture_percent: [40, 70],
      soil_pH: [6.0, 6.8],
      light_intensity_lux: [1500, 3000],
    },
  },
  {
    id: "basil",
    name: "Basil",
    params: {
      temperature_celsius: [20, 30],
      humidity_percent: [40, 70],
      soil_moisture_percent: [35, 60],
      soil_pH: [6.0, 7.5],
      light_intensity_lux: [1200, 2500],
    },
  },
  {
    id: "cucumber",
    name: "Cucumber",
    params: {
      temperature_celsius: [18, 32],
      humidity_percent: [60, 90],
      soil_moisture_percent: [50, 80],
      soil_pH: [5.5, 7.0],
      light_intensity_lux: [1500, 3500],
    },
  },
];

export type SensorReading = {
  temperature_celsius: number;
  humidity_percent: number;
  soil_moisture_percent: number;
  soil_pH: number;
  light_intensity_lux: number;
};
