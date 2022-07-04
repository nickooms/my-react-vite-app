import { FC } from 'react';
import * as React from 'react';
import { Feature, Point } from 'geojson';

export interface ManHoleProps {
  feature: Feature;
}

export const ManHole: FC<ManHoleProps> = ({ feature }) => {
  const [z, x] = (feature.geometry as Point).coordinates;
  // console.log({ manHole: feature });
  return (
    <mesh position={[x, 0, z]}>
      <cylinderGeometry args={[0.7, 0.7, 0.1]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  );
};
