import { Plant, SensorReading } from "../data/plants";

export type ParamKey = keyof SensorReading;

export type ParamAssessment = {
  key: ParamKey;
  current: number;
  ideal: { min: number; max: number };
  status: "low" | "ok" | "high";
  message: string;
};

export type CompareResult = {
  assessments: ParamAssessment[];
  suggestions: string[];
};

export function compareReadings(plant: Plant, reading: SensorReading): CompareResult {
  const toRange = (tuple: [number, number]) => ({ min: tuple[0], max: tuple[1] });

  const entries: [ParamKey, [number, number], string, string, string][] = [
    [
      "temperature_celsius",
      plant.params.temperature_celsius,
      "Temperature",
      "Increase warmth slightly (move to sunnier/warmer spot).",
      "Reduce heat (shade, ventilation).",
    ],
    [
      "humidity_percent",
      plant.params.humidity_percent,
      "Humidity",
      "Increase humidity (misting, pebble tray).",
      "Improve airflow/dehumidify.",
    ],
    [
      "soil_moisture_percent",
      plant.params.soil_moisture_percent,
      "Soil moisture",
      "Water the plant / increase irrigation.",
      "Reduce watering / improve drainage.",
    ],
    [
      "soil_pH",
      plant.params.soil_pH,
      "pH",
      "Use amendments to raise pH (e.g., lime) cautiously.",
      "Use amendments to lower pH (e.g., sulfur) cautiously.",
    ],
    [
      "light_intensity_lux",
      plant.params.light_intensity_lux,
      "Light",
      "Move to brighter spot or extend light duration.",
      "Filter/indirect light or reduce exposure.",
    ],
  ];

  const assessments: ParamAssessment[] = entries.map(([key, tuple, label, lowMsg, highMsg]) => {
    const ideal = toRange(tuple);
    const current = reading[key];
    let status: ParamAssessment["status"] = "ok";
    let message = `${label} is within the ideal range.`;

    if (current < ideal.min) {
      status = "low";
      message = `${label} is low. ${lowMsg}`;
    } else if (current > ideal.max) {
      status = "high";
      message = `${label} is high. ${highMsg}`;
    }

    return { key, current, ideal, status, message };
  });

  const suggestions = assessments
    .filter((a) => a.status !== "ok")
    .map((a) => a.message);

  return { assessments, suggestions };
}
