import * as React from 'react';
import { Feature } from 'geojson';
import { getCoordinates } from '../WFSObjects';
import './GRB.css';
import classnames from 'classnames';

export interface PolygonProps {
  feature: Feature;
  type?: string;
}

const getFill = (featureTyoe: string, properties: { [key: string]: string }) => {
  switch (featureTyoe) {
    case 'ADP':
      return '#fff5c8';
    case 'WBN':
      switch (+properties.TYPE) {
        case 1:
          return '#b7b7b7';
        case 2:
          return '#cccccc';
      }
    case 'GBG':
      return '#990000';
    default:
      return 'red';
  }
};

const getStroke = (featureTyoe: string, properties: { [key: string]: string }) => {
  switch (featureTyoe) {
    case 'ADP':
      return '#d79700';
    case 'WBN':
      return 'none';
    case 'GBG':
      return '#990000';
    default:
      return 'red';
  }
};

export const Polygon: React.FC<PolygonProps> = ({ feature }) => {
  const polygon: number[][] = getCoordinates(feature);
  const featureType = (feature.id! as string).split('.')[0];
  // const fill = getFill(featureType, feature.properties!);
  // const stroke = getStroke(featureType, feature.properties!);
  const type = feature.properties!.TYPE;
  // console.log(featureType, type, feature.properties![type]);
  return (
    <polygon
      points={polygon.map(([x, y]) => [y, x]).join(' ')}
      // fill={fill}
      // stroke={stroke}
      className={classnames(featureType, { [[featureType, type].join('__')]: type })}
    />
  );
};
