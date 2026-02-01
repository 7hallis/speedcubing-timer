"use client";

const moves = ["R", "L", "U", "D", "F", "B"];
const modifiers = ["", "'", "2"];

const axisMap: Record<string, string> = {
  R: "x",
  L: "x",
  U: "y",
  D: "y",
  F: "z",
  B: "z",
};

export function generateScramble333(length = 20) {
  const scramble: string[] = [];
  let lastAxis = "";

  while (scramble.length < length) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    const axis = axisMap[move];

    if (axis === lastAxis) continue;

    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(move + modifier);
    lastAxis = axis;
  }

  return scramble.join(" ");
}
