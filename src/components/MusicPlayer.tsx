"use client";

import React, { useRef, useState, useEffect } from "react";
import { weddingData } from "../wedding-data";
import { Play } from "lucide-react";

export const MusicPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show player with animation after mount
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Auto-play music when component mounts
        const playMusic = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.5;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    // Auto-play was prevented by browser
                    console.log("Auto-play prevented, user interaction required");
                    setIsPlaying(false);
                }
            }
        };

        playMusic();
    }, []);

    const togglePlay = async () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Playback failed");
                }
            }
        }
    };

    if (!weddingData.music?.url) return null;

    return (
        <>
            <audio ref={audioRef} src={weddingData.music.url} loop preload="auto" />

            <button
                onClick={togglePlay}
                className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full 
       bg-pink-500/40 border border-pink-400/65
          flex items-center justify-center
          transition-all duration-500 ease-out
          hover:scale-110 hover:shadow-xl hover:shadow-pink-500/40
          active:scale-95
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        `}
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {/* Animated rings when playing */}
                {isPlaying && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-pink-400/30 animate-ping" />
                        <span className="absolute inset-[-4px] rounded-full border-2 border-pink-300/50 animate-pulse" />
                    </>
                )}

                {/* Icon */}
                <div className="relative z-10 text-white">
                    {isPlaying ? (
                        // Pause icon with equalizer bars
                        <div className="flex items-end justify-center gap-[3px] h-6 w-6">
                            <span className="w-1 bg-white rounded-full animate-equalizer-1" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 bg-white rounded-full animate-equalizer-2" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 bg-white rounded-full animate-equalizer-3" style={{ animationDelay: '300ms' }} />
                            <span className="w-1 bg-white rounded-full animate-equalizer-1" style={{ animationDelay: '450ms' }} />
                        </div>
                    ) : (
                        // Play icon
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                    )}
                </div>
            </button>

            {/* Custom CSS for equalizer animation */}
            <style jsx>{`
        @keyframes equalizer-1 {
          0%, 100% { height: 6px; }
          50% { height: 12px; }
        }
        @keyframes equalizer-2 {
          0%, 100% { height: 12px; }
          50% { height: 6px; }
        }
        @keyframes equalizer-3 {
          0%, 100% { height: 10px; }
          50% { height: 18px; }
        }
        .animate-equalizer-1 {
          animation: equalizer-1 0.8s ease-in-out infinite;
        }
        .animate-equalizer-2 {
          animation: equalizer-2 0.6s ease-in-out infinite;
        }
        .animate-equalizer-3 {
          animation: equalizer-3 0.7s ease-in-out infinite;
        }
      `}</style>
        </>
    );
};

export default MusicPlayer;
