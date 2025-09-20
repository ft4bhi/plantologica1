"use client";
import { compareReadings, CompareResult } from "../lib/recommend";
import { useMemo } from "react";
import { usePlant } from "../context/PlantContext";

export default function ComparePanel() {
  const { selected, reading } = usePlant();
  const compare: CompareResult | null = useMemo(() => {
    return selected ? compareReadings(selected, reading) : null;
  }, [selected, reading]);

  if (!selected || !compare) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold">Compare • {selected.name}</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {compare.assessments.map((a) => (
          <div
            key={a.key}
            className={`flat-card p-3 border ${
              a.status === "ok"
                ? "border-emerald-200"
                : a.status === "low"
                ? "border-amber-200"
                : "border-rose-200"
            }`}
          >
            <div className="text-sm font-medium capitalize">{a.key.replaceAll("_", " ")}</div>
            <div className="mt-1 text-sm">Current: <b>{a.current}</b></div>
            <div className="text-xs text-black/70">Ideal: {a.ideal.min} – {a.ideal.max}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="font-semibold">Suggestions</h4>
        {compare.suggestions.length ? (
          <ul className="mt-2 list-disc pl-6 text-sm">
            {compare.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-black/60">All parameters look good. Keep current care routine.</p>
        )}
      </div>
    </div>
  );
}
