import * as React from 'react';
import { Feature } from 'geojson';
import { DoubleSide, MeshBasicMaterial } from 'three';
import { PolygonMesh } from '../PolygonMesh';

const ROAD_DIVISION_COLORS = {
  1: 0xb7b7b7,
  2: 0xcccccc,
  3: 0xff0000,
};

export interface RoadDivisionProps {
  feature: Feature;
}

export const RoadDivision: React.FC<RoadDivisionProps> = ({ feature }) => {
  const color = ROAD_DIVISION_COLORS[feature!.properties!.TYPE];
  const material = new MeshBasicMaterial({ color, side: DoubleSide });
  return <PolygonMesh feature={feature} y={0} material={material} />;
};
