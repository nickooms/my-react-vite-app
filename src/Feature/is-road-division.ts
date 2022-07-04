import { Feature } from 'geojson';
import { WGO } from '../svg';

export const isRoadDivision: (feature: Feature) => boolean = (feature) => String(feature.id).startsWith(WGO);
