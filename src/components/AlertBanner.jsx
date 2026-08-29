import React from 'react';

export default function AlertBanner({ alert, onOpenAlertChat }) {
  if (!alert || !alert.active || alert.severity === 'None') return null;

  const isRed = alert.severity === 'Red';

  return (
    <div
      onClick={onOpenAlertChat}
      className={`p-3 rounded-2xl border flex items-start gap-2.5 backdrop-blur-md transition-all shadow-lg cursor-pointer active:scale-[0.99] ${
        isRed
          ? 'bg-red-500/20 border-red-500/50 text-red-100 hover:bg-red-500/30 shadow-red-950/40'
          : 'bg-amber-500/20 border-amber-500/50 text-amber-100 hover:bg-amber-500/30 shadow-amber-950/40'
      }`}
    >
      <span
        className={`material-symbols-outlined text-xl flex-shrink-0 mt-0.5 ${
          isRed ? 'text-red-400 animate-pulse' : 'text-amber-400'
        }`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        warning
      </span>
      <div className="text-xs flex-1">
        <div className="flex items-center justify-between">
          <p className="font-bold uppercase tracking-wider text-[11px]">
            {alert.severity} ALERT: {alert.headline}
          </p>
          <span className="material-symbols-outlined text-xs opacity-70">open_in_new</span>
        </div>
        <p className="text-[10px] opacity-80 mt-0.5">Source: {alert.source}</p>
      </div>
    </div>
  );
}