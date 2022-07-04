import { Feature } from 'geojson';
import { WRI } from '../svg';

export const isManHole: (feature: Feature) => boolean = (feature) =>
  String(feature.id).startsWith(WRI);
