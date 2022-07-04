import React from 'react';
import { Housenumber } from '../../Housenumber';

export type SetLocationFunction = (location: Housenumber | undefined) => void;

export interface LocationContextValue {
  location: Housenumber | undefined;
  setLocation: SetLocationFunction | undefined;
}

export const LocationContext = React.createContext<LocationContextValue>({
  location: undefined,
  setLocation: () => {},
});
