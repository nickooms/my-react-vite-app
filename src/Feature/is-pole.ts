import { Feature } from 'geojson';
import { WPI } from '../svg';

export const isPole: (feature: Feature) => boolean = (feature) =>
  String(feature.id).startsWith(WPI);
