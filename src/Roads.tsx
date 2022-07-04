import * as React from 'react';
import { Feature } from 'geojson';
import { isRoad } from './Feature';
import { Road } from './wfs/grb/road/Road';
import { LineString } from 'geojson';
import { Line } from './Line.1';

const isWLI = (feature: Feature): boolean => (feature.id as string).startsWith('WLI');

const isWTI = (feature: Feature): boolean => (feature.id as string).startsWith('WTI');

export const Roads = ({ features }) => (
  <group>
    {features
      .filter((feature: Feature) => isRoad(feature) || isWLI(feature) || isWTI(feature))
      .map((feature: Feature) => {
        if (isRoad(feature)) return <Road key={feature.id} feature={feature} />;
        if (isWLI(feature))
          return (
            <Line
              key={feature.id}
              points={(feature.geometry as LineString).coordinates.map(([z, x]) => [x, 0.1, z])}
              width={1}
              color={0x000000}
            />
          );
        if (isWTI(feature))
          return (
            <Line
              key={feature.id}
              points={(feature.geometry as LineString).coordinates.map(([z, x]) => [x, 0.1, z])}
              width={1}
              color={0xff0000}
            />
          );
      })}
  </group>
);
