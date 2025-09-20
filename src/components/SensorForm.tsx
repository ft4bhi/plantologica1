"use client";
import { usePlant } from "../context/PlantContext";
import { SensorReading } from "../data/plants";

export default function SensorForm() {
  const { reading, setReading } = usePlant();
  const update = (k: keyof SensorReading, v: number) => setReading({ ...reading, [k]: v });

  return (
    <div>
      <h3 className="text-lg font-semibold">Sensor Input</h3>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Temperature (°C)" value={reading.temperature_celsius} onChange={(v) => update("temperature_celsius", v)} />
        <Field label="Humidity (%)" value={reading.humidity_percent} onChange={(v) => update("humidity_percent", v)} />
        <Field label="Soil moisture (%)" value={reading.soil_moisture_percent} onChange={(v) => update("soil_moisture_percent", v)} />
        <Field label="Soil pH" value={reading.soil_pH} step={0.1} onChange={(v) => update("soil_pH", v)} />
        <Field label="Light (lux)" value={reading.light_intensity_lux} onChange={(v) => update("light_intensity_lux", v)} />
      </div>
      <p className="mt-2 text-xs text-black/50">Paste values from the external sensor for now. We will connect a live device next.</p>
    </div>
  );
}

function Field({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <label className="block">
      <span className="text-xs text-black/70">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-[#28C76F]"
      />
    </label>
  );
}
