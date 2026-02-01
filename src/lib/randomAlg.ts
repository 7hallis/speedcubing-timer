import { Alg } from "cubing/alg";
import { EVENT_CONFIGS } from "./eventConfigs";
import type { CubeEvent } from "./events";

export function generateRandomAlg(event: CubeEvent): Alg {
  const cfg = EVENT_CONFIGS[event];
  const seq: string[] = [];
  let lastAxis = "";

  while (seq.length < cfg.length) {
    const move = cfg.moves[Math.floor(Math.random() * cfg.moves.length)];
    const axis = cfg.axisMap[move];

    if (axis === lastAxis) continue;

    const modifier =
      cfg.modifiers[Math.floor(Math.random() * cfg.modifiers.length)];

    seq.push(move + modifier);
    lastAxis = axis;
  }

  return new Alg(seq.join(" "));
}
