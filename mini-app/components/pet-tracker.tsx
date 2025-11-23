"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export function PetTracker() {
  const [state, setState] = useState<"sleeping" | "hungry" | "happy">("sleeping");
  const [animating, setAnimating] = useState(false);
  const [streak, setStreak] = useState(false);

  const wakeUp = () => {
    if (state === "sleeping") setState("hungry");
  };

  const feed = () => {
    if (state !== "hungry" || animating) return;
    setAnimating(true);
    setState("happy");
    const timer = setTimeout(() => {
      setAnimating(false);
      setStreak(true);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const imageSrc = () => {
    switch (state) {
      case "sleeping":
        return "/sleeping.png";
      case "hungry":
        return "/hungry.png";
      case "happy":
        return "/happy.png";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Base Blob</h2>
      <img src={imageSrc()} alt={state} className="w-48 h-48" />
      {state === "sleeping" && (
        <Button onClick={wakeUp} disabled={animating}>
          Wake Up
        </Button>
      )}
      {state === "hungry" && (
        <Button onClick={feed} disabled={animating}>
          Feed
        </Button>
      )}
      {streak && (
        <div className="text-green-600 font-semibold">
          Streak Kept!
        </div>
      )}
      {state && (
        <Share
          text={`I just ${state === "happy" ? "kept a streak with my Base Blob!" : "interacted with my Base Blob"} ${url}`}
        />
      )}
    </div>
  );
}
