import { FC } from 'react';
import * as React from 'react';
import { Feature, Polygon } from 'geojson';
import {
  Curve,
  DoubleSide,
  Vector2,
  Vector3,
  CatmullRomCurve3,
  Shape,
} from 'three';
import { BBox2 } from './BBox2';
import type { Vec2 } from './BBox2';
import { randomColor } from './random-color';

export interface BuildingProps {
  feature: Feature;
}

export const Building: FC<BuildingProps> = ({ feature }) => {
  const coordinates = (feature.geometry as Polygon).coordinates[0];
  const bbox = new BBox2(...(coordinates as Vec2[]));
  const [z, x] = bbox.center;

  const ribbonBase = new CatmullRomCurve3(
    coordinates.map(([z, x]) => new Vector3(x, 0, z)),
    true,
    'chordal',
    0
  );
  const hh = 0.1;
  const hw = 6;
  const profile = new Shape([
    new Vector2(-hw, -hh),
    new Vector2(-hw, hh),
    new Vector2(hw, hh),
    new Vector2(hw, -hh),
    new Vector2(-hw, -hh),
  ]);
  const color = randomColor();
  return (
    <mesh>
      <extrudeGeometry
        args={[
          profile,
          {
            steps: 20,
            bevelEnabled: true,
            extrudePath: ribbonBase,
          },
        ]}
      />
      <meshLambertMaterial color={color} side={DoubleSide} />
    </mesh>
  );
};
