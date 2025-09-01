"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ComicLoader from "@/components/comicLoader";
import LogoHome from "@/components/logoHome";
import Subtitles from "@/components/subtitles";
import { Slider } from "@/components/ui/slider"; // ✅ shadcn slider
import { Volume2, VolumeX } from "lucide-react"; // ✅ lucide icons

type Subtitle = {
  text: string;
};

type Scene = {
  id: number;
  title: string;
  image_src: string;
  audio: string;
  subtitles: Subtitle[];
  theme?: {
    dim?: boolean;
    fuzzy?: boolean;
    lighting?: "soft" | "neon" | "candle";
  };
};

export default function Story() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  // Fetch scenes JSON
  useEffect(() => {
    fetch("/scenes.json")
      .then((res) => res.json())
      .then((data: Scene[]) => setScenes(data));
  }, []);

  // Handle scene change -> play its audio
  useEffect(() => {
    if (!scenes.length) return;

    const currentScene = scenes[currentSceneIndex];
    if (audioRef.current) {
      if (currentScene.audio && currentScene.audio.trim() !== "") {
        audioRef.current.pause();
        audioRef.current.src = currentScene.audio;
        audioRef.current.currentTime = 0;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play().catch(() => {
          console.log("Audio playback blocked until user interaction");
        });
      }
    }
  }, [currentSceneIndex, scenes]);

  // Update audio volume when volume/mute changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Navigation
  const nextScene = () => {
    if (currentSceneIndex + 1 >= scenes.length) {
      router.push("/credits");
      return;
    }
    setCurrentSubtitleIndex(0);
    setCurrentSceneIndex((prev) => prev + 1);
  };

  const nextSubtitle = () => {
    if (!scenes[currentSceneIndex]) return;
    const scene = scenes[currentSceneIndex];
    if (currentSubtitleIndex + 1 < scene.subtitles.length) {
      setCurrentSubtitleIndex((prev) => prev + 1);
    } else {
      nextScene();
    }
  };

  const prevSubtitle = () => {
    if (currentSubtitleIndex > 0) {
      setCurrentSubtitleIndex((prev) => prev - 1);
    } else if (currentSceneIndex > 0) {
      const prevSceneIndex = currentSceneIndex - 1;
      const prevScene = scenes[prevSceneIndex];
      if (prevScene) {
        setCurrentSubtitleIndex(prevScene.subtitles.length - 1);
        setCurrentSceneIndex(prevSceneIndex);
      }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSubtitle();
      if (e.key === "ArrowLeft") prevSubtitle();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSceneIndex, currentSubtitleIndex, scenes]);

  if (scenes.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const currentScene = scenes[currentSceneIndex];
  const currentSubtitle = currentScene.subtitles[currentSubtitleIndex]?.text ?? "";

  return (
    <div className="bg-white overflow-y-hidden relative">
      <LogoHome />
      <ComicLoader
        imageSrc={currentScene.image_src}
        onPrev={prevSubtitle}
        onNext={nextSubtitle}
      />

      <Subtitles subtitle={currentSubtitle} />

      {/* hidden audio element */}
      <audio ref={audioRef} hidden loop />

      {/* 🎵 Volume & Mute Controls (top-right) */}
      <div className="absolute top-4 right-4 flex flex-col items-center">
        <div className="group relative flex flex-col items-center">
          {/* Icon + Slider wrapper (hover keeps both active) */}
          <div className="flex flex-col items-center">
            {/* Mute / Unmute button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 bg-white/90 border border-black rounded-lg shadow-md hover:scale-110 transition p-2"
            >
              {isMuted ? (
                <VolumeX size={22} className="text-black" />
              ) : (
                <Volume2 size={22} className="text-black" />
              )}
            </button>

            {/* Vertical slider -> hidden until hover */}
            <div className="mt-2 hidden group-hover:flex p-2">
              <div className="bg-white/90 border border-black rounded-lg px-2 py-2 shadow-md">
                <Slider
                  orientation="vertical"
                  value={[volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(val) => setVolume(val[0])}
                  disabled={isMuted}
                  className="h-28"
                />
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* Subtitle navigation buttons */}
      <div className="flex justify-center mt-4">
        <button
          onClick={nextSubtitle}
          className="px-4 py-2 bg-gray-200 rounded mr-2"
        >
          Next Subtitle
        </button>
        <button
          onClick={prevSubtitle}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous Subtitle
        </button>
      </div>
    </div>
  );
}
