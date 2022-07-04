import { FC } from 'react';
import * as React from 'react';
import { Feature, Point } from 'geojson';
import { Vector3 } from 'three/src/math/Vector3';

interface PoleProps {
  feature: Feature;
}

export const Pole: FC<PoleProps> = ({ feature }) => {
  const [z, x] = (feature.geometry as Point).coordinates;
  return (
    <>
      <pointLight position={[x, 8, z]} intensity={10}>
        <mesh>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={0xffffff} opacity={0.5} transparent />
        </mesh>
      </pointLight>
      <mesh position={new Vector3(x, 0, z)}>
        <cylinderGeometry args={[0.1, 0.2, 15]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </>
  );
};
