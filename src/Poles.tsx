import * as React from 'react';
import { Feature } from 'geojson';
import { isPole } from './Feature';
import { Pole } from './Pole';

export const Poles = ({ features }) => (
  <group>
    {features.filter(isPole).map((feature: Feature) => (
      <Pole key={feature.id} feature={feature} />
    ))}
  </group>
);
