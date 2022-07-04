import { useState, useEffect } from 'react';

const DEFAULT_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

type Position = {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  heading: number;
  timestamp: number;
};

export const useCurrentPosition = (watch = false, options = DEFAULT_OPTIONS) => {
  const { enableHighAccuracy, timeout, maximumAge } = options;

  const [position, setPosition] = useState<Position | {}>({});
  const [error, setError] = useState<string | null>(null);

  const onChange: PositionCallback = ({
    coords: { latitude, longitude, accuracy, speed, heading },
    timestamp,
  }: GeolocationPosition) => {
    setPosition({
      latitude,
      longitude,
      accuracy,
      speed,
      heading,
      timestamp,
    });
  };

  const onError: PositionErrorCallback = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    if (watch) {
      const watcher = geolocation.watchPosition(onChange, onError, options);
      return () => geolocation.clearWatch(watcher);
    }

    geolocation.getCurrentPosition(onChange, onError, options);
  }, [enableHighAccuracy, timeout, maximumAge]);

  return { ...position, error };
};
