import * as React from 'react';
import { Feature, Point } from 'geojson';
import { Html } from '@react-three/drei';
import { isBuildingHousenumber } from './Feature';

export const BuildingHousenumbers = ({ features }) => (
  <group>
    {features.filter(isBuildingHousenumber).map((feature: Feature) => {
      // console.log(feature);
      const { geometry } = feature;
      const { coordinates } = geometry as Point;
      const [z, x] = coordinates;
      return (
        <group position={[x, 10, z]} key={feature.id}>
          <Html distanceFactor={10}>
            <div style={{ color: '#666666', fontSize: 400, opacity: 0.5 }}>{feature!.properties!.HUISNR}</div>
          </Html>
        </group>
      );
    })}
  </group>
);
