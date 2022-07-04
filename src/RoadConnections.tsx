import * as React from 'react';
import { Feature, LineString } from 'geojson';
import { isRoadConnection } from './Feature';
import { Line } from './Line.1';

const COLORS = {
  1: 0xaa6b2c,
  2: 0xffd700,
  3: 0xc20ccb,
};

export const RoadConnections = ({ features }) => (
  <group>
    {features.filter(isRoadConnection).map((feature: Feature) => {
      const { coordinates } = feature.geometry as LineString;
      const color = COLORS[feature.properties!.TYPE];
      return <Line key={feature.id} points={coordinates.map(([z, x]) => [x, 0.02, z])} width={10} color={color} />;
    })}
  </group>
);
