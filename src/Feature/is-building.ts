import { Feature } from 'geojson';
import { GBG } from '../svg';

export const isBuilding: (feature: Feature) => boolean = (feature) =>
  String(feature.id).startsWith(GBG);
