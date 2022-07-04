import { useState, useEffect, useCallback } from 'react';
import { Housenumber } from './Housenumber';

const URL = 'https://loc.geopunt.be/v4/location';

interface LocationResponse {
  LocationResult: Housenumber[];
}

export const useLocation = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const [location, setLocation] = useState<Housenumber | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseResponse = useCallback((response: Response): Promise<LocationResponse> => response.json(), []);

  const handleResponse = useCallback(({ LocationResult: [Location] }: LocationResponse): void => {
    setLocation(Location);
  }, []);

  const handleError = useCallback((reason: any): void => {
    console.error(reason);
    setError(reason);
  }, []);

  useEffect(() => {
    const url = `${URL}?latlon=${latitude},${longitude}`;
    fetch(url).then(parseResponse).then(handleResponse).catch(handleError);
  }, [latitude, longitude]);

  return { location, error };
};
