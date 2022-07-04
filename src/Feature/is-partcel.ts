import { Feature } from 'geojson';
import { ADP } from '../svg';

export const isParcel: (feature: Feature) => boolean = (feature) =>
  String(feature.id).startsWith(ADP);
