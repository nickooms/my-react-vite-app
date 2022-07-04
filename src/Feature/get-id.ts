import { Feature } from 'geojson';

export const getId = (feature: Feature): string | number | undefined => feature.id;
