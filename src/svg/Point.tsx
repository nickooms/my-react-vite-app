import * as React from 'react';
import { Feature } from 'geojson';
import { WPI, WRI } from './GRB';
import './GRB.css';

export interface PointProps {
  feature: Feature;
  radius?: number;
}

const getColor = (featureTyoe: string) => {
  switch (featureTyoe) {
    case WPI:
    case WRI:
      return '#000000';
    default:
      return 'red';
  }
};

const getRadius = (featureTyoe: string, defaultRadius: number) => {
  switch (featureTyoe) {
    case WPI:
      return 0.4;
    case WRI:
      return 0.7;
    default:
      return defaultRadius;
  }
};

export const Point: React.FC<PointProps> = ({ feature, radius = 0.2 }) => {
  const [cy, cx]: number[] = (feature.geometry as GeoJSON.Point).coordinates;
  const [featureType] = (feature.id! as string).split('.');
  // console.log(featureType);
  const color = getColor(featureType);
  const r = getRadius(featureType, radius);
  return <circle cx={cx} cy={cy} fill={color} r={r} stroke="none" className={featureType} />;
};
