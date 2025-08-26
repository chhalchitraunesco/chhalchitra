"use client";

import { useState, useEffect } from "react";
import ComicLoader from "@/components/comicLoader";
import LogoHome from "@/components/logoHome";
import Subtitles from "@/components/subtitles";

type Subtitle = {
  text: string;
};

type Scene = {
  id: number;
  title: string;
  image_src: string;
  subtitles: Subtitle[];
};

export default function Story() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState<number>(0);

  // Fetch scenes JSON
  useEffect(() => {
    fetch("/scenes.json")
      .then((res) => res.json())
      .then((data: Scene[]) => setScenes(data));
  }, []);

  // Functions to handle navigation
  const nextScene = () => {
    if (currentSceneIndex + 1 >= scenes.length) return;
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

  // Keyboard navigation logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSubtitle();
      } else if (e.key === "ArrowLeft") {
        prevSubtitle();
      }
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
    <div className="bg-white overflow-y-hidden">
      <LogoHome />
      <ComicLoader
        imageSrc={currentScene.image_src}
        onPrev={prevSubtitle}
        onNext={nextSubtitle}
      />

      <Subtitles subtitle={currentSubtitle} />

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