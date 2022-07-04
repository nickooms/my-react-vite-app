import * as React from 'react';
import { Feature } from 'geojson';
import { DoubleSide, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { randomColor } from '../../../random-color';
import { PolygonsMesh } from '../PolygonsMesh';

export interface BuildingProps {
  feature: Feature;
}

const OFFSETY = 0.01;
const MIN_HEIGHT = 3;
const MAX_HEIGHT = 6;

export const Building: React.FC<BuildingProps> = ({ feature }) => {
  const y = Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT + OFFSETY;
  const color = randomColor();
  const material = new MeshBasicMaterial({ color, side: DoubleSide });
  return <PolygonsMesh feature={feature} yValues={[OFFSETY, y]} material={material} />;
};
