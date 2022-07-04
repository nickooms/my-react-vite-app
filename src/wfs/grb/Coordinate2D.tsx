import { Position } from 'geojson';
import { Vector2 } from 'three';

export const toVector2: ([x, y]: Position) => Vector2 = ([x, y]) => new Vector2(y, x);

export const toCoordinate3: (y: number) => ([z, x]: Position) => Position =
  (y: number) =>
  ([z, x]: Position) =>
    [x, y, z];
