import * as React from 'react';
import { Feature } from 'geojson';
import { DoubleSide, MeshBasicMaterial } from 'three';
import { PolygonMesh } from '../PolygonMesh';

export interface ParcelProps {
  feature: Feature;
}

const MATERIAL = new MeshBasicMaterial({ color: 0x555555, side: DoubleSide });

export const Parcel: React.FC<ParcelProps> = ({ feature }) => (
  <PolygonMesh feature={feature} y={0} material={MATERIAL} />
);
