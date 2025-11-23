"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export function PredictionCard() {
  const [selected, setSelected] = useState<"moon" | "doom" | null>(null);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [winning, setWinning] = useState(false);

  const startAnimation = () => {
    if (animating) return;
    setAnimating(true);
    const target = Math.floor(Math.random() * 100) + 1;
    const start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const pct = Math.min((elapsed / duration) * target, target);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setAnimating(false);
        setWinning(pct > 50);
      }
    };
    requestAnimationFrame(animate);
  };

  const handleVote = (choice: "moon" | "doom") => {
    if (animating) return;
    setSelected(choice);
    startAnimation();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Will Bitcoin go up today?</h2>
      <div className="flex gap-4">
        <Button
          variant={selected === "moon" ? "default" : "outline"}
          onClick={() => handleVote("moon")}
          className="flex flex-col items-center gap-2"
        >
          <img src="/moon.png" alt="Moon" width={64} height={64} />
          <span>Moon (Up)</span>
        </Button>
        <Button
          variant={selected === "doom" ? "default" : "outline"}
          onClick={() => handleVote("doom")}
          className="flex flex-col items-center gap-2"
        >
          <img src="/doom.png" alt="Doom" width={64} height={64} />
          <span>Doom (Down)</span>
        </Button>
      </div>
      <Progress value={progress} className="w-full" />
      {winning && (
        <div className="text-green-600 font-semibold">
          Winning Pick!
        </div>
      )}
      {selected && (
        <Share
          text={`I just voted for ${selected === "moon" ? "Moon (Up)" : "Doom (Down)"} in the Bitcoin prediction market! ${url}`}
        />
      )}
    </div>
  );
}
