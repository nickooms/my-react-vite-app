import * as React from 'react';
import { Feature } from 'geojson';
import { isParcel } from './Feature';
import { Parcel } from './wfs/grb/parcel/Parcel';

export const Parcels = ({ features }) => (
  <group>
    {features.filter(isParcel).map((feature: Feature) => (
      <Parcel key={feature.id} feature={feature} />
    ))}
  </group>
);
