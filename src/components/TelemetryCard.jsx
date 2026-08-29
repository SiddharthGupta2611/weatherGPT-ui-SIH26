import React from 'react';

export default function TelemetryCard({ telemetry }) {
  if (!telemetry) return null;

  const temp = telemetry.temperature != null ? `${telemetry.temperature}°C` : '--';
  const feelsLike = telemetry.feels_like != null ? `${telemetry.feels_like}°C` : null;
  const rainProb = telemetry.precipitation_probability != null ? `${telemetry.precipitation_probability}%` : '--';
  const windSpeed = telemetry.wind_speed_kmh != null ? `${telemetry.wind_speed_kmh} km/h` : '--';
  const windDir = telemetry.wind_direction || '';
  const soilMoisture = telemetry.soil_moisture_percentage != null ? `${telemetry.soil_moisture_percentage}%` : '--';

  return (
    <div className="mt-3 pt-2.5 border-t border-white/10 text-slate-100">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 shadow-inner">
          <span className="text-[10px] text-slate-400 block font-mono">TEMP / FEELS</span>
          <span className="text-sm font-bold text-white">{temp}</span>
          {feelsLike && (
            <span className="text-[10px] text-slate-400 ml-1">({feelsLike})</span>
          )}
        </div>

        <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 shadow-inner">
          <span className="text-[10px] text-slate-400 block font-mono">RAIN PROB</span>
          <span className="text-sm font-bold text-cyan-300">{rainProb}</span>
        </div>

        <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 shadow-inner">
          <span className="text-[10px] text-slate-400 block font-mono">WIND</span>
          <span className="text-sm font-bold text-white">{windSpeed}</span>
          {windDir && (
            <span className="text-[10px] text-slate-400 ml-1 font-semibold">{windDir}</span>
          )}
        </div>

        <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 shadow-inner">
          <span className="text-[10px] text-slate-400 block font-mono">SOIL MOISTURE</span>
          <span className="text-sm font-bold text-emerald-400">{soilMoisture}</span>
        </div>
      </div>

      {telemetry.model_source && (
        <div className="mt-1 text-[9px] text-slate-400 text-right font-mono">
          NWP Model: <span className="text-cyan-400">{telemetry.model_source}</span>
        </div>
      )}
    </div>
  );
}