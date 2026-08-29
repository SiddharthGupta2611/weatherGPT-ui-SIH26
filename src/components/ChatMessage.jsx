import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TelemetryCard from './TelemetryCard';

export default function ChatMessage({ message, onPlayAudio, isPlaying, listenLabel }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} transition-all`}>
      <div
        className={`p-3.5 rounded-2xl max-w-[92%] text-xs leading-relaxed shadow-md ${
          isUser
            ? 'bg-gradient-to-r from-[#06b6d4] to-[#0284c7] text-white font-medium rounded-br-none'
            : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/15 backdrop-blur-md'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <div className="prose max-w-none space-y-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>
        )}

        {/* Telemetry Grid inside message */}
        {!isUser && message.telemetry && (
          <TelemetryCard telemetry={message.telemetry} />
        )}

        {/* Audio TTS Button */}
        {!isUser && message.tts_text && (
          <button
            onClick={() => onPlayAudio(message.tts_text)}
            className={`mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium transition cursor-pointer active:scale-95 ${
              isPlaying
                ? 'bg-amber-400/30 text-amber-200 border border-amber-400/50 animate-pulse'
                : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-xs text-yellow-300">
              {isPlaying ? 'volume_off' : 'volume_up'}
            </span>
            {isPlaying ? 'वाचन थांबवा (Stop)' : listenLabel}
          </button>
        )}
      </div>
    </div>
  );
}