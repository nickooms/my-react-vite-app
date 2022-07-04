import { Feature } from 'geojson';
import { TBLGBGADR } from '../svg';

export const isBuildingHousenumber: (feature: Feature) => boolean = (feature) =>
  String(feature.id).startsWith(TBLGBGADR);
