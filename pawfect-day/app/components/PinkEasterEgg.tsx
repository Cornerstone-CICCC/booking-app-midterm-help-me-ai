"use client";

import { useEffect, useRef, useState } from "react";

const ASSET_PATH = "/pink_easter_egg";
const HOVER_SOUNDS = [
  `${ASSET_PATH}/snd_pink_hover00.mp3`,
  `${ASSET_PATH}/snd_pink_hover01.mp3`,
  `${ASSET_PATH}/snd_pink_hover02.mp3`,
];

export default function PinkEasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(Math.floor(Math.random() * 35) === 0);
    }, 0);

    return () => {
      clearTimeout(visibilityTimer);
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  const playSound = (source: string) => {
    const audio = new Audio(source);
    audio.volume = 0.7;
    void audio.play().catch(() => undefined);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound(HOVER_SOUNDS[Math.floor(Math.random() * HOVER_SOUNDS.length)]);
  };

  const handleClick = () => {
    playSound(`${ASSET_PATH}/snd_pink_trip.mp3`);
    setIsClicked(true);

    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  if (!isVisible) return null;

  const image = isClicked
    ? `${ASSET_PATH}/pink_clicked.gif`
    : isHovered
      ? `${ASSET_PATH}/pink_hover.gif`
      : `${ASSET_PATH}/pink_idle.gif`;

  return (
    <button
      type="button"
      aria-label="Pink"
      title="Pink"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 flex cursor-pointer flex-col items-center border-0 bg-transparent p-1 outline-none transition-transform hover:scale-105 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2"
    >
      <img
        src={image}
        alt="Pink"
        width={64}
        height={128}
        className="h-32 w-16 object-contain [image-rendering:pixelated]"
      />
      <span className="rounded-full bg-brown px-2 py-0.5 text-xs font-semibold text-cream">
        Pink
      </span>
    </button>
  );
}
