import * as React from 'react';
import { Feature } from 'geojson';
import { isBuilding } from './Feature';
import { Building } from './wfs/grb/building/Building';

export const Buildings = ({ features }) => (
  <group>
    {features.filter(isBuilding).map((feature: Feature) => (
      <Building key={feature.id} feature={feature} />
    ))}
  </group>
);
