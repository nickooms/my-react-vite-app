import * as React from 'react';
import { Feature } from 'geojson';
import { isManHole } from './Feature';
import { ManHole } from './ManHole';

export const ManHoles = ({ features }) => (
  <group>
    {features.filter(isManHole).map((feature: Feature) => (
      <ManHole key={feature.id} feature={feature} />
    ))}
  </group>
);
