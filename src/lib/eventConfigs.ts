import { EventConfig } from "./events";

export const EVENT_CONFIGS: Record<string, EventConfig> = {
  "222": {
    moves: ["R", "U", "F"],
    modifiers: ["", "'", "2"],
    length: 8,
    axisMap: {
      R: "x",
      U: "y",
      F: "z",
    },
  },

  "333": {
    moves: ["R", "L", "U", "D", "F", "B"],
    modifiers: ["", "'", "2"],
    length: 19,
    axisMap: {
      R: "x",
      L: "x",
      U: "y",
      D: "y",
      F: "z",
      B: "z",
    },
  },

  "444": {
    moves: ["R", "L", "U", "D", "F", "B", "Rw", "Uw", "Fw"],
    modifiers: ["", "'", "2"],
    length: 46,
    axisMap: {
      R: "x",
      L: "x",
      Rw: "x",
      U: "y",
      D: "y",
      Uw: "y",
      F: "z",
      B: "z",
      Fw: "z",
    },
  },

  "555": {
    moves: ["R", "L", "U", "D", "F", "B", "Rw", "Uw", "Fw", "3Rw"],
    modifiers: ["", "'", "2"],
    length: 50,
    axisMap: {
      R: "x",
      L: "x",
      Rw: "x",
      "3Rw": "x",
      U: "y",
      D: "y",
      Uw: "y",
      F: "z",
      B: "z",
      Fw: "z",
    },
  },

  pyram: {
    moves: ["R", "L", "U", "B", "r", "l", "u", "b"],
    modifiers: ["", "'"],
    length: 12,
    axisMap: {
      R: "x",
      L: "x",
      U: "y",
      B: "z",
      r: "x",
      l: "x",
      u: "y",
      b: "z",
    },
  },

  skewb: {
    moves: ["R", "L", "U", "B"],
    modifiers: ["", "'"],
    length: 9,
    axisMap: {
      R: "x",
      L: "x",
      U: "y",
      B: "z",
    },
  },

  minx: {
    moves: ["R", "D"],
    modifiers: ["++", "--"],
    length: 50,
    axisMap: {
      R: "x",
      D: "y",
    },
  },
};
