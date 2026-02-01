export type CubeEvent =
  | '222'
  | '333'
  | '444'
  | '555'
  | 'pyram'
  | 'minx'
  | 'skewb';

export interface EventConfig {
  moves: string[];
  modifiers: string[];
  axisMap: Record<string, string>;
  length: number;
}
