import { Feature } from 'geojson';
import { WBN } from '../svg';

export const isRoad: (feature: Feature) => boolean = (feature) => String(feature.id).startsWith(WBN);
