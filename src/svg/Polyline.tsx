import * as React from 'react';
import { Feature, Position } from 'geojson';
import { getCoordinates } from '../WFSObjects';
import './GRB.css';

export interface PolylineProps {
  feature: Feature;
}

const getColor = (featureTyoe: string, properties: { [key: string]: string }) => {
  switch (featureTyoe) {
    case 'WGO':
      switch (+properties.TYPE) {
        case 1:
          return '#c004c9';
        case 2:
          return '#ffd700';
        case 3:
          return '#984c00';
      }
    case 'GBG':
      return '#990000';
    case 'WVB':
      return '#ffffff';
    default:
      return 'red';
  }
};

export const Polyline: React.FC<PolylineProps> = ({ feature }) => {
  const polyline: Position[] = getCoordinates(feature);
  const [featureType] = (feature.id! as string).split('.');
  const color = getColor(featureType, feature.properties!);
  return (
    <polyline
      points={polyline.map(([x, y]) => [y, x]).join(' ')}
      fill="none"
      stroke={color}
      strokeWidth="0.5"
      className={featureType}
    />
  );
};
