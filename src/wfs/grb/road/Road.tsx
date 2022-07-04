import * as React from 'react';
import { Feature } from 'geojson';
import { DoubleSide, MeshBasicMaterial } from 'three';
// import { Model } from 'modeler-csg';
import { PolygonMesh } from '../PolygonMesh';

const ROAD_COLORS = {
  1: 0xb7b7b7,
  2: 0xcccccc,
};

export interface RoadProps {
  feature: Feature;
  divisions?: Feature[];
}

export const Road: React.FC<RoadProps> = ({ feature, divisions = [] }) => {
  const color = ROAD_COLORS[feature!.properties!.TYPE];
  const material = new MeshBasicMaterial({ color, side: DoubleSide });

  return <PolygonMesh feature={feature} y={0} material={material} />;
  // {
  /* <Model modelMaterial={material}>
      <subtract> */
  // }
  /* {divisions}
      </subtract>
    </Model> */
};
