"use client";

import { useEffect, useState } from "react";
import Timer from "./timer/Timer";
import Scramble from "./timer/Scramble";
import CubeSelector from "@/_components/CubeSelector";
import { generateRandomAlg } from "@/lib/randomAlg";

async function generateScramble(cube: string) {
  // For now, only 3x3 scrambles are implemented
  if (cube === "222") {
    // Placeholder for 2x2 scramble generation
    return generateRandomAlg("222").toString();
  }
  if (cube === "333") {
    return generateRandomAlg("333").toString();
  }
  if (cube === "444") {
    // Placeholder for 4x4 scramble generation
    return generateRandomAlg("444").toString();
  }
  if (cube === "555") {
    // Placeholder for 5x5 scramble generation
    return generateRandomAlg("555").toString();
  }
  if (cube === "minx") {
    // Placeholder for 4x4 scramble generation
    return generateRandomAlg("minx").toString();
  }
  if (cube === "pyram") {
    // Placeholder for Pyraminx scramble generation
    return generateRandomAlg("pyram").toString();
  }
  if (cube === "skewb") {
    // Placeholder for Skewb scramble generation
    return generateRandomAlg("skewb").toString();
  }
  return "Scramble not available for this cube.";
}

export default function Home() {
  const [cube, setCube] = useState("333");
  const [scramble, setScramble] = useState("");

  // algs

  async function newScramble(selected = cube) {
    const s = await generateScramble(selected);
    setScramble(s);
  }

  useEffect(() => {
    newScramble();
  }, [cube]);

  function handleStop(time: number) {
    const solves = JSON.parse(localStorage.getItem("solves") || "[]");
    solves.push({
      time,
      scramble,
      cube,
      date: new Date(),
    });
    localStorage.setItem("solves", JSON.stringify(solves));

    newScramble();
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center gap-8 px-4">
      <CubeSelector value={cube} onChange={setCube} />

      <Scramble text={scramble} />

      <Timer onStop={handleStop} />

      <p className="text-sm text-zinc-400">
        Pressione <span className="font-bold">ESPAÇO</span> para iniciar/parar
      </p>
    </main>
  );
}
