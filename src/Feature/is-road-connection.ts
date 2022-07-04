import { Feature } from 'geojson';
import { WVB } from '../svg';

export const isRoadConnection: (feature: Feature) => boolean = (feature) => String(feature.id).startsWith(WVB);
