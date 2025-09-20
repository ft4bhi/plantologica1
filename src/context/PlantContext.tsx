"use client";
import { createContext, useContext, useState } from "react";
import { PLANT_DB, Plant, SensorReading } from "../data/plants";

export type PlantContextType = {
  selected: Plant | null;
  setSelected: (p: Plant | null) => void;
  reading: SensorReading;
  setReading: (s: SensorReading) => void;
};

const defaultReading: SensorReading = {
  temperature_celsius: 28.5,
  humidity_percent: 65,
  soil_moisture_percent: 45,
  soil_pH: 6.8,
  light_intensity_lux: 1800,
};

const PlantContext = createContext<PlantContextType | undefined>(undefined);

export function PlantProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Plant | null>(PLANT_DB[0]);
  const [reading, setReading] = useState<SensorReading>(defaultReading);

  return (
    <PlantContext.Provider value={{ selected, setSelected, reading, setReading }}>
      {children}
    </PlantContext.Provider>
  );
}

export function usePlant() {
  const ctx = useContext(PlantContext);
  if (!ctx) throw new Error("usePlant must be used within PlantProvider");
  return ctx;
}
