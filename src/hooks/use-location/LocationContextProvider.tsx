import { FC, useState } from 'react';
import { LocationContext, LocationContextValue } from './LocationContext';

export const LocationContextProvider: FC<{}> = ({ children }) => {
  const [value, setValue] = useState<LocationContextValue | undefined>(undefined);

  return (
    <LocationContext.Provider value={{ location: value?.location, setLocation: value?.setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
